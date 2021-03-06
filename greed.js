// This code runs once per frame. Build units and command peons!
// Destroy the human base within 180 seconds.
// Run over 4000 statements per call and chooseAction will run less often.
// Check out the green Guide button at the top for more info.

//Not working for some reason
/*if (typeof this.munchkinBudget === undefined) {
this.munchkinBudget = 50;
}*/
var base = this;

/////// 1. Command peons to grab coins and gems. ///////
// You can only command peons, not fighting units.
// You win by gathering gold more efficiently to make a larger army.
// Click on a unit to see its API.
var items = base.getItems();
var coins = base.getByType('coin');
var goldcoins = base.getByType('gold-coin');
var gems = base.getByType('gem');
//make consolidated array of all money items
var moneys = gems.concat(coins, goldcoins);

//unit indexers
var peons = base.getByType('peon');
var ogres = base.getByType('ogre');
var shamans = base.getByType('shaman');
var munchkins = base.getByType('munchkin');
var fangriders = base.getByType('fangrider');
var enemies = base.getEnemies();

//cycle through all peons and grab the nearest money (greedy approach)
for (var peonIndex = 0; peonIndex < peons.length; peonIndex++) {
    var peon = peons[peonIndex];
    var money = peon.getNearest(moneys);
    base.command(peon, 'move', money.pos);
}

//find the enemy closest to the base
var closestEnemy;
for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
    if (enemies[enemyIndex].type == 'peasant')
        continue;
        
    if (closestEnemy === undefined)
        closestEnemy = enemies[enemyIndex];

    else if (base.distance(closestEnemy) > base.distance(enemies[enemyIndex]))
        closestEnemy = enemies[enemyIndex];
}

/////// 2. Decide which unit to build this frame. ///////
// Peons can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.

var type;
//makes peons unless enemies get close
if (peons.length < 4 && base.distance(closestEnemy) > 50)
    type = 'peon';
//makes combat units
/*if (Math.floor(this.munchkinBudget/10) > 0) {
base.build('munchkin');
this.munchkinBudget -= 10;
}*/
else if (ogres.length < 2)
    type = 'ogre';
else if (shamans.length < 3)
    type = 'shaman';
else if (munchkins.length < 3)
    type = 'munchkin';
else if (fangriders.length < 2)
    type = 'fangrider';
else
    type = 'berserker';

if (base.gold >= base.buildables[type].goldCost)
    base.build(type);
    
// 'peon': Peons gather gold and do not fight.
// 'munchkin': Light melee unit.
// 'ogre': Heavy melee unit.
// 'shaman': Support spellcaster.
// 'fangrider': High damage ranged attacker.
// 'brawler': Mythically expensive super melee unit.
// See the buildables documentation below for costs and the guide for more info.
