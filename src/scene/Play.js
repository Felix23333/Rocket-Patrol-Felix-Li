class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }
    preload()
    {
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("ship", "assets/spaceship.png")
        this.load.spritesheet("explosion", "assets/explosion.png",
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create()
    {
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, "starfield"
        ).setOrigin(0,0);
        //create rocket
        this.rocket = new Rocket(this, game.config.width / 2, game.config.height - 45,
                                "rocket");
        
        //create Ship
        this.ship1 = new Ship(this, 100, 200, "ship");
        this.ship2 = new Ship(this, 200, 250, "ship");
        this.ship3 = new Ship(this, 400, 300, "ship");
        //green UI
        this.add.rectangle(0, borderPadding + borderUIsize, 
                           game.config.width, borderUIsize * 2, 
                           0x00FF00).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        //detect keyboard input
        leftMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rightMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //animation
        this.anims.create({
            key: "explode", 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate : 30
        });
    }

    

    update() 
    {
        this.gameover = false;
        this.starfield.tilePositionX -= 2;
        this.rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        this.checkcollision(this.rocket, this.ship1);
        this.checkcollision(this.rocket, this.ship2);
        this.checkcollision(this.rocket, this.ship3);
    }

    checkcollision(rocket, ship)
    {
        if(rocket.x + rocket.width >= ship.x 
            && rocket.y + rocket.height >= ship.y
            && rocket.x <= ship.x + ship.width
            && rocket.y <= ship.y + ship.height)
        {
            this.shipExplosion(ship);
            rocket.reset();
        }
    }

    shipExplosion(ship)
    {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x - ship.width, 
                    ship.y - ship.height * 0.5, 'explosion').setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position    
            boom.destroy();                       // remove explosion sprite
        });       
    }
}