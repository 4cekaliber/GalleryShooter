class won extends Phaser.Scene{
    constructor(){
        super("winning")        
        
    }

    preload(){
      
    }
    create(){
        this.gameOver = this.add.bitmapText(100,400,"rocketSquare","You Destroyed the Mother Ship!" );
        this.replay = this.add.bitmapText(125,450,"rocketSquare","Press SPACE to Play Again!" );

        let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down',()=>{
            this.scene.start("levelScene");

        });
    }
    
    update(){
        
    }

  
}