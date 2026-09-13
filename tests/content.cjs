const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
function data(saved='{}'){
 const context={localStorage:{getItem:()=>saved,setItem:()=>{}},document:{},Date};
 vm.createContext(context);
 vm.runInContext(source.slice(0,source.indexOf('let finishTimer='))+'globalThis.data={CHEM,ADV,LIFE,CATS,RECIPES,R,I,S,solvable};})();',context);
 return context.data;
}
function solve(level,recipes){
 const queue=[{tiles:level.tiles,steps:[]}],seen=new Set();
 while(queue.length){const {tiles,steps}=queue.shift();if(tiles.includes(level.goal))return steps;
  const key=tiles.slice().sort().join('|');if(seen.has(key))continue;seen.add(key);
  for(let i=0;i<tiles.length;i++)for(let j=i+1;j<tiles.length;j++){
   const product=recipes[[tiles[i],tiles[j]].sort().join('+')];if(!product)continue;
   const next=tiles.slice();next.splice(j,1);next[i]=product;
   queue.push({tiles:next,steps:[...steps,[tiles[i],tiles[j],product]]});
  }
 }return null;
}
function check(){
 const d=data();
 for(const levels of [d.CHEM,d.ADV,d.LIFE])assert.equal(levels.length,50);
 for(const [mode,levels] of [['chem',d.CHEM],['hard',d.ADV]])levels.forEach((l,i)=>{
  assert(!l.tiles.includes(l.goal),`${mode} ${i+1}: goal must be crafted`);
  assert(solve(l,d.R)?.length,`${mode} ${i+1}: independent solver`);
  l.tiles.forEach(id=>assert(d.I[id]?.every(Boolean),`missing SK/EN/icon: ${id}`));
 });
 assert.equal(new Set(d.CHEM.slice(0,25).map(l=>l.tiles.slice().sort().join('|'))).size,25);
 assert.equal(new Set(d.RECIPES.slice(0,25).map(r=>r.slice(0,2).sort().join('+'))).size,25);
 d.CHEM.forEach((l,i)=>{if(i){assert.notEqual(l.family,d.CHEM[i-1].family,`same family ${i+1}`);assert.notEqual(l.goal,d.CHEM[i-1].goal,`same goal ${i+1}`)}});
 assert(Object.keys(d.CATS).length>=30);
 const questions=new Set();
 d.LIFE.forEach((l,i)=>{
  assert.equal(l.items.length,4);assert.equal(new Set(l.items.map(p=>p[0])).size,4);
  l.items.forEach(p=>assert(p.length===3&&p.every(Boolean)&&p[2]!=='❓'));
  assert.equal(l.items[l.odd][0],d.CATS[l.category][3][0]);
  assert.equal(l.items.filter(p=>d.CATS[l.category][2].some(c=>c[0]===p[0])).length,3);
  const key=l.items.map(p=>p[0]).sort().join('|');assert(!questions.has(key),`duplicate question ${i+1}`);questions.add(key);
  if(i)assert.notEqual(l.category,d.LIFE[i-1].category);
 });
 for(const saved of ['null','[]','broken','{"xp":-10,"progress":{"chem":{"1":null,"2":{"stars":99}}}}']){
  const s=data(saved).S;assert(s.xp>=0);assert.equal(Object.keys(s.progress.chem).length,0);
 }
 const old=data(JSON.stringify({lang:'en',xp:120,progress:{chem:{1:{stars:3}},life:{1:{stars:2}},hard:{1:{stars:1}}}})).S;
 assert.equal(old.lang,'en');assert.equal(old.xp,120);assert.equal(old.progress.chem[1].stars,3);
 console.log('PASS: 150 levels; 100 independently solved; 30 categories / 50 unique questions; family spacing; bilingual icons; legacy/corrupt saves.');
}
if(require.main===module)check();
module.exports={data,solve};
