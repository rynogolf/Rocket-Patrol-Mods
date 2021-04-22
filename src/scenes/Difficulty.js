class Difficulty extends Phaser.Scene {
    constructor() {
        super("diffScene");
    }

    preload() {
        // load title screen
        this.load.image('diffscreen', './assets/diffscreen.png');
        this.load.image('diffscreen2', './assets/diffscreen2.png');
    }

    create() {
        // add difficulty screen
        if (game.settings.players == 1) {
            this.title = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'diffscreen').setOrigin(0, 0);
        } else {
            this.title = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'diffscreen2').setOrigin(0, 0);
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings.spaceshipSpeed = 3;
            game.settings.gameTimer = 60000;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings.spaceshipSpeed = 4;
            game.settings.gameTimer = 45000;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}