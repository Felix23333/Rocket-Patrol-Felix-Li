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
    }

    create()
    {
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, "starfield"
        ).setOrigin(0,0);

        this.rocket = this.add.sprite(
            game.config.width / 2, game.config.height - 45, "rocket"
        ).setOrigin(0,0);
        

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
        this.leftMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() 
    {
        this.speed = 1;
        if(this.leftMove.isDown && this.rocket.x > borderUIsize)
        {
            this.rocket.x -= this.speed;
        }
        if(this.rightMove.isDown && this.rocket.x < game.config.width - borderUIsize * 1.5)
        {
            this.rocket.x += this.speed;
        }
        this.starfield.tilePositionX -= 2;
    }
}