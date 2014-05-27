s;

/////// 1. Command peons to grab coins and gems. ///////
// You can only command peons, not fighting units.
// You win by gathering gold more efficiently to make a larger army.
// Click on a unit to see its API.
var items = base.getItems();
var peons = base.getByType('peon');
var coins = base.getByType('coin');
var ogres = base.getByType('ogre');
var munchkins = base.getByType('munchkin');
var enemies = base.getEnemies();

//make a queue for the coins so the peons don't change direction halfway through
//cycle through all peons and grab the nearest coin
//greedy appraoch
//How do I stop them from changing direction halfway through?
for (var peonIndex = 0; peonIndex < peons.length; peonIndex++) {
    var peon = peons[peonIndex];
    var coin = peon.getNearest(coins);
    base.command(peon, 'move', coin.pos);
}
/* original code 

for (var peonIndex = 0; peonIndex < peons.length; peonIndex++) {
    var peon = peons[peonIndex];
    var item = base.getNearest(items);
    if (item)
        base.command(peon, 'move', item.pos);
} */

//find the enemy closest to the base
var closestEnemy;
for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
    if ((closestEnemy === undefined) && (enemies[enemyIndex].type != 'peon'))
        closestEnemy = enemies[enemyIndex];
    else if (enemies[enemyIndex].type == 'peon') {
        continue;
    }
    else if (base.distance(closestEnemy) > base.distance(enemies[enemyIndex]))
        closestEnemy = enemies[enemyIndex];
}

/////// 2. Decide which unit to build this frame. ///////
// Peons can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.

var type;
if (base.built.length == 0 || base.distance(closestEnemy) > 10)
    type = 'peon';
else if ((ogres == 2) || (munchkins == 10)) 
    type = 'shaman';
else
    type = 'ogre';
    
if (base.gold >= base.buildables[type].goldCost)
    base.build(type);


// 'peon': Peons gather gold and do not fight.
// 'munchkin': Light melee unit.
// 'ogre': Heavy melee unit.
// 'shaman': Support spellcaster.
// 'fangrider': High damage ranged attacker.
// 'brawler': Mythically expensive super melee unit.
// See the buildables documentation below for costs and the guide for more info.