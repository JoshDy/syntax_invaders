var menuState = { //Creates the main menu
  create: function() {
    //Creates a moving background
    spacefield = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');
    backgroundv = 1;
    
    //Sets up the content of the menu
    var menuGo = game.add.text(game.world.centerX, game.world.centerY, 'Press Space or Tap The Screen to Start', textStyle2);

    menuGo.anchor.setTo(0.5, 0);
    
    //Adds player control so they can interact with the menu
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.addOnce(this.start, this);

    game.input.onTap.add(function() {
      game.state.start('instructions');
    });
  },

  start: function() {
    game.state.start('instructions');
  },

  update: function() {
    spacefield.tilePosition.y += backgroundv;
    game.scale.setShowAll();
    game.scale.refresh();
  }
};
