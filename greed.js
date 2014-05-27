// This code runs once per frame. Build units and command peons!
// Destroy the human base within 180 seconds.
// Run over 4000 statements per call and chooseAction will run less often.
// Check out the green Guide button at the top for more info.

//Not working for some reason
if (this.budget === undefined)
    this.budget = -1;

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

function getRidofNearestGold(element) {
    return element != peons[peonIndex].getNearest(moneys);
}

for (var peonIndex = 0; peonIndex < peons.length; peonIndex++) {
    var peon = peons[peonIndex];
    //makes sure peon targets do not overlap
    /* for (var j = 0; j < peons.length; j++) {
        if (peons[j] == peons[peonIndex])
            continue;
        if (peons[peonIndex].getNearest(moneys) == peons[j].getNearest(moneys)) {
            
            moneys = moneys.filter(getRidofNearestGold);
        }   
    } */
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
if (base.gold >= 115)
    this.budget = 115;
//makes peons unless enemies get close
if (peons.length < 4 && base.distance(closestEnemy) > 30)
    type = 'peon';
//makes 5 munchkins at once
else if (this.budget <= 115 && this.budget > 0) { 
    if (this.budget > 65) {
        type = 'munchkin';
        this.budget -= 10;
    }
    else if (this.budget > 25) {
        type = 'shaman';
        this.budget -= 40;
    }
    else if (this.budget > 0){
        type = 'ogre';
        this.budget -= 25;
    }
}

if (type !== undefined) {
    if (base.gold >= base.buildables[type].goldCost)
        base.build(type);
}
// 'peon': Peons gather gold and do not fight.
// 'munchkin': Light melee unit.
// 'ogre': Heavy melee unit.
// 'shaman': Support spellcaster.
// 'fangrider': High damage ranged attacker.
// 'brawler': Mythically expensive super melee unit.
// See the buildables documentation below for costs and the guide for more info.
