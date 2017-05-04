

var ballDistance = 160;
var rotationSpeed = 4;
var angleRange = [25, 155];
var visibleTargets = 7;
var tgColors = [0x62bd18, 0xffbb00, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2];
var bgColors = [0xc1d7e2, 0xdcfbcc, 0xf9cbcd, 0xdadaee, 0x9ed1c7, 0xedeef9];
var platforms;
var emitter;
var timer, timerEvent, text, bgg;

/*window.onload = function() {  
  game = new Phaser.Game(640, 960, Phaser.AUTO, "");
     game.state.add("PlayGame", playGame);
     game.state.add("MenuGame", menuGame);
     game.state.start("MenuGame");
}*/


BasicGame.playGame = function(game){
     
};

BasicGame.playGame.prototype = {
     preload: function(){
          this.load.image("firstball", "img/chara.png");
          this.load.image("secondball", "img/charb.png");
          this.load.image("target", "img/egg.png");
          this.load.image("arm", "arm.png");
          this.load.image("add", "img/timeradd.png");
          this.load.image('bmenu', 'img/blue_button13.png');
          this.load.image('grass', 'img/grass1.png');
          this.load.image('clouda', 'img/cloud-1.png');
          this.load.image('cloudb', 'img/cloud-2.png');
          this.load.image('cloudc', 'img/clouds-small.png');
          //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
     },
     create: function(){
          this.physics.startSystem(Phaser.Physics.ARCADE);
          initApp();
          //bgg=this.add.image(0, 0, 'bgg');
          /*bgg.scale.x = 600;
          bgg.scale.y = 800;*/
          /*platforms = this.add.group();
          var ledge = platforms.create(this.rnd.between(100, 500), this.rnd.between(400, 900), 'bg');
         ledge = platforms.create(this.rnd.between(100, 500), this.rnd.between(100, 900), 'bg');
         ledge = platforms.create(this.rnd.between(100, 500), this.rnd.between(100, 900), 'bg');
         ledge = platforms.create(this.rnd.between(100, 500), this.rnd.between(100, 900), 'bg');
         ledge.scale.setTo(2, 2);
*/
          this.detik = 120;
          this.menit = 1;
          this.curscore = 0;
          this.tintColor = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.tintColor2 = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.tintColor3 = tgColors[this.rnd.between(0, bgColors.length - 1)];
          this.stage.backgroundColor = 0xdadaee;
          this.grass = this.add.image(-20, 885, 'grass');
          this.clouda = this.add.image(this.rnd.between(10, 270), this.rnd.between(200, 700), 'clouda');
          this.cloudb = this.add.image(this.rnd.between(0, 170), this.rnd.between(200, 500), 'cloudb');
          this.cloudc = this.add.image(this.rnd.between(-70, 200), this.rnd.between(200, 700), 'cloudc');
          var randx = this.rnd.between(70, 570);
          var randy = this.rnd.between(200, 900);
          this.savedData = localStorage.getItem("circlepath")==null?{score:0}:JSON.parse(localStorage.getItem("circlepath"));
          var style = {
               font: "bold 40px Arial",
               fill: "#" + this.tintColor.toString(16)
          };
          var textscore = this.add.text(90, 100, "Best: "+this.savedData.score.toString(), style);
          textscore.anchor.set(0.5);
          
          this.txttimer=this.add.text(575, 100, 'timer', { font: "40px Arial", fill: "#" + this.tintColor2.toString(16)});
          this.txttimer.anchor.set(0.5);
          var stylecur = {
               font: "bold 40px Arial",
               fill: "#"  + this.tintColor3.toString(16),
               align: "center"
               };
          this.textcur = this.add.text(this.world.centerX, 100, "score: "+this.curscore.toString(), stylecur);
          this.textcur.anchor.set(0.5);
          //this.textcur.alpha = 0;
          this.arm = this.add.sprite(randx, randy, "arm");
          this.arm.anchor.set(0, 0.5);
          this.arm.alpha = 0;
          var target = this.add.sprite(0, 0, "target");
          this.balls = [
               this.add.sprite(randx, randy, "firstball"),
               this.add.sprite(randx, randy, "secondball")                   
          ]
          this.targetArray = [];
          this.steps = 0;
          this.rotatingDirection = this.rnd.between(0, 1);
          this.destroy = false;
          /*this.tintColor = bgColors[this.rnd.between(0, bgColors.length - 1)];
          do{
               this.tintColor2 = bgColors[this.rnd.between(0, bgColors.length - 1)];     
          } while(this.tintColor == this.tintColor2)*/
          //this.stage.backgroundColor = bgColors[this.rnd.between(0, bgColors.length - 1)];
          this.targetGroup = this.add.group();
          //this.balls.bringToTop;
          this.balls[0].anchor.set(0.5);
          //this.balls[0].tint = this.tintColor2;
          this.balls[1].anchor.set(0.5);
          //this.balls[1].tint = this.tintColor2;
          this.rotationAngle = 0;
          this.rotatingBall = 1;
          
          target.tint = tgColors[this.rnd.between(0, tgColors.length - 1)];
          target.anchor.set(0.5);
          target.x = this.balls[0].x;
          target.y = this.balls[0].y;
          var texta = this.add.text(0, 0, "0", style);
          texta.anchor.set(0.5);
          target.addChild(texta);
          /*target.x = this.rnd.between(100, 900);
          target.y = this.rnd.between(100, 900);*/
          this.targetGroup.add(target);   
          this.targetArray.push(target);
          this.input.onDown.add(this.changeBall, this);
          for(var i = 0; i < visibleTargets; i++){
               this.addTarget(); 
          }
          //this.timerku=this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter(), this);
          this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
          timer = this.time.create();
        
        // Create a delayed event 1m and 30s from now
        //timerEvent = timer.add(Phaser.Timer.MINUTE * this.menit + Phaser.Timer.SECOND * this.detik, this.endTimer, this);
        
        // Start the timer
        timer.start();
        var stylemenu = {
               font: "bold 32px Arial",
               fill: "#d21034",
               align: "center"
               };
        this.menu = this.add.button(80, 950, 'bmenu', this.backBtn, this,'', '', '');
        this.menu.anchor.setTo(0.5);
        var text = this.add.text(0, 0, "Menu", stylemenu);
        text.anchor.set(0.5);
        this.menu.addChild(text);
        this.menu2 = this.add.button(550, 950, 'bmenu', this.howTo, this,'', '', '');
        this.menu2.anchor.setTo(0.5);
        var text2 = this.add.text(0, 0, "How To", stylemenu);
        text2.anchor.set(0.5);
        this.menu2.addChild(text2);
        emitter = this.add.emitter(this.world.centerX, this.world.centerY, 10);

        emitter.makeParticles('add');
        emitter.gravity = -200;
          //document.addEventListener("backbutton", this.backBtn, false);
        //this.updateCounter();

     },
     update: function(){

          this.rotationAngle = (this.rotationAngle + rotationSpeed * (this.rotatingBall * 2 - 1)) % 360;
          this.arm.angle = this.rotationAngle + 90;
          this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
          this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));                    
     },
     
     changeBall:function(){
          
          this.arm.position = this.balls[this.rotatingBall].position
          this.rotatingBall = 1 - this.rotatingBall;
          this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;

          this.destroy = false;
          var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
          if(distanceFromTarget < 20){
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
               //this.stage.backgroundColor = bgColors[this.rnd.between(0, bgColors.length - 1)];
               for(var i = 0; i < this.targetArray.length; i++){
                    this.targetArray[i].alpha += 1 / 7;  
               }
               this.curscore += 1;
               this.textcur.text = "Score: "+this.curscore.toString();  
               this.detik+=5;
               
               emitter.start(true, 2000, null, 1);
               this.addTarget();
               
          }
            
     },
     addTarget: function(){
          this.steps++;
          startX = this.targetArray[this.targetArray.length - 1].x;
          startY = this.targetArray[this.targetArray.length - 1].y;          
          var target = this.add.sprite(0, 0, "target");
          //var randomAngle = game.rnd.between(angleRange[0] + 90, angleRange[1] + 90);
          target.anchor.set(0.5);
          target.tint = tgColors[this.rnd.between(0, tgColors.length - 1)];
          /*target.x = startX + ballDistance * Math.sin(Phaser.Math.degToRad(randomAngle));
          target.y = startY + ballDistance * Math.cos(Phaser.Math.degToRad(randomAngle));*/
          target.x = this.rnd.between(100, 500);
          target.y = this.rnd.between(200, 800);
          target.alpha = 1 - this.targetArray.length * (1 / 7);
          var style = {
               font: "bold 32px Arial",
               //fill: "#" + this.tintColor.toString(16),
               fill: "#ffffff",
               align: "center"
          };
          var text = this.add.text(0, 0, this.steps.toString(), style);
          text.anchor.set(0.5);
          target.addChild(text);
          this.targetGroup.add(target);   
          this.targetArray.push(target);
          var stylecur = {
               font: "bold 32px Arial",
               fill: "#ffffff",
               align: "center"
          }; 
          //var textcur = this.add.text(100, 900, "current score: "+this.steps.toString(), stylecur);     
     },
     updateCounter: function(){
          this.detik--;
          this.txttimer.text = /*this.menit+' : '+*/this.detik;
          if(this.detik==0){   
               //this.detik=60;
               this.endTimer();
               this.txttimer.text = '0';
          }
          /*else if(this.menit<0 ){
               this.txttimer.text = '0 : 0'; 
               this.endTimer();  
          } */
         /* var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        
        return minutes.substr(-2) + ":" + seconds.substr(-2); */
     },
     endTimer: function(){
          timer.stop();
          this.txttimer.alpha = 0;
          localStorage.setItem("circlepath",JSON.stringify({
               score: Math.max(this.savedData.score, this.steps - visibleTargets)
          }));
          
          this.input.onDown.remove(this.changeBall, this);
          this.saveRotationSpeed = 0;
          this.arm.destroy();
          //target.alpha = 0;
          this.targetGroup.removeChildren(0, 7);
          var gameOverTween = this.add.tween(this.balls[1 - this.rotatingBall]).to({
               alpha: 0
          }, 1000, Phaser.Easing.Cubic.Out, true);
          //textscore.text = "Best Score: "+score;
          var styleover = {
               font: "bold 64px Arial",
               fill: "#ffffff"
          };
          var textover = this.add.text(this.world.centerX, this.world.centerY - 64, "Game Over", styleover);
          textover.anchor.setTo(0.5, 0.5);
          textover.alpha = 0;
          this.btnAgain = this.add.button(this.world.centerX, this.world.centerY + 64, 'firstball', this.starGameAgain, this,'', '', '');
          this.btnAgain.anchor.setTo(0.5, 0.5);
          this.btnAgain.alpha = 0;
          var txtOverTween = this.add.tween(textover).to({
               alpha: 1
          }, 400, Phaser.Easing.Cubic.In, true);
          var btnOverTween = this.add.tween(this.btnAgain).to({
               alpha: 1
          }, 400, Phaser.Easing.Cubic.In, true);
     },
     starGameAgain: function(){
          this.state.start("playGame");
          this.detik = 30;
          this.menit = 2;
          timer.start();
     },
     backBtn: function(){
          showInters();
          this.state.start('menu') ;
     },
     howTo: function(){

     }
}