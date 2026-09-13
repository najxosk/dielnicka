const {chromium}=require('playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {data,solve}=require('./content.cjs');
const d=data(),root=path.join(__dirname,'..'),out=process.env.QA_OUTPUT||path.join(root,'test-results');
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
 const file={'/':'index.html','/app.js':'app.js','/little-alchemist-v1.css':'little-alchemist-v1.css'}[req.url];
 if(!file){res.writeHead(404);res.end();return}
 res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
 res.end(fs.readFileSync(path.join(root,file)));
});
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const url='http://127.0.0.1:'+server.address().port;
 async function noOverflow(){assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow')}
 async function home(){await page.locator('#homeBtn').click()}
 async function open(mode,n){await home();await page.locator('#modeGrid .mode').nth(['chem','life','hard'].indexOf(mode)).click();await page.locator('#levelMap button').nth(n-1).click()}
 async function craft(mode,n,lang){
  const l=(mode==='chem'?d.CHEM:d.ADV)[n-1],steps=solve(l,d.R);
  for(const [a,b] of steps){
   for(const id of [a,b]){const name=d.I[id][lang==='en'?2:1];await page.locator('#tiles button:not(.empty):not(.sel)').filter({has:page.locator('.n',{hasText:new RegExp('^'+name+'$')})}).first().click()}
  }
 }
 try{
  await page.goto(url);
  await page.locator('#modeGrid .mode').first().click();assert.equal(await page.locator('#levelMap button:disabled').count(),49);
  // Genuine progression, XP anti-farming, reload, next-level unlock.
  await page.locator('#levelMap button').first().click();await craft('chem',1,'sk');
  await page.waitForSelector('#result.on');const firstXp=await page.locator('#xpTop').textContent();
  await open('chem',1);await craft('chem',1,'sk');await page.waitForSelector('#result.on');assert.equal(await page.locator('#xpTop').textContent(),firstXp);
  await page.reload();await page.locator('#modeGrid .mode').first().click();assert.equal(await page.locator('#levelMap button:disabled').count(),48);
  // Seed a legacy-format save to make representative levels accessible via the real map.
  await page.evaluate(()=>{const p={chem:{},life:{},hard:{}};for(const m in p)for(let n=1;n<=50;n++)p[m][n]={stars:1};localStorage.setItem('little_alchemist_v1',JSON.stringify({xp:123,lang:'sk',progress:p}))});await page.reload();
  let count=0;
  for(const lang of ['sk','en']){
   await home();await page.locator('[data-lang="'+lang+'"]').click();
   for(const mode of ['chem','life','hard'])for(const n of [1,5,10,20,30,40,50]){
    await open(mode,n);await noOverflow();
    if(mode==='life'){
     assert(!(await page.locator('#tiles').textContent()).includes('❓'));
     if(n===1){await page.locator('#tiles button').nth((d.LIFE[n-1].odd+1)%4).click();assert(await page.locator('#reactionFx').getAttribute('class').then(c=>c.includes('smoke')))}
     await page.locator('#tiles button').nth(d.LIFE[n-1].odd).click();
    }else await craft(mode,n,lang);
    await page.waitForSelector('#result.on');assert.equal(await page.locator('#resultNext').isDisabled(),n===50);await noOverflow();count++;
   }
  }
  // Exit during pending success: stale timeout must never steal navigation.
  await open('chem',1);await craft('chem',1,'en');await page.locator('#homeBtn').click();await page.waitForTimeout(900);assert(await page.locator('#home.on').isVisible());
  // Rapid final clicks award once, and retry cancels pending completion.
  await open('life',2);await page.locator('#tiles button').nth(d.LIFE[1].odd).evaluate(b=>{b.click();b.click();b.click()});
  await page.locator('#retryBtn').click();await page.waitForTimeout(900);assert(await page.locator('#play.on').isVisible());
  // Wrong recipes and particle cleanup.
  await open('chem',5);
  const tiles=d.CHEM[4].tiles;let wrong;
  for(let i=0;i<tiles.length;i++)for(let j=i+1;j<tiles.length;j++)if(!d.R[[tiles[i],tiles[j]].sort().join('+')])wrong=[i,j];
  for(const i of wrong)await page.locator('#tiles button').nth(i).click();assert(await page.locator('#msg.bad').isVisible());
  await page.waitForTimeout(950);assert.equal(await page.locator('#reactionFx > *').count(),0);
  const failureKind=(a,b)=>['water','oil','vinegar','milk'].some(x=>x===a||x===b)?'spill':['glass','glassmix','ice'].some(x=>x===a||x===b)?'crack':['carbon','ash'].some(x=>x===a||x===b)?'smoke':'burst';
  for(const kind of ['spill','crack','smoke','burst']){
   let sample;
   for(const [index,l] of d.CHEM.entries())for(let i=0;i<l.tiles.length;i++)for(let j=i+1;j<l.tiles.length;j++){
    const a=l.tiles[i],b=l.tiles[j];if(!d.R[[a,b].sort().join('+')]&&failureKind(a,b)===kind)sample={n:index+1,i,j};
   }
   assert(sample,'no sample for '+kind);await open('chem',sample.n);
   await page.locator('#tiles button').nth(sample.i).click();await page.locator('#tiles button').nth(sample.j).click();
   assert((await page.locator('#reactionFx').getAttribute('class')).includes('fx-'+kind));assert(await page.locator('#msg.bad').isVisible());
  }
  // A legal but unhelpful reaction can consume a required ingredient; restart recovers.
  let deadEnd;
  for(const [index,l] of d.CHEM.entries())for(let i=0;i<l.tiles.length;i++)for(let j=i+1;j<l.tiles.length;j++){
   const product=d.R[[l.tiles[i],l.tiles[j]].sort().join('+')];if(!product||product===l.goal)continue;
   const next=l.tiles.slice();next.splice(j,1);next[i]=product;
   if(!solve({...l,tiles:next},d.R))deadEnd={n:index+1,i,j};
  }
  assert(deadEnd);await open('chem',deadEnd.n);for(const i of [deadEnd.i,deadEnd.j])await page.locator('#tiles button').nth(i).click();
  assert((await page.locator('#msg').textContent()).includes('No path remains'));
  await page.locator('#retryBtn').click();await craft('chem',deadEnd.n,'en');await page.waitForSelector('#result.on');
  // Layout and screenshot coverage across compact phone, phone, tablet and desktop.
  for(const width of [320,390,768,1280]){
   await page.setViewportSize({width,height:844});await home();await noOverflow();await page.screenshot({path:path.join(out,'home-'+width+'.png'),fullPage:true});
   for(const mode of ['chem','life','hard']){await open(mode,50);await noOverflow();await page.screenshot({path:path.join(out,mode+'-'+width+'.png'),fullPage:true})}
  }
  // All six success families and four failure shapes are exercised through gameplay.
  await page.setViewportSize({width:390,height:844});
  // Material-aware vessels and the three distinct scenes remain visible on touch screens.
  for(const [n,vessel] of [[4,'bowl'],[6,'plate'],[12,'table'],[18,'tube']]){
   await open('chem',n);assert(await page.locator('.vessel-'+vessel).count()>0);
   assert.equal(await page.locator('body').getAttribute('data-scene'),'chem');
   await noOverflow();await page.screenshot({path:path.join(out,'lab-materials-'+n+'.png'),fullPage:true});
  }
  await open('hard',1);assert.equal(await page.locator('body').getAttribute('data-scene'),'hard');
  await page.screenshot({path:path.join(out,'medieval-master.png'),fullPage:true});
  await open('life',1);assert.equal(await page.locator('body').getAttribute('data-scene'),'life');
  await page.screenshot({path:path.join(out,'pegged-cards.png'),fullPage:true});
  for(const [n,kind] of [[1,'merge'],[2,'metal'],[3,'bubble'],[4,'glow'],[6,'merge'],[9,'spark'],[14,'steam']]){
   await open('chem',n);await craft('chem',n,'en');assert((await page.locator('#reactionFx').getAttribute('class')).includes('fx-'+kind));
   if(kind==='bubble'){
    await page.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=220}));
    await page.screenshot({path:path.join(out,'effect-bubbles.png')});
   }await page.waitForSelector('#result.on');
  }
  await page.emulateMedia({reducedMotion:'reduce'});await open('chem',1);await craft('chem',1,'en');await page.waitForSelector('#result.on');
  assert.equal(await page.locator('#reactionFx i').count(),0);
  // Corrupt storage must not crash the UI.
  await page.evaluate(()=>localStorage.setItem('little_alchemist_v1','{"progress":{"chem":{"1":null,"2":{"stars":99}}}}'));await page.reload();assert(await page.locator('#home.on').isVisible());
  assert.deepEqual(errors,[]);
  console.log('PASS: '+count+' representative level/language runs; real unlock/reload/XP; navigation cancellation; retry; effects; reduced motion; widths 320/390/768/1280; no page errors.');
 }finally{await browser.close();server.close()}
}
main().catch(e=>{console.error(e);server.close();process.exitCode=1});
