class GameOver extends Phaser.Scene{
    constructor(){
        super("ending")        
        
    }

    preload(){
      
    }
    create(){
        this.gameOver = this.add.bitmapText(300,400,"rocketSquare","GAME OVER" );
        this.replay = this.add.bitmapText(125,450,"rocketSquare","Press SPACE to Play Again!" );

        let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down',()=>{
            this.scene.start("levelScene");

        });
    }
    
    update(){
        
    }

  
}