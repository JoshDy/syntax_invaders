var loadState = {
  preload: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    //Presents a loading screen while the assets are being preloaded before the game starts
    var loadingText = game.add.text(game.world.centerX, game.world.centerY, 'Loading...', textStyle2);

    loadingText.anchor.setTo(0.5, 0);
    
    //Preloads the assets into the game before the game starts
    game.load.image('starfield', "assets/spacefield.png");

    game.load.spritesheet('player', "playersprite.png", 159, 45);

    game.load.image('bullet', "assets/PlayerProjectileHit8.png");

		game.load.image('enemybullet', "assets/EnemyProjectileHit8.png");
    game.load.image('enemybullet2', "assets/EnemyProjectileHit82.png");
    game.load.image('enemybullet3', "assets/EnemyProjectileHit83.png");
    game.load.image('enemybullet4', "assets/EnemyProjectileHit84.png");
    game.load.image('enemybullet5', "assets/EnemyProjectileHit85.png");
    game.load.image('enemybullet6', "assets/EnemyProjectileHit86.png");
    game.load.image('enemybullet7', "assets/EnemyProjectileHit87.png");
    game.load.image('enemybullet8', "assets/EnemyProjectileHit88.png");
    game.load.image('enemybullet9', "assets/EnemyProjectileHit89.png");

		game.load.spritesheet('enemy', "enemybrackets.png", enemysize, enemysize);
    game.load.spritesheet('enemy01', "enemybrackets2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy02', "enemybrackets3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy03', "enemybrackets4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy04', "enemybrackets5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy05', "enemybrackets6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy06', "enemybrackets7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy07', "enemybrackets8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy08', "enemybrackets9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy09', "enemybrackets10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy010', "enemybrackets11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy011', "enemybrackets12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy012', "enemybrackets13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy013', "enemybrackets14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy014', "enemybrackets15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy015', "enemybrackets16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy016', "enemybrackets17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy017', "enemybrackets18.png", enemysize - 85, enemysize - 85);

		game.load.spritesheet('enemy2', "enemydash.png", enemysize, enemysize);
    game.load.spritesheet('enemy201', "enemydash2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy202', "enemydash3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy203', "enemydash4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy204', "enemydash5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy205', "enemydash6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy206', "enemydash7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy207', "enemydash8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy208', "enemydash9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy209', "enemydash10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy2010', "enemydash11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy2011', "enemydash12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy2012', "enemydash13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy2013', "enemydash14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy2014', "enemydash15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy2015', "enemydash16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy2016', "enemydash17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy2017', "enemydash18.png", enemysize - 85, enemysize - 85);

		game.load.spritesheet('enemy3', "enemyexlamation.png", enemysize, enemysize);
    game.load.spritesheet('enemy301', "enemyexlamation2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy302', "enemyexlamation3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy303', "enemyexlamation4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy304', "enemyexlamation5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy305', "enemyexlamation6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy306', "enemyexlamation7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy307', "enemyexlamation8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy308', "enemyexlamation9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy309', "enemyexlamation10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy3010', "enemyexlamation11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy3011', "enemyexlamation12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy3012', "enemyexlamation13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy3013', "enemyexlamation14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy3014', "enemyexlamation15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy3015', "enemyexlamation16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy3016', "enemyexlamation17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy3017', "enemyexlamation18.png", enemysize - 85, enemysize - 85);

		game.load.spritesheet('enemy4', "enemyhash.png", enemysize, enemysize);
    game.load.spritesheet('enemy401', "enemyhash2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy402', "enemyhash3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy403', "enemyhash4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy404', "enemyhash5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy405', "enemyhash6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy406', "enemyhash7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy407', "enemyhash8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy408', "enemyhash9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy409', "enemyhash10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy4010', "enemyhash11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy4011', "enemyhash12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy4012', "enemyhash13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy4013', "enemyhash14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy4014', "enemyhash15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy4015', "enemyhash16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy4016', "enemyhash17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy4017', "enemyhash18.png", enemysize - 85, enemysize - 85);

		game.load.spritesheet('enemy5', "enemysemicolon.png", enemysize, enemysize);
    game.load.spritesheet('enemy501', "enemysemicolon2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy502', "enemysemicolon3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy503', "enemysemicolon4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy504', "enemysemicolon5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy505', "enemysemicolon6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy506', "enemysemicolon7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy507', "enemysemicolon8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy508', "enemysemicolon9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy509', "enemysemicolon10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy5010', "enemysemicolon11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy5011', "enemysemicolon12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy5012', "enemysemicolon13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy5013', "enemysemicolon14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy5014', "enemysemicolon15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy5015', "enemysemicolon16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy5016', "enemysemicolon17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy5017', "enemysemicolon18.png", enemysize - 85, enemysize - 85);

		game.load.spritesheet('enemy6', "enemyslash.png", enemysize, enemysize);
    game.load.spritesheet('enemy601', "enemyslash2.png", enemysize - 5, enemysize - 5);
    game.load.spritesheet('enemy602', "enemyslash3.png", enemysize - 10, enemysize - 10);
    game.load.spritesheet('enemy603', "enemyslash4.png", enemysize - 15, enemysize - 15);
    game.load.spritesheet('enemy604', "enemyslash5.png", enemysize - 20, enemysize - 20);
    game.load.spritesheet('enemy605', "enemyslash6.png", enemysize - 25, enemysize - 25);
    game.load.spritesheet('enemy606', "enemyslash7.png", enemysize - 30, enemysize - 30);
    game.load.spritesheet('enemy607', "enemyslash8.png", enemysize - 35, enemysize - 35);
    game.load.spritesheet('enemy608', "enemyslash9.png", enemysize - 40, enemysize - 40);
    game.load.spritesheet('enemy609', "enemyslash10.png", enemysize - 45, enemysize - 45);
    game.load.spritesheet('enemy6010', "enemyslash11.png", enemysize - 50, enemysize - 50);
    game.load.spritesheet('enemy6011', "enemyslash12.png", enemysize - 55, enemysize - 55);
    game.load.spritesheet('enemy6012', "enemyslash13.png", enemysize - 60, enemysize - 60);
    game.load.spritesheet('enemy6013', "enemyslash14.png", enemysize - 65, enemysize - 65);
    game.load.spritesheet('enemy6014', "enemyslash15.png", enemysize - 70, enemysize - 70);
    game.load.spritesheet('enemy6015', "enemyslash16.png", enemysize - 75, enemysize - 75);
    game.load.spritesheet('enemy6016', "enemyslash17.png", enemysize - 80, enemysize - 80);
    game.load.spritesheet('enemy6017', "enemyslash18.png", enemysize - 85, enemysize - 85);

		game.load.image('health', "assets/Health8.png");

		game.load.image('healthgone', "assets/HealthGone8.png");

		game.load.spritesheet('barricade', "barricade.png", 300, 45);
    game.load.spritesheet('barricade1', "barricade2.png", 266.5, 40);
    game.load.spritesheet('barricade2', "barricade3.png", 233, 35);
    game.load.spritesheet('barricade3', "barricade4.png", 199.5, 30);
    game.load.spritesheet('barricade4', "barricade5.png", 166, 25);
    game.load.spritesheet('barricade5', "barricade6.png", 132.5, 20);
    game.load.spritesheet('barricade6', "barricade7.png", 99, 15);
    game.load.spritesheet('barricade7', "barricade8.png", 66, 10);
    game.load.spritesheet('barricade8', "barricade9.png", 33, 5);

    game.load.image('firebutton', "assets/FireButton8.png");
    game.load.image('leftbutton', "assets/LeftButton8.png");
    game.load.image('rightbutton', "assets/RightButton8.png");

    game.load.audio('blaster', ["assets/blaster.ogg", "assets/blaster.mp3", "assets/blaster.wav"]);
    game.load.audio('explosion', ["assets/explosion.ogg", "assets/explosion.mp3", "assets/explosion.wav"]);
    game.load.audio('movement', ["assets/movement.ogg", "assets/movement.mp3", "assets/movement.wav"]);
    game.load.audio('music', ["assets/music.ogg", "assets/music.mp3", "assets/music.wav"]);
    game.load.audio('damage', ["assets/playerhit.ogg", "assets/playerhit.mp3", "assets/playerhit.wav"]);
    game.load.audio('death', ["assets/death.ogg", "assets/death.mp3", "assets/death.wav"]);
  },

  create: function() {
    game.state.start('menu');
  },

  update: function() {
    game.scale.setShowAll();
    game.scale.refresh();
  }
};
