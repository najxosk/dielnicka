(()=>{'use strict';
const $=id=>document.getElementById(id),STORE='little_alchemist_v1',MODES=['chem','life','hard'];
const localDay=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`};
const dayDiff=(a,b)=>{try{const A=a.split('-').map(Number),B=b.split('-').map(Number);return Math.round((Date.UTC(B[0],B[1]-1,B[2])-Date.UTC(A[0],A[1]-1,A[2]))/86400000)}catch(e){return 99}};
const load=()=>{try{const r=JSON.parse(localStorage.getItem(STORE)||'{}');return r&&typeof r==='object'?r:{}}catch(e){return{}}};
const r=load(),S={xp:Number(r.xp)||0,lang:r.lang==='en'?'en':'sk',streak:Math.max(1,Number(r.streak)||1),lastOpen:typeof r.lastOpen==='string'?r.lastOpen:'',claimed:typeof r.claimed==='string'?r.claimed:'',progress:{chem:{},life:{},hard:{}}};
// Accept only valid saved level records; preserve the v1 storage key and rewards.
S.xp=Number.isFinite(S.xp)?Math.max(0,Math.floor(S.xp)):0;
MODES.forEach(m=>{const p=r.progress?.[m];if(!p||typeof p!=='object')return;for(let i=1;i<=50;i++){const st=Number(p[i]?.stars);if(Number.isInteger(st)&&st>=1&&st<=3)S.progress[m][i]={stars:st}}});
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}};
const td=localDay();if(!S.lastOpen)S.lastOpen=td;else if(S.lastOpen!==td){S.streak=dayDiff(S.lastOpen,td)===1?S.streak+1:1;S.lastOpen=td}save();
const T={sk:{sub:'Akadémia alchýmie',hero:'Miešaj, objavuj a uč sa. 150 úrovní v troch herných cestách.',done:'HOTOVÉ LEVELY',stars:'HVIEZDY',choose:'Vyber cestu',return:'Návratová odmena',daily:'Denná iskra',dailyText:'Otvor hru každý deň a získaj bonus XP.',claim:'Vyzdvihnúť',claimed:'Vyzdvihnuté',lang:'Jazyk',levels:'50 levelov',goal:'CIEĽ',combine:'Vyber dve látky a spoj ich.',odd:'Nájdi jednu vec, ktorá medzi ostatné nepatrí.',wrong:'Táto kombinácia nefunguje. Skús inú dvojicu.',wrongOdd:'Táto vec do skupiny patrí. Skús inú.',doneLevel:'Level dokončený',map:'Mapa',next:'Ďalší level',perfect:'Bez chyby!',mistakes:'Chyby: ',select:'ťukni pre výber',streak:n=>'Séria '+n+(n===1?' deň':' dní'),mode:{chem:['🧪','Chémia','Reakcie, zmesi a materiály.'],life:['🌿','Pre život','Postreh a logika: čo do skupiny nepatrí?'],hard:['🔥','Majster alchýmie','Viackrokové recepty a náročnejšie kombinácie.']}},en:{sub:'Alchemy Academy',hero:'Mix, discover and learn. 150 levels across three learning paths.',done:'LEVELS DONE',stars:'STARS',choose:'Choose a path',return:'Return reward',daily:'Daily spark',dailyText:'Open the game every day and earn bonus XP.',claim:'Claim',claimed:'Claimed',lang:'Language',levels:'50 levels',goal:'GOAL',combine:'Pick two substances and combine them.',odd:'Find the one item that does not belong.',wrong:'That combination does not work. Try another pair.',wrongOdd:'That item belongs to the group. Try another.',doneLevel:'Level complete',map:'Map',next:'Next level',perfect:'Perfect run!',mistakes:'Mistakes: ',select:'tap to select',streak:n=>'Streak '+n+' day'+(n===1?'':'s'),mode:{chem:['🧪','Chemistry','Reactions, mixtures and materials.'],life:['🌿','Everyday logic','Observation and logic: what does not belong?'],hard:['🔥','Master Alchemist','Multi-step recipes and harder combinations.']}}};
const I={h:['⚪','vodík','hydrogen'],o:['🔵','kyslík','oxygen'],water:['💧','voda','water'],na:['🟣','sodík','sodium'],cl:['🟢','chlór','chlorine'],salt:['🧂','soľ','salt'],soil:['🟫','hlina','soil'],mud:['🟤','blato','mud'],ca:['⚪','vápnik','calcium'],lime:['⬜','pálené vápno','quicklime'],slaked:['🥛','hasené vápno','slaked lime'],sand:['🏖️','piesok','sand'],mortar:['🏗️','malta','mortar'],ash:['🌫️','popol','ash'],potash:['🤍','potaš','potash'],glassmix:['🧊','sklárska zmes','glass batch'],limestone:['🪨','vápenec','limestone'],glass:['🪟','sklo','glass'],cu:['🟠','meď','copper'],sn:['⚪','cín','tin'],bronze:['🥉','bronz','bronze'],zn:['🔘','zinok','zinc'],brass:['🟡','mosadz','brass'],fe:['⚙️','železo','iron'],carbon:['⚫','uhlík','carbon'],steel:['🔩','oceľ','steel'],sugar:['🍬','cukor','sugar'],sweet:['🧋','cukrový roztok','sugar solution'],brine:['🌊','slaný roztok','salt solution'],co2:['☁️','oxid uhličitý','carbon dioxide'],sparkling:['🥤','sýtená voda','carbonated water'],vinegar:['🍶','ocot','vinegar'],baking:['🥄','jedlá sóda','baking soda'],foam:['🫧','penivá zmes','fizzy mixture'],oil:['🫗','olej','oil'],emulsion:['🥣','emulzia','emulsion'],straw:['🌾','slama','straw'],adobe:['🧱','nepálená tehla','adobe'],cement:['🏭','cement','cement'],wetcement:['🪣','cementová kaša','cement paste'],concrete:['🧱','betón','concrete'],orefe:['🪨','železná ruda','iron ore'],orecu:['🪨','medená ruda','copper ore']};
const R={},add=(a,b,c)=>R[[a,b].sort().join('+')]=c;[['h','o','water'],['na','cl','salt'],['soil','water','mud'],['ca','o','lime'],['lime','water','slaked'],['slaked','sand','mortar'],['ash','ash','potash'],['sand','potash','glassmix'],['glassmix','limestone','glass'],['cu','sn','bronze'],['cu','zn','brass'],['fe','carbon','steel'],['sugar','water','sweet'],['salt','water','brine'],['co2','water','sparkling'],['vinegar','baking','foam'],['oil','water','emulsion'],['mud','straw','adobe'],['cement','water','wetcement'],['wetcement','sand','concrete'],['orefe','carbon','fe'],['orecu','carbon','cu']].forEach(x=>add(...x));

// Explicit families keep neighbouring chemistry challenges different.
Object.assign(I, {
  lemon:['🍋','citrón','lemon'], lemonade:['🍹','citrónová voda','lemon water'],
  flour:['🌾','múka','flour'], dough:['🍞','cesto','dough'],
  red:['🔴','červená farba','red paint'], blue:['🔵','modrá farba','blue paint'],
  yellow:['🟡','žltá farba','yellow paint'], purple:['🟣','fialová farba','purple paint'],
  green:['🟢','zelená farba','green paint'], orange:['🟠','oranžová farba','orange paint'],
  ice:['🧊','ľad','ice'], heat:['🔥','teplo','heat'], steam:['♨️','para','steam'],
  paper:['📄','papier','paper'], pulp:['🪣','papierová kaša','paper pulp'],
  soap:['🧼','mydlo','soap'], suds:['🫧','mydlová pena','soap foam'],
  cocoa:['🍫','kakao','cocoa'], milk:['🥛','mlieko','milk'], chocolate:['☕','kakaové mlieko','chocolate milk'],
  rust:['🟤','hrdza','rust']
});
const RECIPES = [
  ['sugar','water','sweet','solution'], ['cu','sn','bronze','metal'],
  ['vinegar','baking','foam','reaction'], ['soil','water','mud','material'],
  ['red','blue','purple','color'], ['ice','heat','water','thermal'],
  ['co2','water','sparkling','gas'], ['paper','water','pulp','recycle'],
  ['na','cl','salt','reaction'], ['cu','zn','brass','metal'],
  ['lemon','water','lemonade','solution'], ['mud','straw','adobe','material'],
  ['blue','yellow','green','color'], ['water','heat','steam','thermal'],
  ['soap','water','suds','foam'], ['fe','carbon','steel','metal'],
  ['flour','water','dough','material'], ['h','o','water','reaction'],
  ['salt','water','brine','solution'], ['red','yellow','orange','color'],
  ['cement','water','wetcement','material'], ['ca','o','lime','reaction'],
  ['cocoa','milk','chocolate','solution'], ['sand','potash','glassmix','material'],
  ['fe','o','rust','reaction'], ['oil','water','emulsion','solution'],
  ['slaked','sand','mortar','material'], ['lime','water','slaked','reaction'],
  ['glassmix','limestone','glass','material'], ['ash','ash','potash','recycle'],
  ['orecu','carbon','cu','metal'], ['wetcement','sand','concrete','material'],
  ['orefe','carbon','fe','metal']
];
RECIPES.forEach(([a,b,c])=>add(a,b,c));
const DIS=['soil','ash','sand','water','carbon','limestone','sugar','oil','cement','cu','zn','sn'];
const HARD=[['slaked',['ca','o','water']],['mortar',['ca','o','water','sand']],['glass',['sand','ash','ash','limestone']],['sparkling',['h','o','co2']],['brine',['na','cl','water']],['sweet',['h','o','sugar']],['concrete',['cement','water','sand']],['adobe',['soil','water','straw']],['steel',['orefe','carbon','carbon']],['bronze',['orecu','carbon','sn']]];
// Each category has a bilingual rule, five pictured members and a curated outsider.
// Curated outsiders avoid ambiguous cross-category answers (e.g. milk vs drinks).
const CATS = {
 fruit: ['ovocie','fruit','🍎 jablko|apple;🍐 hruška|pear;🍌 banán|banana;🍑 broskyňa|peach;🍒 čerešne|cherries','🔨 kladivo|hammer'],
 vegetables: ['zelenina','vegetables','🥕 mrkva|carrot;🥦 brokolica|broccoli;🧅 cibuľa|onion;🥬 šalát|lettuce;🥔 zemiak|potato','🧦 ponožka|sock'],
 pets: ['domáci miláčikovia','pets','🐈 mačka|cat;🐕 pes|dog;🐹 škrečok|hamster;🐇 králik|rabbit;🦜 papagáj|parrot','🚲 bicykel|bicycle'],
 sea: ['morské živočíchy','sea animals','🐙 chobotnica|octopus;🦈 žralok|shark;🐬 delfín|dolphin;🪼 medúza|jellyfish;🦀 krab|crab','🐔 sliepka|hen'],
 insects: ['hmyz','insects','🐜 mravec|ant;🐝 včela|bee;🦋 motýľ|butterfly;🐞 lienka|ladybird;🪲 chrobák|beetle','🐸 žaba|frog'],
 birds: ['vtáky','birds','🦉 sova|owl;🦆 kačica|duck;🦅 orol|eagle;🐧 tučniak|penguin;🦩 plameniak|flamingo','🐢 korytnačka|turtle'],
 garden: ['pomôcky záhradníka','gardening equipment','🚿 krhla|watering can;🪏 rýľ|spade;🧤 záhradné rukavice|gardening gloves;🪴 kvetináč|flowerpot;✂️ záhradné nožnice|pruning shears','🎻 husle|violin'],
 kitchen: ['kuchynské náčinie','kitchen utensils','🥄 lyžica|spoon;🍴 vidlička|fork;🍳 panvica|pan;🥣 misa|bowl;🔪 kuchynský nôž|kitchen knife','🪁 šarkan|kite'],
 music: ['hudobné nástroje','musical instruments','🎹 klavír|piano;🎸 gitara|guitar;🎻 husle|violin;🥁 bubon|drum;🎺 trúbka|trumpet','🧱 tehla|brick'],
 sports: ['športové pomôcky','sports equipment','⚽ futbalová lopta|football;🏸 bedmintonová raketa|badminton racket;🏓 pingpongová pálka|table tennis bat;🥊 boxerská rukavica|boxing glove;🏒 hokejka|hockey stick','🕯️ sviečka|candle'],
 school: ['školské potreby','school supplies','✏️ ceruzka|pencil;📏 pravítko|ruler;📓 zošit|notebook;🎒 školská taška|schoolbag;🖍️ pastelka|crayon','🍳 panvica|pan'],
 clothes: ['oblečenie','clothing','👕 tričko|shirt;👖 nohavice|trousers;🧥 bunda|jacket;🧦 ponožky|socks;👗 šaty|dress','🧲 magnet|magnet'],
 weather: ['počasie','weather','🌧️ dážď|rain;❄️ sneženie|snowfall;🌬️ vietor|wind;⛈️ búrka|thunderstorm;🌫️ hmla|fog','🍞 chlieb|bread'],
 space: ['vesmírne objekty','objects in space','⭐ hviezda|star;🪐 planéta|planet;☄️ kométa|comet;🌙 mesiac|moon;🌌 galaxia|galaxy','🪑 stolička|chair'],
 shapes: ['rovinné geometrické tvary','flat geometric shapes','🔵 kruh|circle;🟨 štvorec|square;🔺 trojuholník|triangle;▭ obdĺžnik|rectangle;⬭ ovál|oval','🐘 slon|elephant'],
 workshop: ['náradie','tools','🔨 kladivo|hammer;🪚 píla|saw;🪛 skrutkovač|screwdriver;🔧 kľúč|wrench;🗜️ zverák|vice','🍓 jahoda|strawberry'],
 transport: ['dopravné prostriedky','vehicles','🚗 auto|car;🚆 vlak|train;🚲 bicykel|bicycle;🚌 autobus|bus;✈️ lietadlo|plane','🌻 slnečnica|sunflower'],
 camping: ['výbava na stanovanie','camping equipment','⛺ stan|tent;🔦 baterka|torch;🧭 kompas|compass;🎒 turistický batoh|hiking backpack;🛏️ spacák|sleeping bag','🏭 továreň|factory'],
 hygiene: ['pomôcky na hygienu','hygiene supplies','🪥 zubná kefka|toothbrush;🧼 mydlo|soap;🧴 šampón|shampoo;🧽 špongia|sponge;🧻 toaletný papier|toilet paper','🎲 hracia kocka|die'],
 baking: ['suroviny do koláča','cake ingredients','🌾 múka|flour;🥚 vajce|egg;🧈 maslo|butter;🍬 cukor|sugar;🥛 mlieko|milk','🔩 skrutka|screw'],
 light: ['zdroje svetla','light sources','☀️ slnko|sun;💡 žiarovka|light bulb;🕯️ sviečka|candle;🔦 baterka|torch;🏮 lampáš|lantern','🧦 ponožka|sock'],
 rescue: ['záchranárske vybavenie','rescue equipment','🛟 záchranné koleso|lifebuoy;🧯 hasiaci prístroj|fire extinguisher;🚑 sanitka|ambulance;🩹 náplasť|plaster;🦺 reflexná vesta|reflective vest','🧁 mafin|cupcake'],
 forest: ['stromy','trees','🌳 dub|oak;🌲 smrek|spruce;🌳 buk|beech;🌲 borovica|pine;🌳 breza|birch','🐠 ryba|fish'],
 flowers: ['kvety','flowers','🌹 ruža|rose;🌷 tulipán|tulip;🌻 slnečnica|sunflower;🌼 sedmokráska|daisy;🪻 hyacint|hyacinth','🛴 kolobežka|scooter'],
 reading: ['veci na čítanie','things to read','📖 kniha|book;📰 noviny|newspaper;📚 encyklopédia|encyclopaedia;🗺️ turistický sprievodca|travel guide;💬 komiks|comic','🥾 čižma|boot'],
 winter: ['výbava na zimné športy','winter sports equipment','🎿 lyže|skis;⛸️ korčule|ice skates;🛷 sánky|sledge;🏂 snowboard|snowboard;🏒 hokejka|hockey stick','🏖️ slnečník|beach umbrella'],
 art: ['výtvarné potreby','art supplies','🖌️ štetec|paintbrush;🎨 paleta|palette;🖍️ voskovka|wax crayon;📄 výkres|drawing paper;✏️ kresliaca ceruzka|drawing pencil','🥦 brokolica|broccoli'],
 time: ['pomôcky na meranie času','timekeeping tools','⌚ hodinky|watch;⏰ budík|alarm clock;⏱️ stopky|stopwatch;⌛ presýpacie hodiny|hourglass;🕰️ nástenné hodiny|wall clock','🍋 citrón|lemon'],
 building: ['stavebné materiály','building materials','🧱 tehla|brick;🪵 drevo|wood;🪨 kameň|stone;🪟 sklo|glass;🪣 betón|concrete','🦋 motýľ|butterfly'],
 bakery: ['pečivo','baked goods','🍞 chlieb|bread;🥐 croissant|croissant;🥖 bageta|baguette;🥨 praclík|pretzel;🥯 žemľa|bread roll','🔑 kľúč|key']
};
const parseItem=text=>{const split=text.indexOf(' '),[sk,en]=text.slice(split+1).split('|');return [sk,en,text.slice(0,split)]};
Object.values(CATS).forEach(c=>{c[2]=c[2].split(';').map(parseItem);c[3]=parseItem(c[3])});
const cats=Object.keys(CATS),shuffle=(a,seed)=>{a=a.slice();let s=seed>>>0,r=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);for(let i=a.length-1;i;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// 33 distinct introductions, then spaced revisits with more choices.
const CHEM_ORDER=[...RECIPES.keys(),0,3,2,4,1,6,7,10,13,12,15,16,18,24,22,27,28];
const chem=i=>{const [a,b,goal,family]=RECIPES[CHEM_ORDER[i]],tiles=[a,b];const n=i<3?0:i<10?1:i<25?2:i<35?3:4;
  for(const d of shuffle(DIS,i+71)){if(tiles.length>=2+n)break;if(d!==goal&&!tiles.includes(d))tiles.push(d)}
  return{goal,family,tiles:shuffle(tiles,i+11)};
};
const hard=i=>{let x=HARD[i%HARD.length],a=x[1].slice();if(i>=20)a.push(DIS[(i+4)%DIS.length]);if(i>=35)a.push(DIS[(i+9)%DIS.length]);return{goal:x[0],tiles:shuffle(a,i+101)}};
const life=i=>{const category=cats[i%cats.length],c=CATS[category],round=Math.floor(i/cats.length),offset=(i+round*2)%5;
 const pick=[c[2][offset],c[2][(offset+1)%5],c[2][(offset+2)%5],c[3]],order=shuffle([0,1,2,3],i+501);
 return {category,rule:c.slice(0,2),items:order.map(x=>pick[x]),odd:order.indexOf(3)};
};
const CHEM=Array.from({length:50},(_,i)=>chem(i)),ADV=Array.from({length:50},(_,i)=>hard(i)),LIFE=Array.from({length:50},(_,i)=>life(i));
const stateKey=a=>a.slice().sort().join('|');function solvable(level){const q=[level.tiles.slice()],seen=new Set;while(q.length){const a=q.shift(),k=stateKey(a);if(seen.has(k))continue;seen.add(k);if(a.includes(level.goal))return true;for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const p=R[[a[i],a[j]].sort().join('+')];if(p){const n=a.slice();n.splice(j,1);n[i]=p;q.push(n)}}if(seen.size>1000)break}return false}
if(CHEM.length!==50||ADV.length!==50||LIFE.length!==50||CHEM.some(x=>!solvable(x))||ADV.some(x=>!solvable(x)))throw new Error('Level validation failed');

// Embedded vector fallbacks for newer emoji missing on older phones/Windows fonts.
// No downloads, image library, or font dependency.
const ART={
 '🪨':'<path fill="#9eacc2" d="m8 46 5-25 18-12 19 12 7 29-27 7Z"/><path d="m13 21 18 9 19-9M31 30l-1 27"/>',
 '🫧':'<g fill="#72e1ed"><circle cx="20" cy="40" r="13"/><circle cx="42" cy="21" r="14"/><circle cx="47" cy="48" r="7"/></g><path stroke="white" d="m13 36 4-5m19-13 4-5"/>',
 '🪣':'<path fill="#83b8d3" d="m13 24 6 31h26l6-31Z"/><path d="M16 24V18a16 16 0 0 1 32 0v6"/><ellipse fill="#50657d" cx="32" cy="24" rx="19" ry="5"/>',
 '🪟':'<path fill="#86dfea" d="M10 7h44v50H10Z"/><path stroke="#f5deab" stroke-width="5" d="M32 7v50M10 32h44"/><path stroke="white" d="m15 22 9-9m14 36 9-9"/>',
 '🫗':'<path fill="#d5ebfc" d="m7 11 23-4 6 28-23 4Z"/><path fill="#e7c768" d="m12 25 20-4 3 13-21 4Zm30 6q-13 16 0 19 13-3 0-19Z"/><path stroke="#e7c768" d="M33 15q17-3 14 17"/>',
 '🧋':'<path fill="#c8a078" d="m15 20 4 37h26l4-37Z"/><path stroke="#f8daac" stroke-width="6" d="m35 23 6-18"/><path d="M13 20h38"/><g fill="#41354c"><circle cx="26" cy="46" r="3"/><circle cx="38" cy="49" r="3"/><circle cx="34" cy="39" r="3"/></g>',
 '🪼':'<path fill="#caa8f5" d="M9 31a23 23 0 0 1 46 0Z"/><path stroke="#caa8f5" stroke-width="4" d="M17 32q-8 9 0 22m10-22q9 9 0 24m10-24q-8 9 0 24m10-24q8 9 0 20"/>',
 '🪲':'<ellipse fill="#74bc87" cx="32" cy="35" rx="15" ry="20"/><circle fill="#526f62" cx="32" cy="13" r="8"/><path d="M32 17v38M18 25 8 19m10 17H6m13 12-9 9m36-32 10-6M46 36h12M45 48l9 9"/>',
 '🪏':'<path stroke="#c9a477" stroke-width="7" d="M32 12v30"/><path fill="#91acc8" d="M20 36h24v10L32 59 20 46Z"/><path d="M24 5h16v9H24Z"/>',
 '🪴':'<path fill="#d89477" d="m17 35 5 23h20l5-23Z"/><path stroke="#83c993" stroke-width="4" d="M32 35V9"/><path fill="#83c993" d="M31 25Q7 25 13 9q21 0 18 16m2-5Q55 21 52 5 34 5 33 20"/>',
 '🪁':'<path fill="#f4a679" d="M31 5 53 24 31 45 9 24Z"/><path d="M9 24h44M31 5v40q18 5 5 15"/>',
 '🪑':'<path fill="#d9b18d" d="M14 9h33v24H14Zm-4 26h43v8H10Z"/><path stroke="#d9b18d" stroke-width="6" d="M16 42v17m31-17v17"/>',
 '🪐':'<circle fill="#e3b981" cx="32" cy="32" r="18"/><ellipse stroke="#fae0ab" stroke-width="5" cx="32" cy="32" rx="29" ry="8" transform="rotate(-25 32 32)"/>',
 '🪥':'<path stroke="#75cfbf" stroke-width="8" d="m16 55 27-39"/><path fill="#f5f5eb" d="m34 8 7-5 16 12-7 10Z"/>',
 '🪚':'<path fill="#acbdcf" d="m17 20 41 14-39 17-6-5Z"/><path fill="#d6a67a" d="M5 15h16v30H5Z"/><path d="m24 44 4 3m6-7 4 3m6-7 4 3"/>',
 '🪛':'<path fill="#f5b260" d="m7 6 17 5 6 12-9 9-12-6Z"/><path stroke="#b7c9d8" stroke-width="6" d="m27 29 25 25"/>',
 '🪵':'<path fill="#b88b66" d="m15 15 37 4v33l-37-4Z"/><ellipse fill="#dfbc8d" cx="15" cy="32" rx="10" ry="17"/><ellipse cx="15" cy="32" rx="4" ry="9"/><path d="m29 25 17 2m-19 12 20 2"/>',
 '🪻':'<path stroke="#8fcd97" stroke-width="4" d="M32 57V14m0 34L18 38m14 4 13-8"/><g fill="#b69aeb"><circle cx="28" cy="12" r="6"/><circle cx="36" cy="17" r="6"/><circle cx="27" cy="24" r="6"/><circle cx="36" cy="30" r="6"/></g>',
 '🧱':'<path fill="#d99b7d" d="M5 11h54v44H5Z"/><path stroke="#edd1b0" stroke-width="4" d="M5 26h54M5 41h54M23 11v15m20 0v15M23 41v14"/>'
};
const iconMarkup=icon=>ART[icon]?'<svg class="itemArt" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#334257" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">'+ART[icon]+'</svg>':icon;


const sceneSvg=(content)=>'<svg viewBox="0 0 600 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">'+content+'</svg>';
const SCENES={
 chem:sceneSvg('<path fill="#d8e8e4" d="M0 0h600v156H0z"/><path stroke="#b7d1cb" d="M0 39h600M0 78h600M0 117h600M60 0v39m100 0v39m100-78v39m100 0v39m100-78v39M60 78v39m100 0v39m100-78v39m100 0v39m100-78v39"/><path fill="#436e72" d="M355 14h186v91H355z"/><path fill="#d0f3ee" d="M363 22h76v75h-76zm84 0h86v75h-86z"/><path stroke="#fff" stroke-width="3" d="m372 62 28-28m50 49 47-47"/><path fill="#b18a60" stroke="#645745" stroke-width="3" d="M20 95h230v10H20z"/><g stroke="#4d777b" stroke-width="3"><path fill="#e9fffa" d="M42 42h17v11l12 30q2 8-8 8H37q-8 0-5-8l10-30z"/><path fill="#79b7d5" d="m39 70-5 14q-1 4 4 4h26q5 0 4-4l-6-14Z"/><path fill="#e9fffa" d="M95 32h24v9h-3v45q0 6-9 6t-9-6V41h-3Z"/><path fill="#eeb868" d="M101 59h12v26q0 4-6 4t-6-4Z"/><path fill="#e9fffa" d="M150 44h22v17l11 23q3 7-6 7h-32q-8 0-5-7l10-23Z"/><path fill="#8ac6a1" d="m148 70-6 15q0 4 5 4h29q5 0 4-4l-7-15Z"/></g><path fill="#507077" d="M208 56h14v37h-14z"/><path stroke="#324f54" stroke-width="3" d="M206 59h18m-15 8h12"/><path fill="#f0e8c8" stroke="#74928b" stroke-width="2" d="M269 26h55v54h-55z"/><path stroke="#769e90" stroke-width="3" d="M281 39h31m-31 10h20m-20 10h27"/><path fill="#355359" d="M0 140h600v16H0z"/><path stroke="#7e9b99" stroke-width="4" d="M0 140h600"/>'),
 life:sceneSvg('<path fill="#a66f42" d="M0 0h600v156H0z"/><path stroke="#815333" stroke-width="3" d="M0 36h600M0 79h600M0 121h600"/><path stroke="#c39058" stroke-width="2" d="M10 19q80-16 146 0t160-2m41 42q70-13 202-6M11 102q82-11 182 0t177 1m53 38q79-10 162 1"/><path stroke="#65482f" stroke-width="3" d="M20 23q280 48 560 0"/><path fill="#fff6d9" stroke="#795738" stroke-width="2" d="m72 36 74 4-4 70-74-4zm363 3 77-7 6 72-77 7Z"/><path fill="#d6ae71" stroke="#755033" stroke-width="2" d="m105 24 9 1-2 26-9-1zm363 0 9-1 2 26-9 1Z"/><path fill="#8fab67" d="M90 81q-14-29 7-30 19-2 12 24 13-31 24-14 4 15-24 23v17h-7V82Z"/><path fill="#e7b765" stroke="#a57342" stroke-width="2" d="m468 49 18 27-34 3Z"/><circle fill="#8daaad" cx="491" cy="84" r="12"/><path fill="#f1d493" d="M0 140h600v16H0z"/>'),
 hard:sceneSvg('<path fill="#302d3a" d="M0 0h600v156H0z"/><path stroke="#4e4750" stroke-width="3" d="M0 37h600M0 80h600M0 123h600M66 0v37m98 0v43m98-80v37m98 0v43m98-80v37M66 80v43m98 0v33m98-76v43m98 0v33m98-76v43"/><path fill="#183a4b" stroke="#9c8d76" stroke-width="7" d="M414 120V51q0-42 43-43t43 43v69Z"/><path stroke="#a99b7f" stroke-width="4" d="M457 11v109m-40-56h79"/><circle fill="#f7df99" cx="479" cy="38" r="12"/><path fill="#183a4b" d="M484 23a12 12 0 0 0 0 25Z"/><path fill="#806247" stroke="#3b2927" stroke-width="3" d="M19 115h210v11H19z"/><path fill="#5e7471" stroke="#ceac74" stroke-width="2" d="m49 78 31-1 9 32H40Z"/><path stroke="#e3c17e" stroke-width="2" d="M62 68v11m-8-11h16"/><path fill="#b2a0bb" stroke="#d9b981" stroke-width="2" d="M109 53h17v22q30 36-7 36-36 0-10-36Z"/><path fill="#dfc58a" stroke="#60442f" stroke-width="2" d="M171 78h11v32h-11z"/><path fill="#f5b84d" d="M176 53q-15 20 0 24 16-3 0-24"/><path fill="#ffe8a4" d="M176 63q-6 10 0 12 6-2 0-12"/><path fill="#80514a" stroke="#cfad79" stroke-width="2" d="m247 100 41-13 42 13v29l-42-11-41 11Z"/><path stroke="#cfad79" stroke-width="2" d="M288 88v30"/><g transform="translate(48 0)" stroke="#332c35" stroke-width="2.2"><path fill="#68727e" d="M307 144q0-40 34-43 36 3 37 43Z"/><path fill="#e7c497" d="M327 64q15-10 30 0l-1 29-14 17-15-17Z"/><path fill="#e5ded0" d="M325 80q4 13 16 5 15 8 19-5-2 40-18 48-17-10-17-48Z"/><path fill="#8b718c" d="m313 65 29-46 28 46Z"/><path fill="#ab90a2" d="M310 64q33-8 64 0l-4 9q-28-5-56 0Z"/><path fill="#e8c77f" d="m342 35 2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z"/><path d="m331 79 3-1m15 0 3 1"/><path stroke="#8b6f5c" d="M339 92q4 3 8 0"/><path stroke="#dec794" stroke-width="3" d="M360 116v26"/></g><path fill="#806042" d="M0 142h600v14H0z"/>')
};
const sceneNames={sk:{chem:['LABORATÓRIUM','Malé pokusy, veľké objavy'],life:['DREVENÁ DIELNIČKA','Pozri sa, porovnaj, objav'],hard:['DIELŇA MAJSTRA','Tajomstvá starých alchymistov']},en:{chem:['THE LABORATORY','Small experiments, big discoveries'],life:['THE WOODEN WORKSHOP','Look, compare, discover'],hard:['THE MASTER’S WORKSHOP','Secrets of the old alchemists']}};
function setupScene(m){const names=sceneNames[S.lang][m];$('sceneDecor').innerHTML=SCENES[m];$('sceneName').textContent=names[0];$('sceneCaption').textContent=names[1];}
const BOWLS={water:'#67c6df',mud:'#8b6043',soil:'#765639',sand:'#dfbd7c',ash:'#aaa7ac',sugar:'#f6eee0',salt:'#eee8dd',sweet:'#d9b57a',brine:'#8ccfdb',sparkling:'#95dbd8',flour:'#efe0bd',dough:'#e2b885',wetcement:'#9aaba8',concrete:'#95a1a3',mortar:'#b5b2a2',slaked:'#e1e7cf',potash:'#e5dcc8',glassmix:'#bfd6cb',cocoa:'#805039',milk:'#f4ebda',chocolate:'#996745',foam:'#a6ddd2',suds:'#b5dedc',emulsion:'#e2cb88'};
const TUBES={h:'#bfdce5',o:'#82bace',na:'#bc9dcf',cl:'#a8cf77',ca:'#e0d6b2',vinegar:'#e2bf81',oil:'#d8b568',co2:'#b3d3d5',baking:'#efe3ce',red:'#df8177',blue:'#7daacb',yellow:'#e3c96f',purple:'#b399cc',green:'#8bbc93',orange:'#dfac76',lemonade:'#e4d180'};
const vesselFor=id=>id==='ice'?'plate':BOWLS[id]?'bowl':TUBES[id]?'tube':'table';
function specimen(id){
 const vessel=vesselFor(id),old=mode==='hard',rim=old?'#d9b379':'#d9eaf0',edge=old?'#71503c':'#527983';
 let drawing='<ellipse cx="60" cy="96" rx="43" ry="7" fill="#192729" opacity=".18"/>';
 if(vessel==='bowl'){
  const c=BOWLS[id];drawing+='<path fill="'+rim+'" stroke="'+edge+'" stroke-width="2.5" d="M15 62q2 32 45 32t45-32Z"/><ellipse cx="60" cy="62" rx="45" ry="13" fill="'+rim+'" stroke="'+edge+'" stroke-width="2.5"/><ellipse cx="60" cy="62" rx="38" ry="9" fill="'+c+'"/><path d="M26 76q9 9 25 10" stroke="#fff" stroke-opacity=".65" stroke-width="3"/>';
  if(['mud','soil','sand','ash','flour','sugar','salt','cocoa','potash'].includes(id))drawing+='<path fill="'+c+'" d="M26 62q10-15 20-11 7-19 19-5 15-4 30 16Z"/><path stroke="'+edge+'" stroke-opacity=".4" stroke-width="2" d="m42 56 2-1m19-3 2 1m13 5 2 1"/>';
  else drawing+='<path stroke="white" stroke-width="2.5" stroke-opacity=".7" d="M35 59q9-4 20-2"/>';
  if(['foam','suds','sparkling'].includes(id))drawing+='<g fill="'+c+'" stroke="'+edge+'" stroke-width="1.5"><circle cx="44" cy="47" r="9"/><circle cx="65" cy="43" r="12"/><circle cx="83" cy="51" r="7"/></g>';
 }else if(vessel==='tube'){
  drawing+='<path fill="'+(old?'#cbb88a':'#e0f4f4')+'" fill-opacity=".65" stroke="'+edge+'" stroke-width="2.5" d="M42 13h36v8h-5v58q0 16-13 16T47 79V21h-5Z"/><path fill="'+TUBES[id]+'" stroke="'+edge+'" stroke-width="1.5" d="M50 49h20v30q0 13-10 13T50 79Z"/><path stroke="white" stroke-opacity=".8" stroke-width="3" d="M53 28v38"/><path stroke="'+edge+'" stroke-width="2" d="M65 32h7m-7 9h7m-7 18h7"/><path fill="'+(old?'#bd9258':'#efe9d6')+'" stroke="'+edge+'" stroke-width="1.5" d="M39 8h42v8H39Z"/>';
  const symbol={h:'H',o:'O',na:'Na',cl:'Cl',ca:'Ca',co2:'CO₂'}[id];if(symbol)drawing+='<text x="60" y="78" text-anchor="middle" fill="#243c42" stroke="none" font-size="13" font-family="Georgia" font-weight="bold">'+symbol+'</text>';
 }else if(vessel==='plate'){
  drawing+='<ellipse cx="60" cy="85" rx="48" ry="13" fill="'+rim+'" stroke="'+edge+'" stroke-width="2.5"/><ellipse cx="60" cy="83" rx="37" ry="8" stroke="'+edge+'" opacity=".4"/>';
  drawing+='<g stroke="#548ba0" stroke-width="2" fill="#a5dfe9"><path d="m32 51 21-8 21 9-2 26-22 8-19-10Z"/><path fill="#d9f6f3" d="m32 51 21-8 21 9-24 8Z"/><path d="M50 60v26"/><path d="m66 63 15-8 18 8-1 20-17 7-16-9Z"/><path fill="#d9f6f3" d="m66 63 15-8 18 8-18 7Z"/><path d="M81 70v20"/></g>';
 }else if(id==='straw'){
  drawing+='<g stroke="#d6ae5c" stroke-width="3">'+[0,1,2,3,4,5,6,7].map(n=>'<path d="M'+(25+n*5)+' 91 '+(35+n*5)+' '+(24+(n%3)*6)+'m-4 19-9-10m10 4 8-11"/>').join('')+'</g><path stroke="#875c3f" stroke-width="5" d="m33 68 40 6m-40 0 39-6"/>';
 }else if(['cu','sn','zn','fe','bronze','brass','steel'].includes(id)){
  const metal={cu:'#cb9170',sn:'#b7c6c6',zn:'#a9b7c4',fe:'#8e9ba2',bronze:'#c89e62',brass:'#dbc382',steel:'#abc4cc'}[id];drawing+='<g stroke="#4a555e" stroke-width="2.5"><path fill="'+metal+'" d="m23 68 13-18h44l17 18-8 16H30Z"/><path fill="#fff" fill-opacity=".3" d="m23 68 13-18h44l17 18Z"/><path d="M23 68h74M36 50l5 18m39-18-6 18"/></g>';
 }else if(['orefe','orecu','limestone','carbon'].includes(id)){
  const rock=id==='carbon'?'#56505a':id==='orecu'?'#b49977':'#a4aaa7';drawing+='<g stroke="#50575c" stroke-width="2.5"><path fill="'+rock+'" d="m23 79 5-26 23-15 30 10 17 35-32 10Z"/><path fill="#fff" fill-opacity=".18" d="m28 53 23-15 30 10-22 21Z"/><path d="m28 53 31 16 7 24m-7-24 22-21"/></g>';
 }else drawing+='<foreignObject x="20" y="26" width="80" height="65"><span xmlns="http://www.w3.org/1999/xhtml" class="loose-object">'+iconMarkup(I[id][0])+'</span></foreignObject>';
 return '<span class="specimen vessel-'+vessel+'" aria-hidden="true"><svg viewBox="0 0 120 110" class="specimenArt" fill="none" stroke-linecap="round" stroke-linejoin="round">'+drawing+'</svg></span>';
}
const PARTICLE={
 spark:'<path d="m16 2 3 10 11 4-11 3-3 11-4-11L2 16l10-4Z"/>',
 glow:'<path d="m16 2 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/>',
 metal:'<path d="m16 2 4 12 10 2-10 3-4 11-3-11-11-3 11-2Z"/>',
 bubble:'<circle cx="16" cy="16" r="12"/><path d="M9 14q1-5 6-5" fill="none" stroke="white"/>',
 merge:'<path d="M16 3Q-3 23 16 29 35 23 16 3Z"/>',
 spill:'<path d="M16 3Q-3 23 16 29 35 23 16 3Z"/>',
 steam:'<path d="M8 26c-9-1-7-14 1-13-2-12 15-14 16-3 10 0 10 15 1 16Z"/>',
 smoke:'<path d="M8 26c-9-1-7-14 1-13-2-12 15-14 16-3 10 0 10 15 1 16Z"/>',
 burst:'<path d="m16 2 4 8 10-3-4 10 4 10-11-4-8 7-1-11-8-5 10-3Z"/>',
 crack:'<path d="m6 4 22 9-14 16-3-13Z"/>'
};

let finishTimer=null,effectTimer=null,settling=false,completed=false;
function clearFeedback(){clearTimeout(finishTimer);clearTimeout(effectTimer);finishTimer=null;$('reactionFx').replaceChildren();$('reactionFx').className='reactionFx';settling=false}
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const effectFor=product=>{
 if(['bronze','brass','steel','fe','cu'].includes(product))return 'metal';
 if(['foam','suds','sparkling'].includes(product))return 'bubble';
 if(['steam','lime','slaked'].includes(product))return 'steam';
 if(['salt','rust','potash'].includes(product))return 'spark';
 if(['water','sweet','brine','lemonade','emulsion','chocolate'].includes(product))return 'merge';
 return 'glow';
};
function reactionFx(kind,icon){
 const box=$('reactionFx');clearTimeout(effectTimer);box.replaceChildren();box.className='reactionFx fx-'+kind;
 const core=document.createElement('span');core.className='fx-core';core.innerHTML=iconMarkup(icon);box.appendChild(core);
 if(!reducedMotion())for(let n=0;n<10;n++){const p=document.createElement('i');p.innerHTML='<svg viewBox="0 0 32 32" fill="currentColor" stroke="#35505b" stroke-width="1.8" stroke-linejoin="round">'+PARTICLE[kind]+'</svg>';p.style.setProperty('--x',Math.round(Math.cos(n*Math.PI/5)*94)+'px');p.style.setProperty('--y',Math.round(Math.sin(n*Math.PI/5)*66)+'px');p.style.setProperty('--turn',n*36+'deg');p.style.setProperty('--delay',n*14+'ms');box.appendChild(p)}
 effectTimer=setTimeout(()=>{box.replaceChildren();box.className='reactionFx'},850);
}
function finish(){if(settling||completed)return;settling=true;document.querySelectorAll('#tiles button').forEach(b=>b.disabled=true);finishTimer=setTimeout(win,reducedMotion()?120:720)}
let mode='chem',level=0,board=[],sel=null,errors=0,runXp=0,lifeOdd=-1;const tr=()=>T[S.lang],nm=id=>I[id]?(S.lang==='en'?I[id][2]:I[id][1]):id,show=id=>{document.body.dataset.scene=id==='home'?'home':mode;if(id!=='play')clearFeedback();document.querySelectorAll('.screen').forEach(x=>x.classList.remove('on'));$(id).classList.add('on');window.scrollTo(0,0)},done=()=>MODES.reduce((n,m)=>n+Object.keys(S.progress[m]).length,0),stars=()=>MODES.reduce((n,m)=>n+Object.values(S.progress[m]).reduce((a,b)=>a+(Number(b.stars)||0),0),0),unlock=m=>{let u=1;while(S.progress[m][u]&&u<50)u++;return u};
function home(){const t=tr();$('brandSub').textContent=t.sub;$('heroText').textContent=t.hero;$('doneLbl').textContent=t.done;$('starsLbl').textContent=t.stars;$('chooseTitle').textContent=t.choose;$('returnTitle').textContent=t.return;$('dailyTitle').textContent=t.daily;$('dailyText').textContent=t.dailyText;$('settingsTitle').textContent=t.lang;$('claimBtn').textContent=S.claimed===td?t.claimed:t.claim;$('claimBtn').disabled=S.claimed===td;$('streakLabel').textContent=t.streak(S.streak);$('doneStat').textContent=done()+'/150';$('starsStat').textContent=stars()+'/450';$('xpStat').textContent=S.xp;$('xpTop').textContent=S.xp;$('streakTop').textContent=S.streak;document.documentElement.lang=S.lang;$('footerNote').textContent=S.lang==='en'?'Little Alchemist v1.2 · local progress · no account':'Little Alchemist v1.2 · lokálny progres · bez účtu';$('homeBtn').setAttribute('aria-label',S.lang==='en'?'Home':'Domov');['mapBack','playBack'].forEach(id=>$(id).setAttribute('aria-label',S.lang==='en'?'Back':'Späť'));document.querySelectorAll('.langSwitch button').forEach(b=>b.classList.toggle('on',b.dataset.lang===S.lang));const g=$('modeGrid');g.innerHTML='';MODES.forEach(m=>{const a=t.mode[m],d=Object.keys(S.progress[m]).length,b=document.createElement('button');b.className='mode';b.innerHTML='<span class="emoji">'+a[0]+'</span><span><h3>'+a[1]+'</h3><p>'+a[2]+'</p><div class="progress"><i style="width:'+(d*2)+'%"></i></div></span><span class="arrow">›</span>';b.onclick=()=>map(m);g.appendChild(b)})}
function map(m){mode=m;const t=tr(),a=t.mode[m],p=S.progress[m];$('mapTitle').textContent=a[1];$('mapSub').textContent=t.levels;$('mapProg').style.width=(Object.keys(p).length*2)+'%';$('mapStars').innerHTML='<span class="on">★</span> '+Object.values(p).reduce((n,v)=>n+(Number(v.stars)||0),0)+'/150';const max=unlock(m),lm=$('levelMap');lm.innerHTML='';for(let i=1;i<=50;i++){const b=document.createElement('button'),x=p[i];b.className='levelbtn'+(i>max?' lock':'')+(x?' done':'');b.disabled=i>max;b.setAttribute('aria-label',(S.lang==='en'?'Level ':'Úroveň ')+i+(i>max?(S.lang==='en'?' locked':' zamknutá'):''));b.innerHTML=i+(x?'<span class="mini">'+'★'.repeat(Number(x.stars)||0)+'</span>':'');b.onclick=()=>start(m,i-1);lm.appendChild(b)}show('map')}
function start(m,i){if(i<0||i>49)return;clearFeedback();completed=false;mode=m;setupScene(m);level=i;sel=null;errors=0;runXp=0;$('runXp').textContent=0;$('retryBtn').textContent=S.lang==='en'?'↻ Restart level':'↻ Začať level znova';const t=tr(),a=t.mode[m];$('playTitle').textContent=a[1];$('playSub').textContent='Level '+(i+1)+' / 50';$('goalKicker').textContent=t.goal;$('msg').className='msg';$('msg').textContent=m==='life'?t.odd:t.combine;if(m==='life'){const L=LIFE[i];lifeOdd=L.odd;board=L.items.slice();$('goalText').textContent='🧠 '+(S.lang==='en'?'Odd one out':'Čo sem nepatrí?');$('goalHint').textContent=(S.lang==='en'?'Three belong to: ':'Tri veci patria do skupiny: ')+L.rule[S.lang==='en'?1:0];renderLife()}else{const L=(m==='chem'?CHEM:ADV)[i];board=L.tiles.slice();$('goalText').innerHTML=iconMarkup(I[L.goal][0])+' '+nm(L.goal);$('goalHint').textContent=t.combine;renderAlchemy()}show('play')}
function renderAlchemy(){const box=$('tiles');box.innerHTML='';board.forEach((id,i)=>{const b=document.createElement('button');if(!id){b.className='tile empty';b.disabled=true}else{b.className='tile'+(sel===i?' sel':'');b.setAttribute('aria-pressed',sel===i?'true':'false');b.innerHTML=specimen(id)+'<span class="n">'+nm(id)+'</span><span class="tag">'+tr().select+'</span>';b.onclick=()=>tap(i)}box.appendChild(b)})}
function tap(i){if(settling||completed||!board[i])return;if(sel===null){sel=i;renderAlchemy();return}if(sel===i){sel=null;renderAlchemy();return}const a=board[sel],b=board[i],prod=R[[a,b].sort().join('+')];if(prod){board[sel]=prod;board[i]=null;sel=null;runXp+=4;$('runXp').textContent=runXp;$('msg').className='msg good';$('msg').textContent='✓ '+nm(a)+' + '+nm(b)+' → '+nm(prod);renderAlchemy();reactionFx(effectFor(prod),I[prod][0]);const goal=(mode==='chem'?CHEM:ADV)[level].goal;if(prod===goal)finish();else if(!solvable({goal,tiles:board.filter(Boolean)})){$('msg').textContent+=(S.lang==='en'?' · No path remains. Restart to try another order.':' · Cieľ už nie je dosiahnuteľný. Začni znova a skús iné poradie.')}}else{errors++;sel=null;$('msg').className='msg bad';$('msg').textContent=tr().wrong;renderAlchemy();const kind=['water','oil','vinegar','milk'].some(x=>x===a||x===b)?'spill':['glass','glassmix','ice'].some(x=>x===a||x===b)?'crack':['carbon','ash'].some(x=>x===a||x===b)?'smoke':'burst';reactionFx(kind,{spill:'💦',crack:'💥',smoke:'☁️',burst:'💥'}[kind])}}
function renderLife(){const box=$('tiles');box.innerHTML='';board.forEach((pair,i)=>{const b=document.createElement('button');b.className='tile';b.innerHTML='<span class="e" aria-hidden="true">'+iconMarkup(pair[2])+'</span><span class="n">'+pair[S.lang==='en'?1:0]+'</span>';b.onclick=()=>{if(settling||completed||b.disabled)return;if(i===lifeOdd){runXp+=6;$('runXp').textContent=runXp;$('msg').className='msg good';$('msg').textContent=(S.lang==='en'?'Correct! The other three belong to: ':'Správne! Ostatné tri patria do skupiny: ')+LIFE[level].rule[S.lang==='en'?1:0];reactionFx('glow',pair[2]);finish()}else{errors++;b.disabled=true;b.classList.add('tried');$('msg').className='msg bad';$('msg').textContent=tr().wrongOdd;reactionFx('smoke','☁️')}};box.appendChild(b)})}
function win(){if(completed)return;completed=true;const st=errors===0?3:errors<=2?2:1,idx=level+1,old=S.progress[mode][idx],oldStars=old?Number(old.stars)||0:0,first=!old,improved=Math.max(0,st-oldStars),earned=(first?15+runXp:0)+improved*5;if(!old||st>oldStars)S.progress[mode][idx]={stars:Math.max(st,oldStars)};S.xp+=earned;save();$('xpTop').textContent=S.xp;$('resultTitle').textContent=tr().doneLevel;$('resultStars').innerHTML=[1,2,3].map(n=>'<span class="'+(n<=st?'on':'')+'">★</span>').join('');$('resultOrb').innerHTML=iconMarkup(mode==='life'?LIFE[level].items[lifeOdd][2]:I[(mode==='chem'?CHEM:ADV)[level].goal][0]);$('resultText').textContent=(earned?('+'+earned+' XP · '):'')+(errors===0?tr().perfect:tr().mistakes+errors);$('resultMap').textContent=tr().map;$('resultNext').textContent=tr().next;$('resultNext').disabled=level>=49;show('result')}
$('retryBtn').onclick=()=>start(mode,level);
$('homeBtn').onclick=()=>{home();show('home')};$('mapBack').onclick=()=>{home();show('home')};$('playBack').onclick=()=>map(mode);$('resultMap').onclick=()=>map(mode);$('resultNext').onclick=()=>level<49&&start(mode,level+1);$('claimBtn').onclick=()=>{if(S.claimed===td)return;S.xp+=20+Math.min(80,S.streak*5);S.claimed=td;save();home()};document.querySelectorAll('.langSwitch button').forEach(b=>b.onclick=()=>{S.lang=b.dataset.lang;save();home()});home();})();
