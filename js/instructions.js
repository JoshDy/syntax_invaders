var instructionState = { //Sets up the instructions screen for the game
  create: function() {
    //Creates a moving background
    spacefield = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');
    backgroundv = 3;
    
    //Sets up the content of the instructions screen
    howTo = game.add.text(game.world.centerX, 30, 'How To Play', textStyle2);
    playerMovement = game.add.text(game.world.centerX, 155, 'Player Movement', textStyle3);
    playerLeftRight = game.add.text(game.world.centerX, 235, 'Press the left arrow key to move left and the right arrow key \nto move right...', textStyle4);
    playerShoot = game.add.text(game.world.centerX, game.world.height - 450, 'Player Attack', textStyle3);
    playerAttack = game.add.text(game.world.centerX, game.world.height - 370, 'Press the spacebar or tap the screen to shoot at enemies...', textStyle4);
    howToGo = game.add.text(game.world.centerX, game.world.height - 120, 'Press Space or Tap The Screen to Continue', { font: '2.8vw "VT323", monospace', fill: '#fff'});

    howTo.anchor.setTo(0.5, 0);
    playerMovement.anchor.setTo(0.5, 0);
    playerLeftRight.anchor.setTo(0.5, 0);

    playerShoot.anchor.setTo(0.5, 0);
    playerAttack.anchor.setTo(0.5, 0);

    howToGo.anchor.setTo(0.5, 0);
    
    //Adds player control so that they can interact with the instructions screen
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.addOnce(this.start, this);

    game.input.onTap.add(function() {
      game.state.start('main');
    });
  },

  start: function() {
    game.state.start('main');
  },

  update: function() {
    spacefield.tilePosition.y += backgroundv;
    
    //Checks what the resolution of the browser is to see if a media query needs to be run
    instructsize2560(width2560);
    width2560.addListener(instructsize2560);

    instructsize1920(width1920);
    width1920.addListener(instructsize1920);

    instructsize19202(width1920);
    width1920.addListener(instructsize19202);

    instructsize1600(width1600);
    width1600.addListener(instructsize1600);

    instructsize1440(width1440);
    width1440.addListener(instructsize1440);

    instructsize14402(width1440);
    width1440.addListener(instructsize14402);

    instructsize1366(width1366);
    width1366.addListener(instructsize1366);

    instructsize13662(width1366);
    width1366.addListener(instructsize13662);

    instructsize1280(width1280);
    width1280.addListener(instructsize1280);

    instructsize1024(width1024);
    width1024.addListener(instructsize1024);

    instructsize10242(width1024);
    width1024.addListener(instructsize10242);

    instructsize960(width960);
    width960.addListener(instructsize960);

    instructsize800(width800);
    width800.addListener(instructsize800);

    instructsize768(width768);
    width768.addListener(instructsize768);

    instructsize640(width640);
    width640.addListener(instructsize640);

    instructsize568(width568);
    width568.addListener(instructsize568);

    instructsize480(width480);
    width480.addListener(instructsize480);

    instructsize414(width414);
    width414.addListener(instructsize414);

    instructsize375(width375);
    width375.addListener(instructsize375);

    instructsize360(width360);
    width360.addListener(instructsize360);

    instructsize320(width320);
    width320.addListener(instructsize320);
  }
};

//If a certain screen size is detected these media queries are run
function instructsize2560(width2560)
{
  if (width2560.matches) {
    howTo.y = 20;
    playerMovement.y = 155;
    playerLeftRight.y = 235;
    playerShoot.y =  game.world.height - 690;
    playerAttack.y = game.world.height - 610;
    howToGo.y = game.world.height - 160;
  }
}

function instructsize1920(width1920)
{
  if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
    howTo.y = 20;
    playerMovement.y = 155;
    playerLeftRight.y = 235;
    playerShoot.y =  game.world.height - 580;
    playerAttack.y = game.world.height - 500;
    howToGo.y = game.world.height - 140;
  }
}

function instructsize19202(width1920)
{
  if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
    howTo.y = 20;
    playerMovement.y = 155;
    playerLeftRight.y = 235;
    playerShoot.y =  game.world.height - 530;
    playerAttack.y = game.world.height - 450;
    howToGo.y = game.world.height - 140;
  }
}

function instructsize1600(width1600)
{
  if (width1600.matches) {
    howTo.y = 20;
    playerMovement.y = 140;
    playerLeftRight.y = 210;
    playerShoot.y =  game.world.height - 450;
    playerAttack.y = game.world.height - 380;
    howToGo.y = game.world.height - 130;
  }
}

function instructsize1440(width1440)
{
  if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
    howTo.y = 20;
    playerMovement.y = 130;
    playerLeftRight.y = 190;
    playerShoot.y =  game.world.height - 490;
    playerAttack.y = game.world.height - 430;
    howToGo.y = game.world.height - 120;
  }
}

function instructsize14402(width1440)
{
  if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
    howTo.y = 20;
    playerMovement.y = 120;
    playerLeftRight.y = 180;
    playerShoot.y =  game.world.height - 460;
    playerAttack.y = game.world.height - 400;
    howToGo.y = game.world.height - 120;
  }
}

function instructsize1366(width1366)
{
  if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
    howTo.y = 20;
    playerMovement.y = 110;
    playerLeftRight.y = 170;
    playerShoot.y =  game.world.height - 480;
    playerAttack.y = game.world.height - 420;
    howToGo.y = game.world.height - 120;
  }
}

function instructsize13662(width1366)
{
  if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
    howTo.y = 20;
    playerMovement.y = 110;
    playerLeftRight.y = 170;
    playerShoot.y =  game.world.height - 400;
    playerAttack.y = game.world.height - 340;
    howToGo.y = game.world.height - 120;
  }
}

function instructsize1280(width1280)
{
  if (width1280.matches) {
    howTo.y = 20;
    playerMovement.y = 110;
    playerLeftRight.y = 165;
    playerShoot.y =  game.world.height - 395;
    playerAttack.y = game.world.height - 340;
    howToGo.y = game.world.height - 120;
  }
}

function instructsize1024(width1024)
{
  if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
    howTo.y = 20;
    playerMovement.y = 100;
    playerLeftRight.y = 140;
    playerShoot.y =  game.world.height - 370;
    playerAttack.y = game.world.height - 330;
    howToGo.y = game.world.height - 110;
  }
}

function instructsize10242(width1024)
{
  if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
    howTo.y = 20;
    playerMovement.y = 80;
    playerLeftRight.y = 120;
    playerShoot.y =  game.world.height - 310;
    playerAttack.y = game.world.height - 270;
    howToGo.y = game.world.height - 100;
  }
}

function instructsize960(width960)
{
  if (width960.matches) {
    howTo.y = 20;
    playerMovement.y = 85;
    playerLeftRight.y = 120;
    playerShoot.y =  game.world.height - 305;
    playerAttack.y = game.world.height - 270;
    howToGo.y = game.world.height - 80;
  }
}

function instructsize800(width800)
{
  if (width800.matches) {
    howTo.y = 20;
    playerMovement.y = 70;
    playerLeftRight.y = 100;
    playerShoot.y =  game.world.height - 230;
    playerAttack.y = game.world.height - 200;
    howToGo.y = game.world.height - 60;
  }
}

function instructsize768(width768)
{
  if (width768.matches) {
    howTo.y = 20;
    playerMovement.y = 80;
    playerLeftRight.y = 110;
    playerShoot.y =  game.world.height - 195;
    playerAttack.y = game.world.height - 165;
    howToGo.y = game.world.height - 80;
  }
}

function instructsize640(width640)
{
  if (width640.matches) {
    howTo.y = 20;
    playerMovement.y = 65;
    playerLeftRight.y = 90;
    playerShoot.y =  game.world.height - 175;
    playerAttack.y = game.world.height - 150;
    howToGo.y = game.world.height - 50;
  }
}

function instructsize568(width568)
{
  if (width568.matches) {
    howTo.y = 20;
    playerMovement.y = 60;
    playerLeftRight.y = 80;
    playerShoot.y =  game.world.height - 155;
    playerAttack.y = game.world.height - 135;
    howToGo.y = game.world.height - 50;
  }
}

function instructsize480(width480)
{
  if (width480.matches) {
    howTo.y = 20;
    playerMovement.y = 50;
    playerLeftRight.y = 70;
    playerShoot.y =  game.world.height - 160;
    playerAttack.y = game.world.height - 140;
    howToGo.y = game.world.height - 40;
  }
}

function instructsize414(width414)
{
  if (width414.matches) {
    howTo.y = 20;
    playerMovement.y = 70;
    playerLeftRight.y = 90;
    playerShoot.y =  game.world.height - 340;
    playerAttack.y = game.world.height - 320;
    howToGo.y = game.world.height - 40;
  }
}

function instructsize375(width375)
{
  if (width375.matches) {
    howTo.y = 20;
    playerMovement.y = 70;
    playerLeftRight.y = 90;
    playerShoot.y =  game.world.height - 340;
    playerAttack.y = game.world.height - 320;
    howToGo.y = game.world.height - 40;
  }
}

function instructsize360(width360)
{
  if (width360.matches) {
    howTo.y = 20;
    playerMovement.y = 70;
    playerLeftRight.y = 90;
    playerShoot.y =  game.world.height - 310;
    playerAttack.y = game.world.height - 290;
    howToGo.y = game.world.height - 40;
  }
}

function instructsize320(width320)
{
  if (width320.matches) {
    howTo.y = 20;
    playerMovement.y = 70;
    playerLeftRight.y = 90;
    playerShoot.y =  game.world.height - 270;
    playerAttack.y = game.world.height - 250;
    howToGo.y = game.world.height - 40;
  }
}
