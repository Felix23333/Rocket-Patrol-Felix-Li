
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }
    
    BeginPlay()
    {
        this.scene.start("playScene");
    }

    create()
    {
        //Set Menu info text
        this.add.text(20, 20, "Rocket Patrol Menu").setOrigin(-1.25, -2);
        this.add.text(20, 20,  "'A' - Left Move     'D' - Right Move").setOrigin(-0.4, -15);
        this.add.text(20, 20, "'K' - Shoot").setOrigin(-2.3, -18);
        this.add.text(50, 50, "Click 'Enter' to play!").setOrigin(-0.8, -22);

        //Handle Scene Transition
        this.input.keyboard.on('keydown-ENTER', this.BeginPlay, this);
    }
}