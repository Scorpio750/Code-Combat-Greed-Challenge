Code-Combat-Greed-Challenge
===========================

JS coding challenge for Code Combat.

The goal of this coding challenge is to create an algorithm to efficiently gather coins on the stage and summon units to destroy the enemy base before they destroy mine or 3 minutes have passed. Once summoned, combat units will auto-attack 

My solution is to use a greedy algorithm to gather gold by cycling through all my peons (gold collectors) and picking the nearest coin to it respectively. The problem with this strategy is that since the chooseAction() method runs once every frame, when a coin is produced that is closer to the selected peon than its current target it will change direction to the new coin, which in the worst case means it doubles back the way it came, wasting distance and time traveled already.

I also cannot establish any global variables because of the frame issue; all variables and data structures are destroyed at the end of the frame. Thus far, the greedy approach seems to be the most optimal.
