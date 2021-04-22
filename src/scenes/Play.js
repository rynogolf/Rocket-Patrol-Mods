class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('ui', './assets/ui.png');
        this.load.image('sky', './assets/sky.png');
        // load spritesheet
        this.load.spritesheet('duck', './assets/duck.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('explosion', './assets/duck_shot.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place sky
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0, 0);
        
        // UI background
        this.ui = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'ui').setOrigin(0, 0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding, 'bullet').setOrigin(0.5, 0);

        // add rocket (player 2)
        if (game.settings.players == 2) {
            this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - 
            borderUISize - borderPadding, 'bullet').setOrigin(0.5, 0);
        }

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6,
        borderUISize * 4, 'duck', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3,
        borderUISize * 5 + borderPadding * 2, 'duck', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 +
        borderPadding * 4, 'duck', 0, 10).setOrigin(0, 0);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        if (game.settings.players == 2) {
            keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('duck', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 4,
            repeat: -1
        });

        this.ship01.play("fly");
        this.ship02.play("fly");
        this.ship03.play("fly");

        // initialize score
        this.p1Score = 0;
        if (game.settings.players == 2) {
            this.p2Score = 0;
        }

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#00e1ff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2,
        this.p1Score, scoreConfig);
        if (game.settings.players == 2) {
            this.scoreRight = this.add.text(game.config.width - borderUISize * 8, borderUISize + borderPadding * 2,
            this.p2Score, scoreConfig);
        }

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= starSpeed;

        if(!this.gameOver) {
            this.p1Rocket.update();     // update rocket
            if (game.settings.players == 2) {
                this.p2Rocket.update();
            }
            this.ship01.update();       // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
        }
        if(game.settings.players == 2 && this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, this.p2Rocket);
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;
        }
        if(game.settings.players == 2 && this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;
        }
        if(game.settings.players == 2 && this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.sound.play('sfx_explosion');
    }
}