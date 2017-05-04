

var ballDistance = 120;
var rotationSpeed = 4;
var angleRange = [25, 155];
var visibleTargets = 7;
var tgColors = [0x62bd18, 0xffbb00, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2];
var bgColors = [0xc1d7e2, 0xdcfbcc, 0xf9cbcd, 0xdadaee, 0x9ed1c7, 0xedeef9];




BasicGame.playAdvance = function(game){};

BasicGame.playAdvance.prototype = {
     preload: function(){
          this.load.image("ball", "img/chara.png");
          this.load.image("target", "img/egg.png");
          this.load.image("arm", "arm.png");
          this.load.image('bmenu', 'img/blue_button13.png');
          this.load.image('grass', 'img/grass1.png');
          this.load.image('clouda', 'img/cloud-1.png');
          this.load.image('cloudb', 'img/cloud-2.png');
          this.load.image('cloudc', 'img/clouds-small.png');
          //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        //initApp();
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
     },
     create: function(){
          this.curscore = 0;
          this.width = 640;
          this.height = 960;
          this.grass = this.add.image(-20, 885, 'grass');
          this.clouda = this.add.image(this.rnd.between(10, 270), this.rnd.between(200, 700), 'clouda');
          this.cloudb = this.add.image(this.rnd.between(0, 170), this.rnd.between(200, 500), 'cloudb');
          this.cloudc = this.add.image(this.rnd.between(-70, 200), this.rnd.between(200, 700), 'cloudc');
          this.tintColor = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.tintColor2 = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.tintColor3 = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.savedDataadv = localStorage.getItem("circlepathadv")==null?{score:0}:JSON.parse(localStorage.getItem("circlepathadv"));
          var style = {
               font: "bold 44px Arial",
               fill: "#" + this.tintColor.toString(16)
          };
          var text = this.add.text(0, 75, "Best score: "+this.savedDataadv.score.toString(), style);
          //this.textcur = this.add.text(this.world.centerX, 100, "score: "+this.curscore.toString(), style);
          this.destroy = false;
          this.saveRotationSpeed = rotationSpeed;
          this.tintColor = bgColors[this.rnd.between(0, bgColors.length - 1)];
          do{
               this.tintColor2 = bgColors[this.rnd.between(0, bgColors.length - 1)];     
          } while(this.tintColor == this.tintColor2)
          this.stage.backgroundColor = this.tintColor;
          this.targetArray = [];
          this.steps = 0;
          this.rotatingDirection = this.rnd.between(0, 1);
          this.gameGroup = this.add.group();
          this.targetGroup = this.add.group();
          this.ballGroup = this.add.group();
          this.gameGroup.add(this.targetGroup);
          this.gameGroup.add(this.ballGroup);
          this.arm = this.add.sprite(this.width / 2, this.height / 4 * 2.7, "arm");
          this.arm.anchor.set(0, 0.5);
          this.arm.alpha = 0;
          this.arm.tint = this.tintColor2;
          this.ballGroup.add(this.arm);
          this.balls = [
               this.add.sprite(this.width / 2, this.height / 4 * 2.7, "ball"),
               this.add.sprite(this.width / 2, this.height / 2, "ball")                   
          ]
          this.balls[0].anchor.set(0.5);
          //this.balls[0].tint = this.tintColor2;
          this.balls[1].anchor.set(0.5);
          //this.balls[1].tint = this.tintColor2;
          this.ballGroup.add(this.balls[0]);
          this.ballGroup.add(this.balls[1]);
          this.rotationAngle = 0;
          this.rotatingBall = 1;
          var target = this.add.sprite(0, 0, "target");
          target.tint = tgColors[this.rnd.between(0, tgColors.length - 1)];
          target.anchor.set(0.5);
          target.x = this.balls[0].x;
          target.y = this.balls[0].y;
          this.targetGroup.add(target);   
          this.targetArray.push(target);      
          this.input.onDown.add(this.changeBall, this);
          for(var i = 0; i < visibleTargets; i++){
               this.addTarget(); 
          }

          var stylecur = {
               font: "bold 32px Arial",
               fill: "#d21034",
               align: "center"
               };
          this.menu = this.add.button(80, 950, 'bmenu', this.backBtn, this,'', '', '');
        this.menu.anchor.setTo(0.5);
        var text = this.add.text(0, 0, "Menu", stylecur);
        text.anchor.set(0.5);
        this.menu.addChild(text);
          
     },
     update: function(){
          var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
          if(distanceFromTarget > 90 && this.destroy && this.steps > visibleTargets){
               this.gameOver();
          }
          if(distanceFromTarget < 40 && !this.destroy){
               this.destroy = true;
          }
          this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
          this.arm.angle = this.rotationAngle + 90;
          this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
          this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));
          var distanceX = this.balls[1 - this.rotatingBall].worldPosition.x - this.width / 2;
          var distanceY = this.balls[1 - this.rotatingBall].worldPosition.y - this.height / 4 * 2.7;
          this.gameGroup.x = Phaser.Math.linearInterpolation([this.gameGroup.x, this.gameGroup.x - distanceX], 0.05);
          this.gameGroup.y = Phaser.Math.linearInterpolation([this.gameGroup.y, this.gameGroup.y - distanceY], 0.05);                   
     },
     changeBall:function(){
          this.destroy = false;
          var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
          if(distanceFromTarget < 30){
               this.rotatingDirection = this.rnd.between(0, 1);
               var detroyTween = this.add.tween(this.targetArray[0]).to({
                    alpha: 0
               }, 500, Phaser.Easing.Cubic.In, true);
               detroyTween.onComplete.add(function(e){
                    e.destroy();
               })
               this.targetArray.shift();
               this.arm.position = this.balls[this.rotatingBall].position;
               this.rotatingBall = 1 - this.rotatingBall;
               this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;
               this.arm.angle = this.rotationAngle + 90; 
               for(var i = 0; i < this.targetArray.length; i++){
                    this.targetArray[i].alpha += 1 / 7;  
               } 
               //this.curscore += 1;
               //this.textcur.text = "Score: "+this.curscore.toString();       
               this.addTarget();
          }
          else{
               this.gameOver();
          }   
     },
     addTarget: function(){
          this.steps++;
          startX = this.targetArray[this.targetArray.length - 1].x;
          startY = this.targetArray[this.targetArray.length - 1].y;          
          var target = this.add.sprite(0, 0, "target");
          target.tint = tgColors[this.rnd.between(0, tgColors.length - 1)];
          var randomAngle = this.rnd.between(angleRange[0] + 90, angleRange[1] + 90);
          target.anchor.set(0.5);
          target.x = startX + ballDistance * Math.sin(Phaser.Math.degToRad(randomAngle));
          target.y = startY + ballDistance * Math.cos(Phaser.Math.degToRad(randomAngle));
          target.alpha = 1 - this.targetArray.length * (1 / 7);
          var style = {
               font: "bold 32px Arial",
               fill: "#ffffff",
               align: "center"
          };
          var text = this.add.text(0, 0, this.steps.toString(), style);
          text.anchor.set(0.5);
          target.addChild(text);
          this.targetGroup.add(target);   
          this.targetArray.push(target);      
     },
     gameOver: function(){
          localStorage.setItem("circlepathadv",JSON.stringify({
               score: Math.max(this.savedDataadv.score, this.steps - visibleTargets)
	     }));
          this.input.onDown.remove(this.changeBall, this);
          this.saveRotationSpeed = 0;
          this.arm.destroy();
          var gameOverTween = this.add.tween(this.balls[1 - this.rotatingBall]).to({
               alpha: 0
          }, 1000, Phaser.Easing.Cubic.Out, true);
          gameOverTween.onComplete.add(function(){
               this.state.start("playAdvance");
          },this)
     },
     backBtn: function(){
          showInters();
          this.state.start('menu') ;
     }
}