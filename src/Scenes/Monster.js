class Monster extends Phaser.Scene{
    constructor(){
        super("levelScene");        
        this.my = {sprite: {}, text:{}};
        this.centerX = 150;
        this.centerY = 150;
        this.my.sprite.bulletArr = [];
        this.my.sprite.mineArr = [];
        this.my.sprite.laserArr = [];
        this.my.sprite.homingArr = [];
        this.my.sprite.bomberArr = [];


        
        this.playerHealth = 3;
        this.playerScore = 0;
        this.my.sprite.reinforcements = [];

        this.homingState = false;
        this.homingCooldown = 110;
        this.homingCooldownCounter = 0;

        this.laserState = false;
        this.laserDuration = 13;
        this.laserDurationCounter = 0;


        this.damageCooldown = 100;
        this.damageCooldownCounter = 0;
        this.fireCooldown = 3;
        this.fireCooldownCounter = 0;
        
        

    }

    preload(){
        this.load.setPath("./assets/");

        this.load.image("playerShip", "ship_0018.png");
        this.load.image("bomberEnemyShip", "spaceShips_007.png");
        this.load.image("homingEnemyShip", "spaceShips_009.png");
        
        this.load.image("playerBullet", "tile_0000.png");
        this.load.image("enemyMine", "tile_0016.png");
        this.load.image("laserBeam", "spaceMissiles_037.png");


        this.load.bitmapFont("rocketSquare","KennyRocketSquare_0.png","KennyRocketSquare.fnt");

        this.load.audio("explode","explosionCrunch_004.ogg");
        this.load.audio("shot","laserLarge_001.ogg");

    }

    create(){
        this.init_game();
        //this.graphics = this.add.graphics();
        
        this.points = [
            300, 200, 
            576, 33,  
            575, 141, 
            20, 141, 
            63, 236, 
            575, 243, 
            575, 339, 
            68, 333
        ];
        this.homingPoints = [
            
        ];
        this.mainPath = new Phaser.Curves.Spline(this.points);
        this.homingPath = new Phaser.Curves.Spline(this.homingPoints);
   
        this.my.sprite.plane = this.add.sprite(this.centerX,game.config.height-20,"playerShip");
        this.my.sprite.plane.setScale(1.5);

        this.my.sprite.enemyPlane = this.add.follower(this.mainPath,50,50,"bomberEnemyShip");
        this.my.sprite.bomberArr.push(this.my.sprite.enemyPlane);
        this.my.sprite.enemyPlane1 = this.add.sprite(this.my.sprite.enemyPlane.x-40,this.my.sprite.enemyPlane.y+40,"bomberEnemyShip");
        this.my.sprite.bomberArr.push(this.my.sprite.enemyPlane1);
        this.my.sprite.enemyPlane2 = this.add.sprite(this.my.sprite.enemyPlane.x+40,this.my.sprite.enemyPlane.y+40,"bomberEnemyShip");
        this.my.sprite.bomberArr.push(this.my.sprite.enemyPlane2);
        this.my.sprite.enemyPlane3 = this.add.sprite(this.my.sprite.enemyPlane.x-70,this.my.sprite.enemyPlane.y+80,"bomberEnemyShip");
        this.my.sprite.bomberArr.push(this.my.sprite.enemyPlane3);
        this.my.sprite.enemyPlane4 = this.add.sprite(this.my.sprite.enemyPlane.x+70,this.my.sprite.enemyPlane.y+80,"bomberEnemyShip");
        this.my.sprite.bomberArr.push(this.my.sprite.enemyPlane4);
        for(let elements of this.my.sprite.bomberArr){
            elements.setScale(0.22);
        }

        this.my.sprite.enemyHoming = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x-40,this.my.sprite.enemyPlane.y,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming);
        this.my.sprite.enemyHoming1 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x-70,this.my.sprite.enemyPlane.y,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming1);
        this.my.sprite.enemyHoming2 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x+40,this.my.sprite.enemyPlane.y,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming2);
        this.my.sprite.enemyHoming3 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x+70,this.my.sprite.enemyPlane.y,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming3);
        this.my.sprite.enemyHoming4 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x-70,this.my.sprite.enemyPlane.y+40,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming4);
        this.my.sprite.enemyHoming5 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x,this.my.sprite.enemyPlane.y + 40,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming5);
        this.my.sprite.enemyHoming6 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x+70,this.my.sprite.enemyPlane.y+40,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming6);
        this.my.sprite.enemyHoming7 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x-40,this.my.sprite.enemyPlane.y+80,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming7);
        this.my.sprite.enemyHoming8 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x,this.my.sprite.enemyPlane.y+80,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming8);
        this.my.sprite.enemyHoming9 = this.add.follower(this.homingPath,this.my.sprite.enemyPlane.x+40,this.my.sprite.enemyPlane.y+80,"homingEnemyShip");
        this.my.sprite.homingArr.push(this.my.sprite.enemyHoming9);
        for(let elements of this.my.sprite.homingArr){
            elements.setScale(0.22);
        }


        this.my.sprite.reinforcementOne = this.my.sprite.reinforcements.push(this.add.sprite(20,20,"playerShip"));
        this.my.sprite.reinforcementTwo = this.my.sprite.reinforcements.push(this.add.sprite(50,20,"playerShip"));
        this.my.sprite.reinforcementThree = this.my.sprite.reinforcements.push(this.add.sprite(80,20,"playerShip"));
       
        this.my.text.score = this.add.bitmapText(550,0,"rocketSquare","Score: " + this.playerScore);


       
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        //this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down',()=>{
            if(this.fireCooldownCounter <0){
            this.my.sprite.projectile = this.my.sprite.bulletArr.push(this.add.sprite(this.my.sprite.plane.x,this.my.sprite.plane.y,"playerBullet"));
            this.fireCooldownCounter = this.fireCooldown;
            this.sound.play("shot",{
                volume: 0.7
            });
            }
        });

        


        if(this.mainPath.points[0]){
            this.my.sprite.enemyPlane.x = this.mainPath.points[0].x;
            this.my.sprite.enemyPlane.y = this.mainPath.points[0].y;
            this.my.sprite.enemyPlane.visible = true;
            this.my.sprite.enemyPlane.startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 10000,
                ease: 'Linear',
                repeat: -1,
                yoyo: true,
                rotateToPath: false,
                rotationOffset: -90

             });
            
        }


    }
    init_game(){
        this.my = {sprite: {}, text:{}};
        this.centerX = 150;
        this.centerY = 150;
        this.my.sprite.bulletArr = [];
        this.my.sprite.mineArr = [];
        this.my.sprite.laserArr = [];
        this.my.sprite.homingArr = [];
        this.my.sprite.bomberArr = [];


        
        this.playerHealth = 3;
        this.playerScore = 0;
        this.my.sprite.reinforcements = [];

        this.homingState = false;
        this.homingCooldown = 110;
        this.homingCooldownCounter = 0;

        this.laserState = false;
        this.laserDuration = 13;
        this.laserDurationCounter = 0;


        this.damageCooldown = 100;
        this.damageCooldownCounter = 0;
        this.fireCooldown = 3;
        this.fireCooldownCounter = 0;
        
        
    }

    update(){
        this.fireCooldownCounter--;
        this.homingCooldownCounter--;
        this.damageCooldownCounter--;
        this.laserDurationCounter--;
        this.ranX = Phaser.Math.Between(270,301);
        this.launchHoming = Phaser.Math.Between(250,301);
        this.ranBomberArrIndex = Phaser.Math.Between(0,4);
        
        if((this.ranX == 300) ){
            if(this.my.sprite.bomberArr[0]){
            this.my.sprite.mine = this.my.sprite.mineArr.push(this.add.sprite(this.my.sprite.bomberArr[this.ranBomberArrIndex].x,this.my.sprite.bomberArr[this.ranBomberArrIndex].y,"enemyMine"));
            }
        }

        if((this.ranX == 282) ){
            if(this.my.sprite.bomberArr[0]){
            this.my.sprite.laser = this.add.sprite(this.my.sprite.bomberArr[this.ranBomberArrIndex].x,this.my.sprite.bomberArr[this.ranBomberArrIndex].y+385,"laserBeam");
            this.my.sprite.laserArr.push(this.my.sprite.laser);
            this.my.sprite.laser.displayHeight = 800;
            this.my.sprite.laser.displayWidth = 10;
            this.my.sprite.laser.flipY = true;
            this.laserDurationCounter = this.laserDuration;
            }
            
        }

        if(this.my.sprite.enemyPlane1){
        this.my.sprite.enemyPlane1.x = this.my.sprite.enemyPlane.x -40;
        this.my.sprite.enemyPlane1.y = this.my.sprite.enemyPlane.y+40;
        }
        if(this.my.sprite.enemyPlane2){

        this.my.sprite.enemyPlane2.x = this.my.sprite.enemyPlane.x +40;
        this.my.sprite.enemyPlane2.y = this.my.sprite.enemyPlane.y+40;
        }
        if(this.my.sprite.enemyPlane3){

        this.my.sprite.enemyPlane3.x = this.my.sprite.enemyPlane.x -70;
        this.my.sprite.enemyPlane3.y = this.my.sprite.enemyPlane.y+80;
        }
        if(this.my.sprite.enemyPlane4){

        this.my.sprite.enemyPlane4.x = this.my.sprite.enemyPlane.x +70;
        this.my.sprite.enemyPlane4.y = this.my.sprite.enemyPlane.y+80;
        }

        if((this.launchHoming == 301) && (this.homingCooldownCounter < 0)&&(this.my.sprite.homingArr[0])){
            if(this.currHoming){
                this.currHoming.destroy();
            }
            
            this.homingPath.points = [];

            this.homingPath.addPoint(this.my.sprite.homingArr[0].x,this.my.sprite.homingArr[0].y);
            this.homingPath.addPoint(350,20);

            this.homingPath.addPoint( this.my.sprite.plane.x,game.config.height+50); 
            this.homingState = true;
        }
        
        if((this.homingState == false) ){
           
            if((this.my.sprite.homingArr.length >9) &&( this.my.sprite.enemyHoming.active== true)){
            this.my.sprite.enemyHoming.x = this.my.sprite.enemyPlane.x -30;
            this.my.sprite.enemyHoming.y = this.my.sprite.enemyPlane.y;
            }
            if((this.my.sprite.homingArr.length >8) &&( this.my.sprite.enemyHoming1.active== true)){
            this.my.sprite.enemyHoming1.x = this.my.sprite.enemyPlane.x -70;
            this.my.sprite.enemyHoming1.y = this.my.sprite.enemyPlane.y;
            }
            if((this.my.sprite.homingArr.length >7) &&( this.my.sprite.enemyHoming2.active== true)){
            this.my.sprite.enemyHoming2.x = this.my.sprite.enemyPlane.x +40;
            this.my.sprite.enemyHoming2.y = this.my.sprite.enemyPlane.y;
            }
            if((this.my.sprite.homingArr.length >6) &&( this.my.sprite.enemyHoming3.active== true)){
            this.my.sprite.enemyHoming3.x = this.my.sprite.enemyPlane.x +70;
            this.my.sprite.enemyHoming3.y = this.my.sprite.enemyPlane.y;
            }
            if((this.my.sprite.homingArr.length >5) &&( this.my.sprite.enemyHoming4.active== true)){
            this.my.sprite.enemyHoming4.x = this.my.sprite.enemyPlane.x -70;
            this.my.sprite.enemyHoming4.y = this.my.sprite.enemyPlane.y+40;
            }
            if((this.my.sprite.homingArr.length >4) &&( this.my.sprite.enemyHoming5.active== true)){
            this.my.sprite.enemyHoming5.x = this.my.sprite.enemyPlane.x;
            this.my.sprite.enemyHoming5.y = this.my.sprite.enemyPlane.y+40;
            }
            if((this.my.sprite.homingArr.length >3) &&( this.my.sprite.enemyHoming6.active== true)){
            this.my.sprite.enemyHoming6.x = this.my.sprite.enemyPlane.x +70;
            this.my.sprite.enemyHoming6.y = this.my.sprite.enemyPlane.y+40;
            }
            if((this.my.sprite.homingArr.length >2) &&( this.my.sprite.enemyHoming7.active== true)){
            this.my.sprite.enemyHoming7.x = this.my.sprite.enemyPlane.x -40;
            this.my.sprite.enemyHoming7.y = this.my.sprite.enemyPlane.y+80;
            }
            if((this.my.sprite.homingArr.length >1) &&( this.my.sprite.enemyHoming8.active== true)){
            this.my.sprite.enemyHoming8.x = this.my.sprite.enemyPlane.x;
            this.my.sprite.enemyHoming8.y = this.my.sprite.enemyPlane.y+80;
            }
            if((this.my.sprite.homingArr.length >0) &&( this.my.sprite.enemyHoming9.active== true)){
            this.my.sprite.enemyHoming9.x = this.my.sprite.enemyPlane.x +40;
            this.my.sprite.enemyHoming9.y = this.my.sprite.enemyPlane.y+80;
            }
            

        }else if ((this.homingCooldownCounter <0) &&(this.my.sprite.homingArr[0])){
            //this.graphics.lineStyle(2, 0xffffff, 1);
            //this.homingPath.draw(this.graphics,32);
            this.currHoming = this.my.sprite.homingArr[0];
            this.my.sprite.homingArr[0].x = this.homingPath.points[0].x;
            this.my.sprite.homingArr[0].y = this.homingPath.points[0].y;

            this.my.sprite.homingArr.shift().startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 3000,
                ease: 'Linear',
                repeat: 0,
                yoyo: false,
                rotateToPath: true,
                rotationOffset: -90

             });       
             this.homingCooldownCounter = this.homingCooldown;
             this.homingState = false;  
        }
        if(this.currHoming){
            console.log("Homing cooldown counter: "+this.homingCooldownCounter);
            if(this.collides(this.currHoming,this.my.sprite.plane) && (this.damageCooldownCounter < 0)){
                this.damageReceived();
                this.damageCooldownCounter =  this.damageCooldown;
            }

        }
        

        if(this.dKey.isDown){
            this.my.sprite.plane.x  += 8;
            if(this.my.sprite.plane.x >= 800){
                this.my.sprite.plane.x  = 800;
            }
        }
        if(this.aKey.isDown){
            this.my.sprite.plane.x  -= 8;
            if(this.my.sprite.plane.x <= 0){
                this.my.sprite.plane.x  = 0;
            }

        }
        if(this.pKey.isDown){
            this.scene.start("levelScene");

        }

       

        for(let elements of this.my.sprite.mineArr){
            elements.y += 6;

        }
        

       for(let elements of this.my.sprite.bulletArr){
            elements.y -= 25;
            for(let homer of this.my.sprite.homingArr){
                if(this.collides(elements,homer)){
                    this.collidedBullet = elements;
                    homer.x = 900;
                    elements.x = 900;
                    this.playerScore += 50;
                }
                if((homer.x >700)&&(elements.x >700)){
                    homer.visible = false;
                    homer.active = false;
                    elements.destroy();
                }
            }
            for(let bombers of this.my.sprite.bomberArr){
                if(this.collides(elements,bombers)){
                    bombers.destroy();
                    bombers.x = 900;
                    this.playerScore += 75;
                }
            }
            
       }

       

       for(let elements of this.my.sprite.laserArr){
            elements.y += 15;
            if(this.collides(elements,this.my.sprite.plane) && (this.damageCooldownCounter < 0)){
            this.damageReceived();
            this.damageCooldownCounter =  this.damageCooldown;

            }

        }

       for(let elements of this.my.sprite.mineArr){
            if(this.collides(elements,this.my.sprite.plane) && (this.damageCooldownCounter < 0)){
                this.damageReceived();
                this.damageCooldownCounter =  this.damageCooldown;
            }
       }

       

        

       if(this.my.sprite.enemyPlane.active == false){
        this.scene.start("winning");
       } 

       this.my.text.score.setText("Score: "+ this.playerScore);

    }




    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        
        return true;
    }

    damageReceived(){
        if(this.my.sprite.reinforcements[0]){
            this.my.sprite.reinforcements.pop().visible = false;
            this.sound.play("explode",{
                volume: 1
            });
        }else{
            this.scene.start("ending");
        }
        
    }
}