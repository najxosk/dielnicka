const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path'),assert=require('node:assert/strict');
const {data,solve}=require('./content.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,offline:true});
 const page=await context.newPage(),errors=[],network=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url())});
 await page.goto(pathToFileURL(path.join(__dirname,'../offline/Little-Alchemist-v1.2-offline.html')).href);
 const d=data();
 for(const [index,mode] of ['chem','life','hard'].entries()){
  await page.locator('#homeBtn').click();await page.locator('#modeGrid .mode').nth(index).click();await page.locator('#journeyContinue').click();
  if(mode==='life')await page.locator('#tiles button').nth(d.LIFE[0].odd).click();
  else for(const step of solve((mode==='chem'?d.CHEM:d.ADV)[0],d.R))for(const id of step.slice(0,2)){
   await page.locator('#tiles button:not(.empty):not(.sel)').filter({has:page.locator('.n',{hasText:new RegExp('^'+d.I[id][1]+'$')})}).first().click();
  }
  await page.waitForSelector('#result.on');
 }
 await page.reload();assert.equal(await page.locator('#doneStat').textContent(),'3/150');
 await page.locator('[data-lang="en"]').click();assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);assert.deepEqual(network,[]);
 console.log('PASS: standalone file, network disabled, all three modes, progress reload, English switch, mobile width, no external requests.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
