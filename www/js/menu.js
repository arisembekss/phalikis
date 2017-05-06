BasicGame = {
    //orientated: false;
    
};



BasicGame.menuGame = function(game){
	this.logo;
};
var admobidd = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobidd = { // for Android
        banner: 'ca-app-pub-6611308189785883/4393736851',
        interstitial: ''
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobidd = { // for iOS
        banner: '',
        interstitial: ''
    };
} else {
    admobidd = { // for Windows Phone
        banner: '',
        interstitial: ''
    };
}

var pos = [];
var text;
BasicGame.menuGame.prototype = {

	preload: function(){
		this.load.image('bg', 'img/btnmenu.png');
        this.load.image('buttonOver', 'img/blue_button13.png');
        this.load.image('buttonOut', 'img/blue_button01.png');
		this.load.image('logo', 'img/logo3.png');
        this.load.image('bg2', 'img/secondball.png');
        this.load.image('raster', 'img/chara.png');
        this.load.image('rasterb', 'img/charb.png');
        this.load.image('clouda', 'img/cloud-1.png');
        this.load.image('cloudb', 'img/cloud-2.png');
        this.load.image('cloudc', 'img/clouds-small.png');
        this.load.image("arm", "arm.png");
		//this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.startFullScreen(false);
	},
	create: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);

       //initApp();
		/*if(AdMob) AdMob.createBanner({
            adId: admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            
            autoShow: true });*/
        /*AdMob.createBanner( {
        adId: admobidd.banner, 
        isTesting: true,
        overlap: true, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.TOP_CENTER,
        bgColor: 'black'
    	} );*/
            //if (!AdMob) {alert( 'admob plugin not ready' ); return;}
        //AdMob.showBannerAtXY(0, 1000);
        // preppare and load ad resource in background, e.g. at begining of game level
        //if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
		this.stage.backgroundColor = "c1d7e2";
        
        this.clouda = this.add.image(this.rnd.between(10, 270), this.rnd.between(200, 700), 'clouda');
        this.cloudb = this.add.image(this.rnd.between(0, 170), this.rnd.between(200, 500), 'cloudb');
        this.cloudc = this.add.image(this.rnd.between(-70, 200), this.rnd.between(200, 700), 'cloudc');
        this.add.image(20, 80, 'logo');
        this.char = this.add.sprite(this.world.randomX, this.world.randomY, 'raster');
        //this.anima= this.physics.enable(this.char, Phaser.Physics.ARCADE);
        this.charb = this.add.sprite(this.world.randomX, this.world.randomY, 'rasterb');
        this.physics.enable([this.char, this.charb], Phaser.Physics.ARCADE);
        this.char.body.velocity.setTo(200, 200);
        this.char.body.collideWorldBounds = true;
        this.char.body.bounce.set(1);
        
        
        this.charb.body.velocity.setTo(200, 200);
        this.charb.body.collideWorldBounds = true;
        this.charb.body.bounce.set(1);
        
        /*this.char.animations.add('toeng');
        this.char.animations.play('toeng', 15, true);*/
        text = this.add.text(this.world.centerX, this.world.centerY, "Choose Level");
        text.anchor.setTo(0.5);

        text.font = 'Fontdiner Swanky';
        text.fontSize = 60;

        //  If we don't set the padding the font gets cut off
        //  Comment out the line below to see the effect
        text.padding.set(10, 16);

        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.fill='#c643b2';
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var style = {
               font: "bold 30px Arial",
               //fill: "#" + this.tintColor.toString(16),
               fill: "#ffffff",
               align: "center"
          };
        var text = this.add.text(0, 0, "Easy", style);
          text.anchor.set(0.5);
        var textadv = this.add.text(0, 0, "Advance", style);
          textadv.anchor.set(0.5);
		this.logo = this.add.button(this.world.centerX, this.world.centerY + 100, 'bg', this.startGame, this,'buttonOut', 'buttonOut', 'buttonOut');
        this.logo.addChild(text);
		this.logo.anchor.setTo(0.5, 0.5);
		this.logo2 = this.add.button(this.world.centerX, this.world.centerY + 200, 'bg', this.startAdvance, this,'buttonOver', 'buttonOut', 'buttonOver');
		this.logo2.addChild(textadv);
        this.logo2.anchor.setTo(0.5, 0.5);
        this.data = this.make.tween({ y: 0 }).to( { y: 70 }, 500, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);
        this.rasters = this.add.group();

        //  The total number + spacing between each one
        var total = 1;
        var offset = 4;

        for (var i = 0; i < total; i++)
        {
            this.raster = this.rasters.create(370, 0, 'raster');
            //this.raster.width = 800;
            this.raster.alpha = (i + 1) * (1 / total);
            pos.push(i * offset);
        }

        var randx = this.rnd.between(70, 570);
          var randy = this.rnd.between(200, 900);
          this.arm = this.add.sprite(randx, randy, "arm");
          this.arm.anchor.set(0, 0.5);
          this.arm.alpha = 0;
        this.balls = [
               this.add.sprite(randx, randy, "raster"),
               this.add.sprite(randx, randy, "rasterb")                   
          ]

          //this.targetArray = [];
          this.steps = 0;
          this.rotatingDirection = this.rnd.between(0, 1);
          this.destroy = false;
          //this.targetGroup = this.add.group();
          //this.balls.bringToTop;
          this.balls[0].anchor.set(0.5);
          //this.balls[0].tint = this.tintColor2;
          this.balls[1].anchor.set(0.5);
          //this.balls[1].tint = this.tintColor2;
          this.rotationAngle = 0;
          this.rotatingBall = 1;
          this.input.onDown.add(this.changeBall, this);
	},
	update: function(){

        this.rotationAngle = (this.rotationAngle + rotationSpeed * (this.rotatingBall * 2 - 1)) % 360;
          this.arm.angle = this.rotationAngle + 90;
          this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
          this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));
         //this.changeBall();
         /*this.arm.position = this.balls[this.rotatingBall].position
          this.rotatingBall = 1 - this.rotatingBall; 
         this.rotatingDirection = this.rnd.between(0, 1);*/
        this.rasters.resetCursor();

        for (var i = 0; i < this.rasters.total; i++)
        {
            pos[i]++;

            if (pos[i] === this.data.length)
            {
                pos[i] = 0;
            }

            this.rasters.cursor.y = 100 + this.data[pos[i]].y;
            this.rasters.next();
        }
        this.physics.arcade.collide(this.char, this.charb);
        
	},
    changeBall: function(){
        this.arm.position = this.balls[this.rotatingBall].position
          this.rotatingBall = 1 - this.rotatingBall;
          this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;
          this.rotatingDirection = this.rnd.between(0, 1);
          this.arm.angle = this.rotationAngle + 90; 
         
          this.destroy = false;
    },
	startGame: function(){
		this.state.start("playGame");
	},
	startAdvance: function(){
		this.state.start("playAdvance");
	}

}

