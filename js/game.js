//Initialises a new game which can work with both webgl and canvas
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'spaceInvaders');

//Adds the states of the game
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('variables', variableState);
game.state.add('instructions', instructionState);

//Finds a location to store the players highscore
highScore = localStorage.getItem(localStorageName) == null ? 0 :
            localStorage.getItem(localStorageName);

game.state.start('variables');
