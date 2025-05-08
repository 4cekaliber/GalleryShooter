class start extends Phaser.Scene{
    constructor(){
        super("starter")        
        
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.bitmapFont("rocketSquare","KennyRocketSquare_0.png","KennyRocketSquare.fnt");
    }
    create(){
        this.sKey = this.input.keyboard.addKey("S");
        this.title = this.add.bitmapText(280,200,"rocketSquare","SPACE CHASE" );
        this.full = this.add.bitmapText(180,530,"rocketSquare","Tip: Enter Full Screen" );
        this.toPlay = this.add.bitmapText(120,400,"rocketSquare","Press S to Chase the Aliens!" );
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.sKey)){
            this.scene.start("levelScene");

        }
    }

  
}