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
            ship.alpha = 0;
            ship.reset();
            rocket.reset();
        }
    }
}