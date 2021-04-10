
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
        this.add.text(20, 20, "Rocket Patrol Menu").setOrigin(-1.25, -2);
        this.add.text(50, 50, "Click 'Enter' to play!").setOrigin(-0.8, -20);
        this.input.keyboard.on('keydown-ENTER', this.BeginPlay, this);
    }
}