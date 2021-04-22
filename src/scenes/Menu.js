class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load title screen
        this.load.image('title', './assets/titlescreen.png');

        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/duck_hit.wav');
        this.load.audio('sfx_rocket', './assets/bullet_shoot.wav');
    }

    create() {
        // add titlescreen
        this.title = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title').setOrigin(0, 0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // 1 Player
            game.settings = {
                players: 1,
                spaceshipSpeed: 0,
                gameTimer: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('diffScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // 2 Player
            game.settings = {
                players: 2,
                spaceshipSpeed: 0,
                gameTimer: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('diffScene');
        }
    }
}