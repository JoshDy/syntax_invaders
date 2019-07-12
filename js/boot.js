var bootState = { //Sets up the physics system for the player and the scaling system for the game
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
    game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.setShowAll();
    game.scale.refresh();
  }
};
