/** 
 * Collin Rowell
 * Duck Patrol
 * ~14 hours 
 * 
 * Point Breakdown:
 * Implement a simultaneous two-player mode (30)
 * Redesign the game's artwork, UI, and sound to change its theme/aesthetic
 * (to something other than sci-fi) (60) (If not, then all of the below)
 * Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
 * Create a new title screen (e.g., new artwork, typography, layout) (10)
 * Create a new animated sprite for the Spaceship enemies (10)
 * Replace the UI borders with new artwork (10)
 * Create a new scrolling tile sprite for the background (5)
 * Total: 90-85/100
*/
//game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Difficulty, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 2;

// reserve keyboard bindings
let keyENTER, keyR, keyLEFT, keyRIGHT, keyA, keyD, keySPACE;