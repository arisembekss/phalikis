(function () {
    /* globals Phaser:false, BasicGame: false */
    //  Create your Phaser game and inject it into the game div.
    
        //var screenDims = Utils.ScreenUtils.calculateScreenMetrics(500, 800,Utils.Orientation.PORTRAIT);
    //var game = new Phaser.Game(window.screen.availWidth * window.devicePixelRatio, window.screen.availHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
    //var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO, 'game');
    //var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');
    var game = new Phaser.Game(640, 980, Phaser.AUTO, "");
    //document.addEventListener("backbutton", onBackDown, false);
    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
    //game.state.add('Game', BasicGame.Game);
    game.state.add("menu", BasicGame.menuGame);
    game.state.add("playGame", BasicGame.playGame);
    game.state.add("playAdvance", BasicGame.playAdvance);
    //game.state.add('over', BasicGame.Over);
    document.addEventListener("backbutton", bacBtn, false);
    
    //  Now start the Game state.
    game.state.start('menu');

})();

function bacBtn(){
     //game.state.start("menu");
     BasicGame.menuGame;
}
