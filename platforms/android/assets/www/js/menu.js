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
BasicGame.menuGame.prototype = {

	preload: function(){
		this.load.image('bg', 'img/btnmenu.png');
        this.load.image('buttonOver', 'img/blue_button13.png');
        this.load.image('buttonOut', 'img/blue_button01.png');
		this.load.image('logo', 'img/logo3.png');
        this.load.image('bg2', 'img/secondball.png');
        this.load.image('raster', 'img/chara.png');
        this.load.image('clouda', 'img/cloud-1.png');
        this.load.image('cloudb', 'img/cloud-2.png');
        this.load.image('cloudc', 'img/clouds-small.png');
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
        this.char = this.add.sprite(20, 120, 'raster');
        this.physics.enable(this.char, Phaser.Physics.ARCADE);
        this.char.body.velocity.setTo(200, 200);
        this.char.body.collideWorldBounds = true;
        this.char.body.bounce.set(1);
        /*this.char.animations.add('toeng');
        this.char.animations.play('toeng', 15, true);*/
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
		this.logo = this.add.button(this.world.centerX, this.world.centerY - 50, 'bg', this.startGame, this,'buttonOut', 'buttonOut', 'buttonOut');
        this.logo.addChild(text);
		this.logo.anchor.setTo(0.5, 0.5);
		this.logo2 = this.add.button(this.world.centerX, this.world.centerY + 50, 'bg', this.startAdvance, this,'buttonOver', 'buttonOut', 'buttonOver');
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
	},
	update: function(){


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

	},
	startGame: function(){
		this.state.start("playGame");
	},
	startAdvance: function(){
		this.state.start("playAdvance");
	}

}

