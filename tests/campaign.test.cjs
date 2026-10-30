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
const norwayJs=fs.readFileSync(path.join(__dirname,'../norway-missions.js'),'utf8');
const norwayBundled=fs.readFileSync(path.join(__dirname,'../android/app/src/main/assets/norway-missions.js'),'utf8');
assert.equal(norwayJs,norwayBundled,'Norway missions must be bundled identically for Android');
assert.ok(html.includes('<script src="norway-missions.js"></script>'));

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
function boot(save,ww2=false){
  const gameCanvas=fakeCanvas();
  const storage=new Map([['green-dawn-campaign-v1',JSON.stringify(ww2?saveAfter(2):save)]]);
  if(ww2&&save!=null)storage.set('green-dawn-ww2-campaign-v1',JSON.stringify(save));
  const native={exports:[],importCalls:0};
  const window={
    innerWidth:1024,innerHeight:576,addEventListener(){},
    reloadCount:0,location:{search:ww2?'?campaign=ww2':'',reload(){window.reloadCount++;}},
    GreenDawnAndroid:{
      exportSave(content){native.exports.push(content);},
      importSave(){native.importCalls++;}
    }
  };
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
    "    camp(){state='title';},",
    '    openBackup(){openBackup();},',
    '    exportBackup(){exportBackup();},',
    '    importBackup(){importBackup();},',
    '    receiveBackup(raw){receiveBackup(raw);},',
    '    confirmBackup(){confirmBackupRestore();},',
    '    cancelBackup(){pendingBackup=null;openBackup();},',
    '    get backupStatus(){return backupStatus;},',
    '    get backupReady(){return !!pendingBackup;},',
    '    clearEnemies(){for(const e of enemies)e.alive=false;},',
    '    moveFirst(x,y){const s=soldiers.find(s=>s.alive);if(s){s.x=x;s.y=y;s.path=[];}},',
    '    moveEveryone(x,y){soldiers.forEach((s,i)=>{if(s.alive){s.x=x+i*8;s.y=y+i*7;s.path=[];}});},',
    '    destroyTarget(i=0){const target=norwayTargets[i];if(!target)throw Error("No target");target.hp=0;checkBunker(target);},',
    '    hurtConvoy(amount){if(norwayConvoy)norwayConvoy.health=Math.max(0,norwayConvoy.health-amount);},',
    '    cartToEnd(){if(norwayConvoy)norwayConvoy.index=norwayConvoy.waypoints.length;},',
    '    step(dt=.016){update(dt);},',
    '    drawFrame(){draw();},',
    '    get failure(){return norwayFailure;}',
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
  vm.runInNewContext(norwayJs,sandbox,{timeout:10000,filename:'norway-missions.js'});
  vm.runInNewContext(script,sandbox,{timeout:20000,filename:'green-dawn-game.js'});
  return {api:window.GREEN_DAWN_TEST,qa:window.__GD_QA,storage,native,window};
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


test('Samsung backup exports a complete versioned career and memorial file',()=>{
  const {qa,api,native,storage}=boot(saveAfter(2));
  qa.openBackup();
  assert.equal(api.status.state,'backup');
  qa.exportBackup();
  assert.equal(native.exports.length,1);
  const file=JSON.parse(native.exports[0]);
  assert.equal(file.format,'GREEN_DAWN_SAVE');
  assert.equal(file.version,1);
  assert.equal(file.gameVersion,'0.14.0');
  assert.equal(file.career.active.length,3);
  assert.equal(file.career.fallen.length,1);
  assert.equal(file.career.victories.length,2);
  assert.equal(file.career.active[0].rank,2);
  assert.equal(JSON.parse(storage.get('green-dawn-campaign-v1')).nextMission,3,
    'export must never alter the current game');
});

test('Restore previews a valid save but does not overwrite until confirmed',()=>{
  const current=saveAfter(1),incoming=saveAfter(2);
  const {api,qa,storage,window}=boot(current);
  qa.openBackup();
  qa.importBackup();
  // The Android bridge can request the Files picker without any permissions.
  qa.receiveBackup(JSON.stringify({
    format:'GREEN_DAWN_SAVE',version:1,gameVersion:'0.12.0',
    career:incoming,settings:{audioOn:false}
  }));
  assert.equal(api.status.state,'backup-confirm');
  assert.equal(qa.backupReady,true);
  assert.equal(JSON.parse(storage.get('green-dawn-campaign-v1')).victories.length,1,
    'preview must not change storage');
  assert.equal(window.reloadCount,0);
  qa.confirmBackup();
  assert.equal(window.reloadCount,1);
  const restored=JSON.parse(storage.get('green-dawn-campaign-v1'));
  assert.equal(restored.victories.length,2);
  assert.equal(restored.fallen.length,1);
  assert.equal(restored.active[1].rank,2);
  assert.equal(storage.get('green-dawn-audio-v2'),'off');
  // A new app process must load the restored mission without level selection.
  const next=boot(restored);
  assert.equal(next.api.status.nextMission,3);
  next.api.start();
  assert.equal(next.api.status.objectiveKind,'radar');
});

test('Cancel restoration keeps the old soldiers, and invalid imports are rejected',()=>{
  const original=saveAfter(2);
  const {qa,api,native,storage,window}=boot(original);
  qa.openBackup();
  qa.importBackup();
  assert.equal(native.importCalls,1);
  const bad=[
    'not json',
    JSON.stringify({format:'NOT_GREEN_DAWN',version:1,career:original}),
    JSON.stringify({format:'GREEN_DAWN_SAVE',version:8,career:original}),
    JSON.stringify({format:'GREEN_DAWN_SAVE',version:1,
      career:{...original,active:[original.active[0],original.active[0]]}})
  ];
  const before=storage.get('green-dawn-campaign-v1');
  for(const input of bad){
    qa.receiveBackup(input);
    assert.equal(api.status.state,'backup');
    assert.equal(qa.backupReady,false);
    assert.equal(storage.get('green-dawn-campaign-v1'),before);
  }
  qa.receiveBackup(JSON.stringify({format:'GREEN_DAWN_SAVE',version:1,career:saveAfter(1)}));
  assert.equal(api.status.state,'backup-confirm');
  qa.cancelBackup();
  assert.equal(api.status.state,'backup');
  assert.equal(qa.backupReady,false);
  qa.confirmBackup();
  assert.equal(window.reloadCount,0);
  assert.equal(storage.get('green-dawn-campaign-v1'),before);
});

test('Restoring an interrupted memorial preserves only the new mission casualties',()=>{
  const pending=saveAfter(3);
  pending.fallen.push({id:'r5',name:'HOLT',rank:1,missions:2,mission:3,cause:'KILLED IN ACTION'});
  pending.pendingHonours={operation:3,result:'won',fallen:['r5'],score:1600};
  const {qa,storage}=boot(saveAfter(1));
  qa.openBackup();
  qa.receiveBackup(JSON.stringify({format:'GREEN_DAWN_SAVE',version:1,career:pending}));
  qa.confirmBackup();
  const resumed=boot(JSON.parse(storage.get('green-dawn-campaign-v1')));
  assert.equal(resumed.api.status.state,'honours');
  assert.equal(resumed.api.ceremony.operation,3);
  assert.equal(resumed.api.ceremony.missionOnly,true);
  assert.equal(resumed.api.ceremony.displayed.length,1);
  assert.equal(resumed.api.ceremony.displayed[0].id,'r5');
  assert.equal(resumed.api.career.fallen.length,2,'historical casualties must persist');
});


test('100 WWII operations are grouped into 16 six-mission historical campaigns plus Berlin',()=>{
  const catalogue=fs.readFileSync(path.join(__dirname,'../ww2-campaign-data.js'),'utf8');
  const bundledCatalogue=fs.readFileSync(path.join(__dirname,'../android/app/src/main/assets/ww2-campaign-data.js'),'utf8');
  const map=fs.readFileSync(path.join(__dirname,'../ww2-campaign.html'),'utf8');
  const bundledMap=fs.readFileSync(path.join(__dirname,'../android/app/src/main/assets/ww2-campaign.html'),'utf8');
  assert.equal(catalogue,bundledCatalogue);
  assert.equal(map,bundledMap);
  assert.ok(map.includes('ww2-campaign-data.js'));
  assert.ok(map.includes('index.html?campaign=ww2'));
  const sandbox={window:{}};
  vm.runInNewContext(catalogue,sandbox,{timeout:3000});
  const data=sandbox.window.GREEN_DAWN_WW2;
  assert.equal(data.campaigns.length,17);
  assert.equal(data.missions.length,100);
  assert.equal(data.available,6);
  assert.equal(data.campaigns[0].country,'Norway');
  assert.equal(data.campaigns[15].last,96);
  assert.equal(data.campaigns[16].first,97);
  assert.equal(data.missions[99].number,100);
  assert.match(data.missions[99].title,/End of the Reich/);
  assert.ok(data.campaigns.slice(0,16).every(c=>c.missions.length===6));
  assert.ok(data.campaigns.slice(0,16).every(c=>c.missions[5].final===true));
  assert.ok(data.missions.every(m=>m.objective.length>10));
  assert.ok(data.missions.slice(96).every(m=>!m.historical));
});

test('WWII career is independent of the completed jungle campaign and starts in Norway',()=>{
  const {api,qa,storage}=boot(null,true);
  assert.equal(api.status.campaign,'ww2');
  assert.equal(api.status.plannedMissions,100);
  assert.equal(api.status.availableMissions,6);
  assert.equal(api.status.nextMission,1);
  assert.equal(api.career.active[0].name,'JACK');
  assert.equal(api.career.active[1].name,'TOM');
  assert.equal(api.career.active[2].name,'ALF');
  const originalJungle=storage.get('green-dawn-campaign-v1');
  api.start();
  assert.equal(api.status.state,'playing');
  assert.equal(api.status.objectiveKind,'coastal');
  assert.equal(api.status.enemyCount,9);
  assert.equal(api.status.extraction.x,797);
  assert.ok(api.path(101,572,578,326).length>0,'first snow route crosses towards the bridge');
  assert.ok(api.path(712,285,797,219).length>0,'landing zone reachable across the stream');
  qa.destroyObjective();
  assert.equal(api.status.state,'playing','destroying coastal gun must not win automatically');
  qa.evacOne();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,2);
  assert.deepEqual(Array.from(api.status.completed),[1]);
  assert.equal(storage.get('green-dawn-campaign-v1'),originalJungle,
    'WWII progress must not write to jungle storage');
  qa.leave();
  api.start();
  assert.equal(api.status.state,'playing','Mission 002 should unlock after Cold Landing');
  assert.equal(api.status.mission,2,'the cleared first mission must not replay');
});

test('WWII and jungle backup formats cannot overwrite each other',()=>{
  const ww2=boot(null,true);
  const jungle=boot(saveAfter(1),false);
  ww2.qa.openBackup();ww2.qa.exportBackup();
  const ww2Backup=ww2.native.exports[0];
  assert.equal(JSON.parse(ww2Backup).format,'GREEN_DAWN_WW2_SAVE');
  jungle.qa.openBackup();
  const beforeJungle=jungle.storage.get('green-dawn-campaign-v1');
  jungle.qa.receiveBackup(ww2Backup);
  assert.equal(jungle.api.status.state,'backup');
  assert.equal(jungle.storage.get('green-dawn-campaign-v1'),beforeJungle);
  jungle.qa.exportBackup();
  const jungleBackup=jungle.native.exports[0];
  const beforeWw2=ww2.storage.get('green-dawn-ww2-campaign-v1');
  ww2.qa.receiveBackup(jungleBackup);
  assert.equal(ww2.api.status.state,'backup');
  assert.equal(ww2.storage.get('green-dawn-ww2-campaign-v1'),beforeWw2);
});

test('WWII memorial still shows only soldiers killed during the current operation',()=>{
  const {api,qa}=boot(null,true);
  api.start();qa.killFirst();qa.destroyObjective();qa.evacOne();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.ceremony.missionOnly,true);
  assert.equal(api.ceremony.displayed.length,1);
  assert.equal(api.ceremony.displayed[0].mission,1);
  assert.equal(api.career.fallen.length,1);
  qa.leave();qa.camp();api.showMemorial();
  assert.equal(api.ceremony.missionOnly,false);
  assert.equal(api.ceremony.displayed.length,1);
});


function norwaySaveAfter(cleared,casualtyMission4=0){
  return {
    nextMission:cleared+1,nextId:9,
    active:[
      {id:'r0',name:'JACK',rank:Math.min(cleared,10),missions:cleared,joinedMission:1,order:0},
      {id:'r1',name:'TOM',rank:Math.min(cleared,10),missions:cleared,joinedMission:1,order:1},
      {id:'r2',name:'ALF',rank:Math.min(cleared,10),missions:cleared,joinedMission:1,order:2},
      {id:'r3',name:'BERT',rank:0,missions:0,joinedMission:2,order:3}
    ],
    fallen:[],
    victories:Array.from({length:cleared},(_,i)=>({
      mission:i+1,score:950+i*20,survivors:3,casualties:i===3?casualtyMission4:0
    })),
    bestScore:1600
  };
}

test('A v0.13 Norway Level 001 save unlocks Level 002 without resetting soldiers',()=>{
  const imported=norwaySaveAfter(1);
  const {api,storage}=boot(imported,true);
  assert.equal(api.status.nextMission,2);
  assert.equal(api.career.active[0].name,'JACK');
  assert.equal(api.career.active[0].rank,1);
  api.start();
  assert.equal(api.status.mission,2);
  assert.equal(api.norway.kind,'ridge');
  assert.equal(api.status.availableMissions,6);
  assert.equal(JSON.parse(storage.get('green-dawn-ww2-campaign-v1')).victories.length,1);
});

test('All five new Norway missions have unique objectives and render on Android canvas',()=>{
  for(let operation=2;operation<=6;operation++){
    const {api,qa}=boot(norwaySaveAfter(operation-1),true);
    api.start();
    assert.equal(api.status.mission,operation);
    assert.equal(api.norway.operation,operation);
    assert.ok(api.norway.objective?.label);
    assert.ok(api.path(590,330,658,330).length>0,'bridge must be passable, level '+operation);
    assert.doesNotThrow(()=>qa.drawFrame(),'level '+operation+' should paint without errors');
  }
});

test('Mission 002 captures three ridge checkpoints in order after clearing enemy guards',()=>{
  const {api,qa}=boot(norwaySaveAfter(1),true);
  api.start();
  const first=api.norway.checkpoints[0];
  qa.moveFirst(first.x,first.y);
  qa.step();
  assert.equal(api.status.state,'playing');
  qa.clearEnemies();
  for(let i=0;i<3;i++){
    const cp=api.norway.checkpoints[i];
    qa.moveFirst(cp.x,cp.y);
    qa.step();
    assert.equal(api.norway.clearedRidges,i+1);
    if(i<2)assert.equal(api.status.state,'playing');
  }
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,3);
});

test('Mission 003 cart does not move unattended, escorts advance it and can lose it',()=>{
  const {api,qa}=boot(norwaySaveAfter(2),true);
  api.start();qa.clearEnemies();
  const first=api.norway.convoy;
  assert.equal(first.hp,100);
  qa.moveEveryone(900,570);qa.step(.3);
  assert.equal(api.norway.convoy.x,first.x);
  qa.moveEveryone(first.x,first.y);qa.step(.3);
  assert.ok(api.norway.convoy.x>first.x);
  assert.equal(api.status.state,'playing');
  qa.cartToEnd();qa.clearEnemies();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,4);

  const fail=boot(norwaySaveAfter(2),true);
  fail.api.start();fail.qa.hurtConvoy(100);fail.qa.step();
  assert.equal(fail.api.status.state,'honours');
  assert.match(fail.qa.failure,/SUPPLY CART DESTROYED/);
  assert.equal(fail.api.career.victories.length,2);
  fail.qa.leave();fail.qa.camp();fail.api.start();
  assert.equal(fail.api.status.mission,3);
  assert.equal(fail.api.norway.convoy.hp,100);
});

test('Mission 004 requires both coastal guns destroyed before the extraction point counts',()=>{
  const {api,qa}=boot(norwaySaveAfter(3),true);
  api.start();
  assert.equal(api.norway.targets.length,2);
  qa.destroyTarget(0);qa.clearEnemies();
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.step();
  assert.equal(api.status.state,'playing');
  qa.destroyTarget(1);qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,5);
});

test('Mission 005 requires sabotage, sailor rescue and return to harbour',()=>{
  const {api,qa}=boot(norwaySaveAfter(4),true);
  api.start();qa.destroyTarget(0);qa.clearEnemies();
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.step();
  assert.equal(api.status.state,'playing');
  qa.moveFirst(278,234);qa.step();
  assert.equal(api.norway.rescued,true);
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,6);
});

test('Mission 006 demands three targets, 35-second pier defence and final ship boarding',()=>{
  const {api,qa,storage}=boot(norwaySaveAfter(5),true);
  api.start();
  assert.equal(api.status.grenades,5,'rescued supplies carry into finale');
  assert.equal(api.norway.targets.length,3);
  qa.destroyTarget(0);qa.destroyTarget(1);
  assert.equal(api.norway.holding,false);
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.step();
  assert.equal(api.status.state,'playing');
  qa.destroyTarget(2);
  assert.equal(api.norway.holding,true);
  assert.equal(api.norway.holdRemaining,35);
  assert.equal(api.norway.waves,1);
  qa.clearEnemies();qa.moveFirst(275,137);qa.step(1);
  const held=api.norway.holdRemaining;
  assert.ok(held<35);
  qa.moveEveryone(900,560);qa.clearEnemies();qa.step(1);
  assert.equal(api.norway.holdRemaining,held,'hold pauses if squad retreats');
  qa.moveEveryone(275,137);
  for(let i=0;i<36&&api.norway.holdRemaining>0;i++){qa.clearEnemies();qa.step(1);}
  assert.equal(api.norway.holdRemaining,0);
  assert.ok(api.norway.waves>=2);
  assert.equal(api.status.state,'playing');
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.clearEnemies();qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.status.nextMission,7);
  assert.equal(api.career.victories.length,6);
  qa.leave();qa.camp();api.start();
  assert.equal(api.status.state,'title','completed Norway cannot be replayed');
  assert.equal(JSON.parse(storage.get('green-dawn-ww2-campaign-v1')).nextMission,7);
});

test('Saving every soldier in mission 004 reduces German waves in the Norway finale',()=>{
  const saved=boot(norwaySaveAfter(5,0),true);
  saved.api.start();assert.equal(saved.api.norway.waveLimit,3);
  const costly=boot(norwaySaveAfter(5,1),true);
  costly.api.start();assert.equal(costly.api.norway.waveLimit,4);
});

test('Norway medal ceremony contains only the current fallen and leaves jungle save intact',()=>{
  const {api,qa,storage}=boot(norwaySaveAfter(4),true);
  const jungleBefore=storage.get('green-dawn-campaign-v1');
  api.start();qa.killFirst();qa.destroyTarget(0);qa.clearEnemies();
  qa.moveFirst(278,234);qa.step();
  qa.moveFirst(api.status.extraction.x,api.status.extraction.y);qa.step();
  assert.equal(api.status.state,'honours');
  assert.equal(api.ceremony.missionOnly,true);
  assert.equal(api.ceremony.displayed.length,1);
  assert.equal(api.ceremony.displayed[0].mission,5);
  qa.leave();qa.camp();api.showMemorial();
  assert.equal(api.ceremony.missionOnly,false);
  assert.equal(api.ceremony.displayed.length,1);
  assert.equal(storage.get('green-dawn-campaign-v1'),jungleBefore);
});

test('Norway six-mission backup restores next level 007 locked without rewriting ranks',()=>{
  const past=norwaySaveAfter(6);
  const {qa,api,storage,window}=boot(norwaySaveAfter(1),true);
  qa.openBackup();
  qa.receiveBackup(JSON.stringify({format:'GREEN_DAWN_WW2_SAVE',version:1,career:past,settings:{audioOn:true}}));
  assert.equal(api.status.state,'backup-confirm');
  qa.confirmBackup();
  assert.equal(window.reloadCount,1);
  const restored=JSON.parse(storage.get('green-dawn-ww2-campaign-v1'));
  assert.equal(restored.victories.length,6);
  const fresh=boot(restored,true);
  assert.equal(fresh.api.status.nextMission,7);
  fresh.api.start();
  assert.equal(fresh.api.status.state,'title');
});
