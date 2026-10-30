'use strict';

// Runs the real offline game code with a fake canvas. No external packages,
// Android emulator, saved user data, or network are needed.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const bundled = fs.readFileSync(path.join(__dirname,'../android/app/src/main/assets/index.html'),'utf8');
assert.equal(html,bundled,'browser and Android game assets must remain identical');
const scriptTag = /<script>([\s\S]*?)<\/script>/.exec(html);
assert.ok(scriptTag,'game script must exist');

function saveAfter(cleared=2){
  return {
    nextMission:cleared+1,nextId:7,
    active:[
      {id:'r0',name:'JAX',rank:2,missions:2,joinedMission:1,order:0},
      {id:'r1',name:'ACE',rank:2,missions:2,joinedMission:1,order:1},
      {id:'r2',name:'PIP',rank:1,missions:1,joinedMission:1,order:2}
    ],
    fallen:cleared?[
      {id:'r3',name:'ROOK',rank:1,missions:0,mission:1,cause:'KILLED IN ACTION'}
    ]:[],
    victories:Array.from({length:cleared},(_,i)=>({mission:i+1,score:800,survivors:2,casualties:0})),
    bestScore:1000
  };
}

function canvasContext(){
  const noop=()=>{};
  const ctx={createLinearGradient:()=>({addColorStop:noop})};
  return new Proxy(ctx,{
    get(target,key){return key in target?target[key]:noop;},
    set(target,key,value){target[key]=value;return true;}
  });
}
function fakeCanvas(){
  const ctx=canvasContext();
  return {width:0,height:0,getContext:()=>ctx,
    addEventListener(){},focus(){},setPointerCapture(){},
    getBoundingClientRect(){return {left:0,top:0,width:512,height:288};}};
}
function boot(save){
  const gameCanvas=fakeCanvas();
  const storage=new Map([['green-dawn-campaign-v1',JSON.stringify(save)]]);
  const window={innerWidth:1024,innerHeight:576,addEventListener(){}};
  const document={getElementById:()=>gameCanvas,createElement:()=>fakeCanvas(),
    addEventListener(){},hidden:false};
  // These hooks are injected into the *test copy in memory*; no cheat controls
  // or write access are shipped with the game's actual Android bundle.
  const injection=[
    '  window.__GD_QA={',
    '    destroyObjective(){bunker.hp=0;checkBunker();},',
    '    killFirst(){const first=soldiers.find(s=>s.alive);if(first)killSoldier(first);},',
    '    evacOne(){const first=soldiers.find(s=>s.alive);if(first){first.x=extraction.x;first.y=extraction.y;}},',
    '    step(){update(.016);},',
    '    leave(){leaveMemorial();},',
    "    camp(){state='title';}",
    '  };'
  ].join('\n');
  const marker='  // Expose a tiny read-only test surface to catch playability regressions.';
  assert.ok(scriptTag[1].includes(marker));
  const script=scriptTag[1].replace(marker,injection+'\n'+marker);
  const sandbox={
    window,document,navigator:{maxTouchPoints:0},location:{protocol:'https:',hostname:'appassets.androidplatform.net'},
    localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,val)=>storage.set(key,String(val))},
    performance:{now:()=>0},requestAnimationFrame(){},console
  };
  vm.runInNewContext(script,sandbox,{timeout:20000,filename:'green-dawn-game.js'});
  return {api:window.GREEN_DAWN_TEST,qa:window.__GD_QA,storage};
}

test('An existing v0.10 save unlocks Mission 03 and its route is navigable',()=>{
  const {api}=boot(saveAfter(2));
  assert.equal(api.status.nextMission,3);
  assert.equal(api.status.mission,3);
  api.start();
  assert.equal(api.status.state,'playing');
  assert.equal(api.status.objectiveKind,'radar');
  assert.equal(api.status.enemyCount,12);
  assert.equal(api.status.extraction.x,913);
  assert.ok(api.path(114,575,806,481).length>0,'west insertion must reach east-side track');
  assert.ok(api.path(920,479,913,157).length>0,'radar compound must reach evac');
});

test('Radar destruction causes reinforcements, not premature victory; extraction completes Mission 03',()=>{
  const {api,qa}=boot(saveAfter(2));
  api.start();
  qa.destroyObjective();
  assert.equal(api.status.state,'playing','target destruction alone must not win');
  assert.equal(api.status.bunkerDead,true);
  assert.equal(api.status.reinforcementsSent,true);
  assert.equal(api.status.enemyCount,15);
  qa.evacOne();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,4);
  assert.equal(api.career.victories.length,3);
  assert.equal(api.ceremony.missionOnly,true);
  assert.equal(api.ceremony.displayed.length,0,'older fallen must not appear after a zero-loss mission');
  qa.leave();qa.camp();api.showMemorial();
  assert.equal(api.ceremony.missionOnly,false);
  assert.equal(api.ceremony.displayed.length,1,'historic memorial keeps former casualties');
});

test('Mission 03 ceremony shows only its own fallen and keeps historical memorial separate',()=>{
  const {api,qa}=boot(saveAfter(2));
  api.start();qa.killFirst();
  assert.equal(api.career.fallen.length,2);
  qa.destroyObjective();qa.evacOne();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.ceremony.displayed.length,1);
  assert.equal(api.ceremony.displayed[0].mission,3);
  assert.equal(api.ceremony.displayed[0].id,'r0');
  qa.leave();qa.camp();api.showMemorial();
  assert.equal(api.ceremony.displayed.length,2);
  assert.equal(api.ceremony.missionOnly,false);
});

test('Mission 01 wins on target destruction; Mission 02 still requires extraction',()=>{
  const first=boot(saveAfter(0));
  first.api.start();
  assert.equal(first.api.status.objectiveKind,'radio');
  first.qa.destroyObjective();
  assert.equal(first.api.status.state,'honours');
  assert.equal(first.api.status.nextMission,2);
  const second=boot(saveAfter(1));
  second.api.start();
  assert.equal(second.api.status.objectiveKind,'depot');
  second.qa.destroyObjective();
  assert.equal(second.api.status.state,'playing');
  assert.equal(second.api.status.reinforcementsSent,false);
  second.qa.evacOne();second.qa.step();
  assert.equal(second.api.status.state,'honours');
  assert.equal(second.api.status.nextMission,3);
});

test('No replay or level selection after the third cleared operation',()=>{
  const {api}=boot(saveAfter(3));
  assert.equal(api.status.nextMission,4);
  assert.equal(api.status.mission,3);
  api.start();
  assert.equal(api.status.state,'title');
  assert.equal(api.career.victories.length,3);
});

test('A restarted post-mission ceremony remembers only the latest operation',()=>{
  const pending=saveAfter(3);
  pending.pendingHonours={operation:3,result:'won',fallen:[],score:1200};
  const {api}=boot(pending);
  assert.equal(api.status.state,'honours');
  assert.equal(api.ceremony.operation,3);
  assert.equal(api.ceremony.missionOnly,true);
  assert.equal(api.ceremony.displayed.length,0);
  assert.equal(api.career.fallen.length,1);
});
