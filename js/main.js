var mainState = {
	create: function() {
		game.world.setBounds(0, 0, game.width, game.height);
        
        //Retrieves the players highscore so that it can be displayed to them
		if(localStorage.getItem(localStorageName) == null)
		{
    	highScore = 0;
		}

		else
		{
    	highScore = localStorage.getItem(localStorageName);
		}
        
		spacefield = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');
        
        //Adds the sound into the game
		blastSound = game.add.audio('blaster');
		blastSound.allowMultiple = true;
		blastSound.volume = 0.2;

		explodeSound = game.add.audio('explosion');
		explodeSound.allowMultiple = true;
		explodeSound.volume = 0.4;

		moveSound = game.add.audio('movement');
		moveSound.allowMultiple = true;
		moveSound.volume = 0.05;

		damageSound = game.add.audio('damage');
		damageSound.allowMultiple = true;
		damageSound.volume = 0.4;

		deathSound = game.add.audio('death');
		deathSound.volume = 0.5;

		musicSound = new Phaser.Sound(game, 'music', 1, true);
    musicSound.volume = 0.3;
    
    //Plays this sound
    musicSound.play();

		mainsize2560(width2560);
		width2560.addListener(mainsize2560);

		mainsize1920(width1920);
    width1920.addListener(mainsize1920);

		mainsize19202(width1920);
    width1920.addListener(mainsize19202);

		mainsize1600(width1600);
		width1600.addListener(mainsize1600);

    mainsize1440(width1440);
    width1440.addListener(mainsize1440);

		mainsize14402(width1440);
    width1440.addListener(mainsize14402);

    mainsize1366(width1366);
    width1366.addListener(mainsize1366);

		mainsize13662(width1366);
    width1366.addListener(mainsize13662);

    mainsize1280(width1280);
    width1280.addListener(mainsize1280);

    mainsize1024(width1024);
    width1024.addListener(mainsize1024);

		mainsize10242(width1024);
    width1024.addListener(mainsize10242);

    mainsize960(width960);
    width960.addListener(mainsize960);

    mainsize800(width800);
    width800.addListener(mainsize800);

    mainsize768(width768);
    width768.addListener(mainsize768);

    mainsize640(width640);
    width640.addListener(mainsize640);

    mainsize568(width568);
    width568.addListener(mainsize568);

    mainsize480(width480);
    width480.addListener(mainsize480);

		mainsize414(width414);
    width414.addListener(mainsize414);

		mainsize375(width375);
    width375.addListener(mainsize375);

		mainsize360(width360);
    width360.addListener(mainsize360);

		mainsize320(width320);
    width320.addListener(mainsize320);
        
        //Sets up the physics, world collision and animation for the player
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		player.animations.add('left', [2, 1, 0], 5, true);
		player.animations.add('right', [4, 5, 6], 5, true);
		player.scale.setTo(scaleRatio, scaleRatio);
        
        //Sets up the parameters for the players bullets
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);
        
        //Sets up the physics for the enemies and the parameters for their bullets
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;

		enemyBullets.setAll('anchor.x', 0.5);
		enemyBullets.setAll('anchor.y', 1);
		enemyBullets.setAll('outOfBoundsKill', true);
		enemyBullets.setAll('checkWorldBounds', true);
        
        //Sets up the physics for the barricades
		barricades = game.add.group();
		barricades.enableBody = true;
		barricades.physicsBodyType = Phaser.Physics.ARCADE;
        
		healthCheck();
		heartScale();
        
        //Sets up the inputs for player movement
		cursors = game.input.keyboard.createCursorKeys();
		attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
		createEnemies();
		createBarricades();

		scoreText = game.add.text(game.world.width - distancewidth1, 10, 'Score:', textStyle);
		highScoreText = game.add.text(game.world.width - distancewidth2, game.world.height - distanceheight, 'High Score: ' + highScore, textStyle);
		levelText = game.add.text(15, game.world.height - distanceheight, 'Level ' + level, textStyle);
		winText = game.add.text(game.world.centerX, game.world.centerY, 'You Win! Click to load the next level', textStyle2);
		loseText = game.add.text(game.world.centerX, game.world.centerY, 'You Lost! Click to restart', textStyle2);
		winText.visible = false;
		loseText.visible = false;
		winText.anchor.setTo(0.5, 0);
		loseText.anchor.setTo(0.5, 0);
        
        //Sets up the countdown timer
		me = this;
		me.startTime = new Date();
		me.totalTime = time;
		me.timeElapsed = 0;

		me.createTimer();

		me.gameTimer = game.time.events.loop(100, function() {
			me.updateTimer();
		});
	},

	createTimer: function() //Adds the timer into the game and sets its format up
	{
		me = this;

		me.timeLabel = me.game.add.text(game.world.centerX, 10, "00:00", textStyle);
		me.timeLabel.anchor.setTo(0.5, 0);
		me.timeLabel.align = 'center';
	},

	updateTimer: function() //Makes the timer countdown in seconds and runs the lose game screen if the time runs out
	{
		me = this;

		currentTime = new Date();
		timeDifference = me.startTime.getTime() - currentTime.getTime();

		me.timeElapsed = Math.abs(timeDifference / 1000);

		timeRemaining = me.totalTime - me.timeElapsed;

		minutes = Math.floor(timeRemaining / 60);
		seconds = Math.floor(timeRemaining) - (60 * minutes);

		result = (minutes < 10) ? "0" + minutes : minutes;

		result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

		me.timeLabel.text = result;

		if (me.timeElapsed >= me.totalTime)
		{
			loseGame();
		}
	},
	
	update: function() {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		game.scale.setShowAll();
		game.scale.refresh();
        
        //Sets up the collisions for the player, player bullets, enemies, enemy bullets and barricades
		game.physics.arcade.collide(player);
		game.physics.arcade.overlap(bullets, enemies, playerHitsEnemy, null, this);
		game.physics.arcade.overlap(bullets, barricades, playerHitsBarricade, null, this);
		game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		game.physics.arcade.overlap(enemyBullets, barricades, enemyHitsBarricade, null, this);
		game.physics.arcade.overlap(enemies, player, enemyCollidePlayer, null, this);
		game.physics.arcade.overlap(enemies, barricades, enemyCollideBarricade, null, this);

		spacefield.tilePosition.y += backgroundv;
        
        //Sets up the player movement and attack system and plays the sounds that are associated with these actions
		if (cursors.left.isDown || left)
		{
			player.body.velocity.x = -playerspeed;
			player.animations.play('left');
			moveSound.play();
		}

		else if (cursors.right.isDown || right)
		{
			player.body.velocity.x = playerspeed;
			player.animations.play('right');
			moveSound.play();
		}

		else
		{
			player.frame = 3;
			moveSound.stop();
		}

		if (attack.isDown || fire)
		{
			fireBullet();
			blastSound.play();
		}
        
        //Runs the enemy firing system
		if (game.time.now > firingTimer)
		{
			enemyFires();
		}
        
		scoreText.text = 'Score: ' + score;
	},
};

function fireBullet()
{
	if (game.time.now > bulletTime)
	{
		bullet = bullets.getFirstExists(false);

		if (bullet)
		{
			bullet2560(width2560);
			width2560.addListener(bullet2560);

			bullet1920(width1920);
	    width1920.addListener(bullet1920);

			bullet19202(width1920);
	    width1920.addListener(bullet19202);

			bullet1600(width1600);
	    width1600.addListener(bullet1600);

	    bullet1440(width1440);
	    width1440.addListener(bullet1440);

			bullet14402(width1440);
	    width1440.addListener(bullet14402);

	    bullet1366(width1366);
	    width1366.addListener(bullet1366);

	    bullet13662(width1366);
	    width1366.addListener(bullet13662);

	    bullet1280(width1280);
	    width1280.addListener(bullet1280);

	    bullet1024(width1024);
	    width1024.addListener(bullet1024);

			bullet10242(width1024);
	    width1024.addListener(bullet10242);

	    bullet960(width960);
	    width960.addListener(bullet960);

	    bullet800(width800);
	    width800.addListener(bullet800);

	    bullet768(width768);
	    width768.addListener(bullet768);

	    bullet640(width640);
	    width640.addListener(bullet640);

	    bullet568(width568);
	    width568.addListener(bullet568);

	    bullet480(width480);
	    width480.addListener(bullet480);

			bullet414(width414);
	    width414.addListener(bullet414);

			bullet375(width375);
	    width375.addListener(bullet375);

			bullet360(width360);
	    width360.addListener(bullet360);

			bullet320(width320);
	    width320.addListener(bullet320);

			bullet.scale.setTo(scaleRatio, scaleRatio);
		}
	}
}

function createEnemies()
{
	// Portrait
	if (window.matchMedia("(max-width: 414px)").matches) {
		var rows = 15;
		var cols = 5;
	}

	// Landscape
	else {
		var rows = 5;
		var cols = 15;
	}

	console.log(rows, cols);

	for (eney = 0; eney < rows; eney++)
	{
		for (enex = 0; enex < cols; enex++)
		{
			enemy2560(width2560);
			width2560.addListener(enemy2560);

			enemy1920(width1920);
	    width1920.addListener(enemy1920);

			enemy19202(width1920);
	    width1920.addListener(enemy19202);

			enemy1600(width1600);
	    width1600.addListener(enemy1600);

	    enemy1440(width1440);
	    width1440.addListener(enemy1440);

			enemy14402(width1440);
	    width1440.addListener(enemy14402);

	    enemy1366(width1366);
	    width1366.addListener(enemy1366);

	    enemy13662(width1366);
	    width1366.addListener(enemy13662);

	    enemy1280(width1280);
	    width1280.addListener(enemy1280);

	    enemy1024(width1024);
	    width1024.addListener(enemy1024);

			enemy10242(width1024);
	    width1024.addListener(enemy10242);

	    enemy960(width960);
	    width960.addListener(enemy960);

	    enemy800(width800);
	    width800.addListener(enemy800);

	    enemy768(width768);
	    width768.addListener(enemy768);

	    enemy640(width640);
	    width640.addListener(enemy640);

	    enemy568(width568);
	    width568.addListener(enemy568);

	    enemy480(width480);
	    width480.addListener(enemy480);

			enemy414(width414);
	    width414.addListener(enemy414);

			enemy375(width375);
	    width375.addListener(enemy375);

			enemy360(width360);
	    width360.addListener(enemy360);

			enemy320(width320);
	    width320.addListener(enemy320);
		}
	}

	var tween = game.add.tween(enemies).to({x : startpoint}, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	tween.onRepeat.add(descend, this);
}

function descend()
{
	enemies.y += distance;
}

function createBarricades()
{
	for (bary = 0; bary < 4; bary++)
	{
		for (barx = 0; barx < 6; barx++)
		{
			barricade2560(width2560);
			width2560.addListener(barricade2560);

			barricade1920(width1920);
	    width1920.addListener(barricade1920);

			barricade19202(width1920);
	    width1920.addListener(barricade19202);

			barricade1600(width1600);
	    width1600.addListener(barricade1600);

	    barricade1440(width1440);
	    width1440.addListener(barricade1440);

			barricade14402(width1440);
	    width1440.addListener(barricade14402);

	    barricade1366(width1366);
	    width1366.addListener(barricade1366);

	    barricade13662(width1366);
	    width1366.addListener(barricade13662);

	    barricade1280(width1280);
	    width1280.addListener(barricade1280);

	    barricade1024(width1024);
	    width1024.addListener(barricade1024);

			barricade10242(width1024);
	    width1024.addListener(barricade10242);

	    barricade960(width960);
	    width960.addListener(barricade960);

	    barricade800(width800);
	    width800.addListener(barricade800);

	    barricade768(width768);
	    width768.addListener(barricade768);

	    barricade640(width640);
	    width640.addListener(barricade640);

	    barricade568(width568);
	    width568.addListener(barricade568);

	    barricade480(width480);
	    width480.addListener(barricade480);

			barricade414(width414);
	    width414.addListener(barricade414);

			barricade375(width375);
	    width375.addListener(barricade375);

			barricade360(width360);
	    width360.addListener(barricade360);

			barricade320(width320);
	    width320.addListener(barricade320);
		}
	}
}

function playerHitsEnemy(bullet, enemy) //If a player hits an enemy they will be killed and the player will earn points
{
	bullet.kill();
	enemy.animations.stop();
	enemy.frame = 2;
	explodeSound.play();
	game.time.events.add(50, function()
	{
		enemy.kill();

		if (enemies.countLiving() == 0)
		{
			winGame();
		}
	});

	score += 100;
}

function playerHitsBarricade(bullet, barricade) //If a player hits a barricade a section of the barricade will be destroyed
{
	bullet.kill();
	barricade.animations.play('hit');
	explodeSound.play();
	game.time.events.add(200, function()
	{
		barricade.animations.stop();
		barricade.frame = 1;
		barricade.kill();
	});
}

function enemyHitsPlayer(player, enemyBullet)
{
	enemyBullet.kill();
	damageSound.play();

	health = health - damage;
	currentHealth = health;

	healthdamage2560(width2560);
	width2560.addListener(healthdamage2560);

	healthdamage1920(width1920);
	width1920.addListener(healthdamage1920);

	healthdamage19202(width1920);
	width1920.addListener(healthdamage19202);

	healthdamage1600(width1600);
	width1600.addListener(healthdamage1600);

	healthdamage1440(width1440);
	width1440.addListener(healthdamage1440);

	healthdamage14402(width1440);
	width1440.addListener(healthdamage14402);

	healthdamage1366(width1366);
	width1366.addListener(healthdamage1366);

	healthdamage13662(width1366);
	width1366.addListener(healthdamage13662);

	healthdamage1280(width1280);
	width1280.addListener(healthdamage1280);

	healthdamage1024(width1024);
	width1024.addListener(healthdamage1024);

	healthdamage10242(width1024);
	width1024.addListener(healthdamage10242);

	healthdamage960(width960);
	width960.addListener(healthdamage960);

	healthdamage800(width800);
	width800.addListener(healthdamage800);

	healthdamage768(width768);
	width768.addListener(healthdamage768);

	healthdamage640(width640);
	width640.addListener(healthdamage640);

	healthdamage568(width568);
	width568.addListener(healthdamage568);

	healthdamage480(width480);
	width480.addListener(healthdamage480);

	healthdamage414(width414);
	width414.addListener(healthdamage414);

	healthdamage375(width375);
	width375.addListener(healthdamage375);

	healthdamage360(width360);
	width360.addListener(healthdamage360);

	healthdamage320(width320);
	width320.addListener(healthdamage320);
}

function loseGame() //If a player loses on a level everything will be reset and if their highscore is higher than the previous one it will update
{
	currentScore = score;

	if (currentScore > highScore)
	{
		highScore = currentScore;
		score = 0;
	}

	else
	{
		highScore = highScore;
		score = 0;
	}

	player.kill();
	bullets.kill();
	enemies.kill();
	enemyBullets.kill();
	barricades.kill();
	loseText.visible = true;
	game.paused = true;
	distance = 5;
	speed = 250;
	health = 3;
	currentLevel = 1;
	level = currentLevel;
	backgroundv = 5;
	spacefield.inputEnabled = true;
	spacefield.events.onInputDown.add(listener, this);
	time = 90;
	me.totalTime = time;
	if (game.input.activePointer.isDown)
	{
		listener();
	}
	localStorage.setItem(localStorageName, highScore);
}

function winGame() //If a player wins a level they will get a score bonus and move onto the next level with increased difficulty
{
	score += 1000;
	currentScore = score;
	winText.visible = true;
	enemies.kill();
	enemyBullets.kill();
	game.paused = true;
	distance += 7;
	currentSpeed = speed + increase;
	speed = currentSpeed;
	currentLevel += 1;
	level = currentLevel;
	backgroundv += 1;
	spacefield.inputEnabled = true;
	spacefield.events.onInputDown.add(listener, this);
	if (level > 7)
	{
		time = time;
		me.totalTime = time;
	}

	else if (level <= 7)
	{
		time -= 10;
		me.totalTime = time;
	}

	if (health < 3)
	{
		currentHealth += 1;
		health = currentHealth;
	}

	if (game.input.activePointer.isDown)
	{
		listener();
	}
}

function healthCheck()
{
	healthcheck2560(width2560);
	width2560.addListener(healthcheck2560);

	healthcheck1920(width1920);
	width1920.addListener(healthcheck1920);

	healthcheck19202(width1920);
	width1920.addListener(healthcheck19202);

	healthcheck1600(width1600);
	width1600.addListener(healthcheck1600);

	healthcheck1440(width1440);
	width1440.addListener(healthcheck1440);

	healthcheck14402(width1440);
	width1440.addListener(healthcheck14402);

	healthcheck1366(width1366);
	width1366.addListener(healthcheck1366);

	healthcheck13662(width1366);
	width1366.addListener(healthcheck13662);

	healthcheck1280(width1280);
	width1280.addListener(healthcheck1280);

	healthcheck1024(width1024);
	width1024.addListener(healthcheck1024);

	healthcheck10242(width1024);
	width1024.addListener(healthcheck10242);

	healthcheck960(width960);
	width960.addListener(healthcheck960);

	healthcheck800(width800);
	width800.addListener(healthcheck800);

	healthcheck768(width768);
	width768.addListener(healthcheck768);

	healthcheck640(width640);
	width640.addListener(healthcheck640);

	healthcheck568(width568);
	width568.addListener(healthcheck568);

	healthcheck480(width480);
	width480.addListener(healthcheck480);

	healthcheck414(width414);
	width414.addListener(healthcheck414);

	healthcheck375(width375);
	width375.addListener(healthcheck375);

	healthcheck360(width360);
	width360.addListener(healthcheck360);

	healthcheck320(width320);
	width320.addListener(healthcheck320);
}

function enemyHitsBarricade(enemyBullet, barricade) //A layer of a barricade will be destroyed if an enemy hits it
{
	enemyBullet.kill();
	barricade.animations.play('hit');
	explodeSound.play();
	game.time.events.add(200, function()
	{
		barricade.animations.stop();
		barricade.frame = 1;
		barricade.kill();
	});
}

function enemyCollideBarricade(enemy, barricade) //A layer of a barricade will be destroyed and the enemy will die if it collides with it
{
	enemy.animations.stop();
	enemy.frame = 2;
	barricade.animations.play('hit');
	explodeSound.play();
	game.time.events.add(200, function()
	{
		barricade.animations.stop();
		barricade.frame = 1;
		barricade.kill();
		enemy.kill();
	});
}

function enemyCollidePlayer(player, enemy) //An enemy will be destroyed and the player will lose health if they collide with each other
{
	enemy.animations.stop();
	enemy.frame = 2;
	game.time.events.add(200, function()
	{
		enemy.kill();
	});

	damageSound.play();

	health = health - damage;
	currentHealth = health;

	healthdamage2560(width2560);
	width2560.addListener(healthdamage2560);

	healthdamage1920(width1920);
	width1920.addListener(healthdamage1920);

	healthdamage19202(width1920);
	width1920.addListener(healthdamage19202);

	healthdamage1600(width1600);
	width1600.addListener(healthdamage1600);

	healthdamage1440(width1440);
	width1440.addListener(healthdamage1440);

	healthdamage14402(width1440);
	width1440.addListener(healthdamage14402);

	healthdamage1366(width1366);
	width1366.addListener(healthdamage1366);

	healthdamage13662(width1366);
	width1366.addListener(healthdamage13662);

	healthdamage1280(width1280);
	width1280.addListener(healthdamage1280);

	healthdamage1024(width1024);
	width1024.addListener(healthdamage1024);

	healthdamage10242(width1024);
	width1024.addListener(healthdamage10242);

	healthdamage960(width960);
	width960.addListener(healthdamage960);

	healthdamage800(width800);
	width800.addListener(healthdamage800);

	healthdamage768(width768);
	width768.addListener(healthdamage768);

	healthdamage640(width640);
	width640.addListener(healthdamage640);

	healthdamage568(width568);
	width568.addListener(healthdamage568);

	healthdamage480(width480);
	width480.addListener(healthdamage480);

	healthdamage414(width414);
	width414.addListener(healthdamage414);

	healthdamage375(width375);
	width375.addListener(healthdamage375);

	healthdamage360(width360);
	width360.addListener(healthdamage360);

	healthdamage320(width320);
	width320.addListener(healthdamage320);
}

function enemyFires() //Sets up the firing system for the enemies
{
	enemyBullet = enemyBullets.getFirstExists(false);

	enemy

	livingEnemies.length = 0;

	enemies.forEachAlive(function(enemy){
		livingEnemies.push(enemy);
	});

	if (enemyBullet && livingEnemies.length > 0)
	{
		var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

		var shooter = livingEnemies[random];
		enemyBullet.reset(shooter.body.x, shooter.body.y);
		enemyBullet.body.velocity.y = speed;
		firingTimer = game.time.now + 2000;
	}
}

function listener() //Restarts the game if this is called
{
	this.game.state.restart();
	game.paused = false;
}

function mainsize2560(width2560) //Changes the in game interface, player position abd speed and the enemy bullets if this screen size is reached
{
  if (width2560.matches) {
		player = game.add.sprite(game.world.centerX, game.world.height - 150, 'player');

		enemyGroup();
		enemyBullets.createMultiple(30, 'enemybullet3');

		distanceheight = 80;
		distancewidth1 = 330;
		distancewidth2 = 450;
  }
}

function mainsize1920(width1920)
{
  if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		scaleRatio = window.devicePixelRatio / 2.9;

		playerspeed = 750;
		player.position.y = game.world.height - 110;

		enemyGroup();
		enemyBullets.createMultiple(30, 'enemybullet5');

		distanceheight = 60;
		distancewidth1 = 265;
		distancewidth2 = 350;
  }
}

function mainsize19202(width1920)
{
  if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {

  }
}

function mainsize1600(width1600)
{
  if (width1600.matches) {
		scaleRatio = window.devicePixelRatio / 3.5;
		playerspeed = 550;

		enemyGroup();
		enemyBullets.createMultiple(30, 'enemybullet6');

		distanceheight = 50;
		distancewidth1 = 210;
		distancewidth2 = 275;
  }
}

function mainsize1440(width1440)
{
  if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		playerspeed = 500;

		distanceheight = 50;
		distancewidth1 = 185;
		distancewidth2 = 250;
  }
}

function mainsize14402(width1440)
{
  if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {

  }
}

function mainsize1366(width1366)
{
  if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		scaleRatio = window.devicePixelRatio / 3.7;

		distanceheight = 45;
		distancewidth1 = 175;
		distancewidth2 = 240;
  }
}

function mainsize13662(width1366)
{
  if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {

  }
}

function mainsize1280(width1280)
{
  if (width1280.matches) {
		scaleRatio = window.devicePixelRatio / 3.9;

		playerspeed = 450;

		distancewidth1 = 165;
		distancewidth2 = 230;
  }
}

function mainsize1024(width1024)
{
  if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		scaleRatio = window.devicePixelRatio / 4.4;

		playerspeed = 400;

		enemyGroup();
		enemyBullets.createMultiple(30, 'enemybullet7');

		distanceheight = 40;
		distancewidth1 = 130;
		distancewidth2 = 180;
  }
}

function mainsize10242(width1024)
{
  if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		player.position.y = game.world.height - 80;
  }
}

function mainsize960(width960)
{
  if (width960.matches) {
		scaleRatio = window.devicePixelRatio / 5.2;

		playerspeed = 400;

		distanceheight = 40;
		distancewidth1 = 120;
		distancewidth2 = 170;
  }
}

function mainsize800(width800)
{
  if (width800.matches) {
		scaleRatio = window.devicePixelRatio / 5.8;

		playerspeed = 350;
		player.y = game.world.height - 60;

		distanceheight = 30;
		distancewidth1 = 110;
		distancewidth2 = 140;
  }
}

function mainsize768(width768)
{
  if (width768.matches) {
		scaleRatio = window.devicePixelRatio / 6.8;

		distanceheight = 30;
		distancewidth1 = 100;
		distancewidth2 = 130;
  }
}

function mainsize640(width640)
{
  if (width640.matches) {
		enemyGroup();
		enemyBullets.createMultiple(30, 'enemybullet8');

		distancewidth1 = 90;
		distancewidth2 = 120;
  }
}

function mainsize568(width568)
{
  if (width568.matches) {
		scaleRatio = window.devicePixelRatio / 7.8;

		player.y = game.world.height - 40;

		distanceheight = 20;
		distancewidth1 = 70;
		distancewidth2 = 100;
  }
}

function mainsize480(width480)
{
  if (width480.matches) {
		scaleRatio = window.devicePixelRatio / 8.8;

		playerspeed = 350;
		player.y = game.world.height - 40;

		distanceheight = 20;
		distancewidth1 = 60;
		distancewidth2 = 85;
  }
}

function mainsize414(width414)
{
  if (width414.matches) {
		scaleRatio = window.devicePixelRatio / 6.8;

		playerspeed = 250;
		player.y = game.world.height - 40;

		distanceheight = 20;
		distancewidth1 = 80;
		distancewidth2 = 110;

		textStyle = { font: '3.5vw "VT323", monospace', fill: '#fff' };
  }
}

function mainsize375(width375)
{
  if (width375.matches) {
		player.y = game.world.height - 50;

		distancewidth1 = 80;
		distancewidth2 = 100;
  }
}

function mainsize360(width360)
{
  if (width360.matches) {
		player.y = game.world.height - 45;

		distancewidth1 = 70;
		distancewidth2 = 95;
  }
}

function mainsize320(width320)
{
  if (width320.matches) {
		distancewidth1 = 70;
		distancewidth2 = 95;

		textStyle = { font: '4vw "VT323", monospace', fill: '#fff' };
  }
}

function bullet2560(width2560) //Changes the firing start point and speed for the players bullets if this screen size is reached
{
	if (width2560.matches) {
		bullet.reset(player.x + 60, player.y);
		bullet.body.velocity.y = -600;
		bulletTime = game.time.now + 200;
	}
}

function bullet1920(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		bullet.reset(player.x + 55, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet19202(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
		bullet.reset(player.x + 55, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet1600(width1600)
{
	if (width1600.matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet1440(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet14402(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet1366(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet13662(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet1280(width1280)
{
	if (width1280.matches) {
		bullet.reset(player.x + 45, player.y);
		bullet.body.velocity.y = -300;
		bulletTime = game.time.now + 200;
	}
}

function bullet1024(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		bullet.reset(player.x + 35, player.y);
		bullet.body.velocity.y = -250;
		bulletTime = game.time.now + 200;
	}
}

function bullet10242(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		bullet.reset(player.x + 35, player.y);
		bullet.body.velocity.y = -200;
		bulletTime = game.time.now + 200;
	}
}

function bullet960(width960)
{
	if (width960.matches) {
		bullet.reset(player.x + 30, player.y);
		bullet.body.velocity.y = -200;
		bulletTime = game.time.now + 200;
	}
}

function bullet800(width800)
{
	if (width800.matches) {
		bullet.reset(player.x + 26, player.y);
		bullet.body.velocity.y = -200;
		bulletTime = game.time.now + 200;
	}
}

function bullet768(width768)
{
	if (width768.matches) {
		bullet.reset(player.x + 25, player.y);
		bullet.body.velocity.y = -150;
		bulletTime = game.time.now + 200;
	}
}

function bullet640(width640)
{
	if (width640.matches) {
		bullet.reset(player.x + 25, player.y);
		bullet.body.velocity.y = -100;
		bulletTime = game.time.now + 200;
	}
}

function bullet568(width568)
{
	if (width568.matches) {
		bullet.reset(player.x + 20, player.y);
		bullet.body.velocity.y = -100;
		bulletTime = game.time.now + 200;
	}
}

function bullet480(width480)
{
	if (width480.matches) {
		bullet.reset(player.x + 19, player.y);
		bullet.body.velocity.y = -90;
		bulletTime = game.time.now + 200;
	}
}

function bullet414(width414)
{
	if (width414.matches) {
		bullet.reset(player.x + 22, player.y);
		bullet.body.velocity.y = -150;
		bulletTime = game.time.now + 200;
	}
}

function bullet375(width375)
{
	if (width375.matches) {
		bullet.reset(player.x + 22, player.y);
		bullet.body.velocity.y = -150;
		bulletTime = game.time.now + 200;
	}
}

function bullet360(width360)
{
	if (width360.matches) {
		bullet.reset(player.x + 20, player.y);
		bullet.body.velocity.y = -150;
		bulletTime = game.time.now + 200;
	}
}

function bullet320(width320)
{
	if (width320.matches) {
		bullet.reset(player.x + 21, player.y);
		bullet.body.velocity.y = -150;
		bulletTime = game.time.now + 200;
	}
}

function enemy2560(width2560) //Changes the enemy size, spacing and startpoint if this screen size is detected
{
	if (width2560.matches) {
		var imgFiles = ['enemy01', 'enemy201', 'enemy301', 'enemy401', 'enemy501', 'enemy601'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy.anchor.setTo(0.5, 0.5);
		enemy.animations.add('moving', [0, 1], 2, true);
		enemy.animations.play('moving');
		enemy.body.moves = false;
		enemy.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = game.world.centerX;
		enemies.y = 120;

		startpoint = 40;
	}
}

function enemy1920(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		var previousEnemies = [enemy];

		destroyPreviousEnemies(previousEnemies);

		spacing = 67;

		var imgFiles = ['enemy04', 'enemy204', 'enemy304', 'enemy404', 'enemy504', 'enemy604'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy2 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy2.anchor.setTo(0.5, 0.5);
		enemy2.animations.add('moving', [0, 1], 2, true);
		enemy2.animations.play('moving');
		enemy2.body.moves = false;
		enemy2.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 100;

		startpoint = 25;
	}
}

function enemy19202(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
		var previousEnemies = [enemy, enemy2];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy04', 'enemy204', 'enemy304', 'enemy404', 'enemy504', 'enemy604'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy3 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy3.anchor.setTo(0.5, 0.5);
		enemy3.animations.add('moving', [0, 1], 2, true);
		enemy3.animations.play('moving');
		enemy3.body.moves = false;
		enemy3.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy1600(width1600)
{
	if (width1600.matches) {
		var previousEnemies = [enemy, enemy2, enemy3];

		destroyPreviousEnemies(previousEnemies);

		spacing = 56;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy4 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy4.anchor.setTo(0.5, 0.5);
		enemy4.animations.add('moving', [0, 1], 2, true);
		enemy4.animations.play('moving');
		enemy4.body.moves = false;
		enemy4.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy1440(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4];

		destroyPreviousEnemies(previousEnemies);

		spacing = 50;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy5 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy5.anchor.setTo(0.5, 0.5);
		enemy5.animations.add('moving', [0, 1], 2, true);
		enemy5.animations.play('moving');
		enemy5.body.moves = false;
		enemy5.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 80;
	}
}

function enemy14402(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy6 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy6.anchor.setTo(0.5, 0.5);
		enemy6.animations.add('moving', [0, 1], 2, true);
		enemy6.animations.play('moving');
		enemy6.body.moves = false;
		enemy6.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy1366(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6];

		destroyPreviousEnemies(previousEnemies);

		spacing = 48;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy7 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy7.anchor.setTo(0.5, 0.5);
		enemy7.animations.add('moving', [0, 1], 2, true);
		enemy7.animations.play('moving');
		enemy7.body.moves = false;
		enemy7.scale.setTo(scaleRatio, scaleRatio);

		startpoint = 20;
	}
}

function enemy13662(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy8 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy8.anchor.setTo(0.5, 0.5);
		enemy8.animations.add('moving', [0, 1], 2, true);
		enemy8.animations.play('moving');
		enemy8.body.moves = false;
		enemy8.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy1280(width1280)
{
	if (width1280.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

		destroyPreviousEnemies(previousEnemies);

		spacing = 46;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy9 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy9.anchor.setTo(0.5, 0.5);
		enemy9.animations.add('moving', [0, 1], 2, true);
		enemy9.animations.play('moving');
		enemy9.body.moves = false;
		enemy9.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy1024(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9];

		destroyPreviousEnemies(previousEnemies);

		spacing = 40;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy10 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy10.anchor.setTo(0.5, 0.5);
		enemy10.animations.add('moving', [0, 1], 2, true);
		enemy10.animations.play('moving');
		enemy10.body.moves = false;
		enemy10.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 70;

		startpoint = 15;
	}
}

function enemy10242(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy11 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy11.anchor.setTo(0.5, 0.5);
		enemy11.animations.add('moving', [0, 1], 2, true);
		enemy11.animations.play('moving');
		enemy11.body.moves = false;
		enemy11.scale.setTo(scaleRatio, scaleRatio);
	}
}

function enemy960(width960)
{
	if (width960.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11];

		destroyPreviousEnemies(previousEnemies);

		spacing = 35;

		var imgFiles = ['enemy07', 'enemy207', 'enemy307', 'enemy407', 'enemy507', 'enemy607'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy12 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy12.anchor.setTo(0.5, 0.5);
		enemy12.animations.add('moving', [0, 1], 2, true);
		enemy12.animations.play('moving');
		enemy12.body.moves = false;
		enemy12.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 60;
	}
}

function enemy800(width800)
{
	if (width800.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12];

		destroyPreviousEnemies(previousEnemies);

		spacing = 30;

		var imgFiles = ['enemy07', 'enemy207', 'enemy307', 'enemy407', 'enemy507', 'enemy607'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy13 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy13.anchor.setTo(0.5, 0.5);
		enemy13.animations.add('moving', [0, 1], 2, true);
		enemy13.animations.play('moving');
		enemy13.body.moves = false;
		enemy13.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 50;
	}
}

function enemy768(width768)
{
	if (width768.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13];

		destroyPreviousEnemies(previousEnemies);

		spacing = 25;

		var imgFiles = ['enemy08', 'enemy208', 'enemy308', 'enemy408', 'enemy508', 'enemy608'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy14 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy14.anchor.setTo(0.5, 0.5);
		enemy14.animations.add('moving', [0, 1], 2, true);
		enemy14.animations.play('moving');
		enemy14.body.moves = false;
		enemy14.scale.setTo(scaleRatio, scaleRatio);

		enemies.y = 45;

		startpoint = 10;
	}
}

function enemy640(width640)
{
	if (width640.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14];

		destroyPreviousEnemies(previousEnemies);

		spacing = 28;

		var imgFiles = ['enemy07', 'enemy207', 'enemy307', 'enemy407', 'enemy507', 'enemy607'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy15 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy15.anchor.setTo(0.5, 0.5);
		enemy15.animations.add('moving', [0, 1], 2, true);
		enemy15.animations.play('moving');
		enemy15.body.moves = false;
		enemy15.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 10;
		enemies.y = 50;

		startpoint = 240;
	}
}

function enemy568(width568)
{
	if (width568.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15];

		destroyPreviousEnemies(previousEnemies);

		spacing = 23;

		var imgFiles = ['enemy08', 'enemy208', 'enemy308', 'enemy408', 'enemy508', 'enemy608'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy16 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy16.anchor.setTo(0.5, 0.5);
		enemy16.animations.add('moving', [0, 1], 2, true);
		enemy16.animations.play('moving');
		enemy16.body.moves = false;
		enemy16.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 10;
		enemies.y = 40;

		startpoint = 240;
	}
}

function enemy480(width480)
{
	if (width480.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16];

		destroyPreviousEnemies(previousEnemies);

		spacing = 17;

		var imgFiles = ['enemy09', 'enemy209', 'enemy309', 'enemy409', 'enemy509', 'enemy609'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy17 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy17.anchor.setTo(0.5, 0.5);
		enemy17.animations.add('moving', [0, 1], 2, true);
		enemy17.animations.play('moving');
		enemy17.body.moves = false;
		enemy17.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 10;
		enemies.y = 40;

		startpoint = 240;
	}
}

function enemy414(width414)
{
	if (width414.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17];

		destroyPreviousEnemies(previousEnemies);

		spacing = 24;

		var imgFiles = ['enemy06', 'enemy206', 'enemy306', 'enemy406', 'enemy506', 'enemy606'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy18 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy18.anchor.setTo(0.5, 0.5);
		enemy18.animations.add('moving', [0, 1], 2, true);
		enemy18.animations.play('moving');
		enemy18.body.moves = false;
		enemy18.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 20;
		enemies.y = 50;

		startpoint = 290;
	}
}

function enemy375(width375)
{
	if (width375.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy08', 'enemy208', 'enemy308', 'enemy408', 'enemy508', 'enemy608'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy19 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy19.anchor.setTo(0.5, 0.5);
		enemy19.animations.add('moving', [0, 1], 2, true);
		enemy19.animations.play('moving');
		enemy19.body.moves = false;
		enemy19.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 20;
		enemies.y = 50;

		startpoint = 250;
	}
}

function enemy360(width360)
{
	if (width360.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy08', 'enemy208', 'enemy308', 'enemy408', 'enemy508', 'enemy608'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy20 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy20.anchor.setTo(0.5, 0.5);
		enemy20.animations.add('moving', [0, 1], 2, true);
		enemy20.animations.play('moving');
		enemy20.body.moves = false;
		enemy20.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 20;
		enemies.y = 50;

		startpoint = 240;
	}
}

function enemy320(width320)
{
	if (width320.matches) {
		var previousEnemies = [enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20];

		destroyPreviousEnemies(previousEnemies);

		var imgFiles = ['enemy07', 'enemy207', 'enemy307', 'enemy407', 'enemy507', 'enemy607'];
		var randomImages = imgFiles[Math.floor(Math.random()*imgFiles.length)];
		enemy21 = enemies.create(enex * spacing, eney * spacing, randomImages);
		enemy21.anchor.setTo(0.5, 0.5);
		enemy21.animations.add('moving', [0, 1], 2, true);
		enemy21.animations.play('moving');
		enemy21.body.moves = false;
		enemy21.scale.setTo(scaleRatio, scaleRatio);

		enemies.x = 20;
		enemies.y = 50;

		startpoint = 200;
	}
}

function barricade2560(width2560) //Changes the barricades size, spacing and startpoint if this screen size is detected
{
	if (width2560.matches) {
		barricade = barricades.create(barx * 400, bary * 10, 'barricade');
		barricade.scale.setTo(scaleRatio, scaleRatio);
		barricade.animations.add('hit', [0], 5, true);
		barricade.frame = 1;
		barricade.anchor.setTo(0.5, 0.5);

		barricades.x = 260;
		barricades.y = game.world.height - 250;
	}
}

function barricade1920(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		var previousBarricades = [barricade];

		destroyPreviousBarricades(previousBarricades);

		barricade2 = barricades.create(barx * 300, bary * 7, 'barricade');
		barricade2.scale.setTo(scaleRatio, scaleRatio);
		barricade2.animations.add('hit', [0], 5, true);
		barricade2.frame = 1;
		barricade2.anchor.setTo(0.5, 0.5);

		barricades.x = 200;
		barricades.y = game.world.height - 200;
	}
}

function barricade19202(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
		var previousBarricades = [barricade, barricade2];

		destroyPreviousBarricades(previousBarricades);

		barricade3 = barricades.create(barx * 300, bary * 7, 'barricade');
		barricade3.scale.setTo(scaleRatio, scaleRatio);
		barricade3.animations.add('hit', [0], 5, true);
		barricade3.frame = 1;
		barricade3.anchor.setTo(0.5, 0.5);
	}
}

function barricade1600(width1600)
{
	if (width1600.matches) {
		var previousBarricades = [barricade, barricade2, barricade3];

		destroyPreviousBarricades(previousBarricades);

		barricade4 = barricades.create(barx * 250, bary * 5, 'barricade');
		barricade4.scale.setTo(scaleRatio, scaleRatio);
		barricade4.animations.add('hit', [0], 5, true);
		barricade4.frame = 1;
		barricade4.anchor.setTo(0.5, 0.5);

		barricades.x = 180;
		barricades.y = game.world.height - 180;
	}
}

function barricade1440(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4];

		destroyPreviousBarricades(previousBarricades);

		barricade5 = barricades.create(barx * 230, bary * 5, 'barricade');
		barricade5.scale.setTo(scaleRatio, scaleRatio);
		barricade5.animations.add('hit', [0], 5, true);
		barricade5.frame = 1;
		barricade5.anchor.setTo(0.5, 0.5);

		barricades.x = 150;
		barricades.y = game.world.height - 180;
	}
}

function barricade14402(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5];

		destroyPreviousBarricades(previousBarricades);

		barricade6 = barricades.create(barx * 230, bary * 5, 'barricade');
		barricade6.scale.setTo(scaleRatio, scaleRatio);
		barricade6.animations.add('hit', [0], 5, true);
		barricade6.frame = 1;
		barricade6.anchor.setTo(0.5, 0.5);
	}
}

function barricade1366(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6];

		destroyPreviousBarricades(previousBarricades);

		barricade7 = barricades.create(barx * 210, bary * 5, 'barricade2');
		barricade7.scale.setTo(scaleRatio, scaleRatio);
		barricade7.animations.add('hit', [0], 5, true);
		barricade7.frame = 1;
		barricade7.anchor.setTo(0.5, 0.5);

		barricades.x = 155;
		barricades.y = game.world.height - 180;
	}
}

function barricade13662(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7];

		destroyPreviousBarricades(previousBarricades);

		barricade8 = barricades.create(barx * 210, bary * 5, 'barricade2');
		barricade8.scale.setTo(scaleRatio, scaleRatio);
		barricade8.animations.add('hit', [0], 5, true);
		barricade8.frame = 1;
		barricade8.anchor.setTo(0.5, 0.5);
	}
}

function barricade1280(width1280)
{
	if (width1280.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8];

		destroyPreviousBarricades(previousBarricades);

		barricade9 = barricades.create(barx * 200, bary * 5, 'barricade2');
		barricade9.scale.setTo(scaleRatio, scaleRatio);
		barricade9.animations.add('hit', [0], 5, true);
		barricade9.frame = 1;
		barricade9.anchor.setTo(0.5, 0.5);

		barricades.x = 145;
		barricades.y = game.world.height - 180;
	}
}

function barricade1024(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9];

		destroyPreviousBarricades(previousBarricades);

		barricade10 = barricades.create(barx * 160, bary * 5, 'barricade2');
		barricade10.scale.setTo(scaleRatio, scaleRatio);
		barricade10.animations.add('hit', [0], 5, true);
		barricade10.frame = 1;
		barricade10.anchor.setTo(0.5, 0.5);

		barricades.x = 110;
		barricades.y = game.world.height - 180;
	}
}

function barricade10242(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10];

		destroyPreviousBarricades(previousBarricades);

		barricade11 = barricades.create(barx * 160, bary * 5, 'barricade2');
		barricade11.scale.setTo(scaleRatio, scaleRatio);
		barricade11.animations.add('hit', [0], 5, true);
		barricade11.frame = 1;
		barricade11.anchor.setTo(0.5, 0.5);

		barricades.x = 110;
		barricades.y = game.world.height - 140;
	}
}

function barricade960(width960)
{
	if (width960.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11];

		destroyPreviousBarricades(previousBarricades);

		barricade12 = barricades.create(barx * 150, bary * 5, 'barricade2');
		barricade12.scale.setTo(scaleRatio, scaleRatio);
		barricade12.animations.add('hit', [0], 5, true);
		barricade12.frame = 1;
		barricade12.anchor.setTo(0.5, 0.5);
	}
}

function barricade800(width800)
{
	if (width800.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12];

		destroyPreviousBarricades(previousBarricades);

		barricade13 = barricades.create(barx * 120, bary * 5, 'barricade2');
		barricade13.scale.setTo(scaleRatio, scaleRatio);
		barricade13.animations.add('hit', [0], 5, true);
		barricade13.frame = 1;
		barricade13.anchor.setTo(0.5, 0.5);

		barricades.x = 100;
		barricades.y = game.world.height - 130;
	}
}

function barricade768(width768)
{
	if (width768.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13];

		destroyPreviousBarricades(previousBarricades);

		barricade14 = barricades.create(barx * 120, bary * 5, 'barricade2');
		barricade14.scale.setTo(scaleRatio, scaleRatio);
		barricade14.animations.add('hit', [0], 5, true);
		barricade14.frame = 1;
		barricade14.anchor.setTo(0.5, 0.5);

		barricades.x = 70;
		barricades.y = game.world.height - 110;
	}
}

function barricade640(width640)
{
	if (width640.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14];

		destroyPreviousBarricades(previousBarricades);

		barricade15 = barricades.create(barx * 105, bary * 3, 'barricade3');
		barricade15.scale.setTo(scaleRatio, scaleRatio);
		barricade15.animations.add('hit', [0], 5, true);
		barricade15.frame = 1;
		barricade15.anchor.setTo(0.5, 0.5);

		barricades.x = 60;
		barricades.y = game.world.height - 100;
	}
}

function barricade568(width568)
{
	if (width568.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15];

		destroyPreviousBarricades(previousBarricades);

		barricade16 = barricades.create(barx * 90, bary * 3, 'barricade3');
		barricade16.scale.setTo(scaleRatio, scaleRatio);
		barricade16.animations.add('hit', [0], 5, true);
		barricade16.frame = 1;
		barricade16.anchor.setTo(0.5, 0.5);

		barricades.x = 60;
		barricades.y = game.world.height - 80;
	}
}

function barricade480(width480)
{
	if (width480.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15, barricade16];

		destroyPreviousBarricades(previousBarricades);

		barricade17 = barricades.create(barx * 75, bary * 3, 'barricade3');
		barricade17.scale.setTo(scaleRatio, scaleRatio);
		barricade17.animations.add('hit', [0], 5, true);
		barricade17.frame = 1;
		barricade17.anchor.setTo(0.5, 0.5);

		barricades.x = 50;
		barricades.y = game.world.height - 80;
	}
}

function barricade414(width414)
{
	if (width414.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15, barricade16, barricade17];

		destroyPreviousBarricades(previousBarricades);

		barricade18 = barricades.create(barx * 65, bary * 2.5, 'barricade5');
		barricade18.scale.setTo(scaleRatio, scaleRatio);
		barricade18.animations.add('hit', [0], 5, true);
		barricade18.frame = 1;
		barricade18.anchor.setTo(0.5, 0.5);

		barricades.x = 45;
		barricades.y = game.world.height - 80;
	}
}

function barricade375(width375)
{
	if (width375.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15, barricade16, barricade17, barricade18];

		destroyPreviousBarricades(previousBarricades);

		barricade19 = barricades.create(barx * 60, bary * 2.5, 'barricade5');
		barricade19.scale.setTo(scaleRatio, scaleRatio);
		barricade19.animations.add('hit', [0], 5, true);
		barricade19.frame = 1;
		barricade19.anchor.setTo(0.5, 0.5);

		barricades.x = 35;
		barricades.y = game.world.height - 80;
	}
}

function barricade360(width360)
{
	if (width360.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15, barricade16, barricade17, barricade18, barricade19];

		destroyPreviousBarricades(previousBarricades);

		barricade20 = barricades.create(barx * 60, bary * 2.3, 'barricade5');
		barricade20.scale.setTo(scaleRatio, scaleRatio);
		barricade20.animations.add('hit', [0], 5, true);
		barricade20.frame = 1;
		barricade20.anchor.setTo(0.5, 0.5);

		barricades.x = 30;
		barricades.y = game.world.height - 80;
	}
}

function barricade320(width320)
{
	if (width320.matches) {
		var previousBarricades = [barricade, barricade2, barricade3, barricade4, barricade5, barricade6, barricade7, barricade8, barricade9, barricade10, barricade11, barricade12, barricade13, barricade14, barricade15, barricade16, barricade17, barricade18, barricade19, barricade20];

		destroyPreviousBarricades(previousBarricades);

		barricade21 = barricades.create(barx * 50, bary * 2.3, 'barricade6');
		barricade21.scale.setTo(scaleRatio, scaleRatio);
		barricade21.animations.add('hit', [0], 5, true);
		barricade21.frame = 1;
		barricade21.anchor.setTo(0.5, 0.5);

		barricades.x = 35;
		barricades.y = game.world.height - 80;
	}
}

function healthdamage2560(width2560) //Controls what is displayed to represent how much health the pkayer has if this screen size is detected
{
	if (width2560.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 150);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 150);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1920(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage19202(width1920)
{
	if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 100);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 100);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1600(width1600)
{
	if (width1600.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 100);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 100);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1440(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage14402(width1440)
{
	if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1366(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage13662(width1366)
{
	if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1280(width1280)
{
	if (width1280.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage1024(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 110);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage10242(width1024)
{
	if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 80);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 80);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage960(width960)
{
	if (width960.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(135, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 80);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 80);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(135, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage800(width800)
{
	if (width800.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage768(width768)
{
	if (width768.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage640(width640)
{
	if (width640.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(75, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 60);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(75, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage568(width568)
{
	if (width568.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage480(width480)
{
	if (width480.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage414(width414)
{
	if (width414.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage375(width375)
{
	if (width375.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 50);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 50);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage360(width360)
{
	if (width360.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 45);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 45);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthdamage320(width320)
{
	if (width320.matches) {
		if (health == 2)
		{
			heart3.kill();

		  heart3 = game.add.image(65, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 1)
		{
			heart3.kill();
			heart2.kill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');

			player.reset(game.world.centerX, game.world.height - 40);

			heart2.scale.setTo(scaleRatio, scaleRatio);
			heart3.scale.setTo(scaleRatio, scaleRatio);
		}

		if (health == 0)
		{
			healthKill();

			heart3 = game.add.image(65, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart1 = game.add.image(15, 15, 'healthgone');

			runLoseGame();
		}
	}
}

function healthcheck2560(width2560) { //Controls what is displayed to represent how much health the player has at the start of a level if this screen size is detected
	if (width2560.matches) {

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1920(width1920) {
	if (width1920.matches && window.matchMedia("(max-height: 1200px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck19202(width1920) {
	if (width1920.matches && window.matchMedia("(max-height: 1080px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1600(width1600) {
	if (width1600.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1440(width1440) {
	if (width1440.matches && window.matchMedia("(max-height: 1024px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck14402(width1440) {
	if (width1440.matches && window.matchMedia("(max-height: 900px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1366(width1366) {
	if (width1366.matches && window.matchMedia("(max-height: 1024px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck13662(width1366) {
	if (width1366.matches && window.matchMedia("(max-height: 768px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1280(width1280) {
	if (width1280.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck1024(width1024) {
	if (width1024.matches && window.matchMedia("(max-height: 768px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck10242(width1024) {
	if (width1024.matches && window.matchMedia("(max-height: 600px)").matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck960(width960) {
	if (width960.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck800(width800) {
	if (width800.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'health');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(75, 15, 'healthgone');
			heart3 = game.add.image(135, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck768(width768) {
	if (width768.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'health');
			heart3 = game.add.image(75, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'health');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck640(width640) {
	if (width640.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'health');
			heart3 = game.add.image(75, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'health');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(45, 15, 'healthgone');
			heart3 = game.add.image(75, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck568(width568) {
	if (width568.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck480(width480) {
	if (width480.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck414(width414) {
	if (width414.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck375(width375) {
	if (width375.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck360(width360) {
	if (width360.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function healthcheck320(width320) {
	if (width320.matches) {
		healthKill();

		if (health == 3)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'health');

			heartScale();
		}

		if (health == 2)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'health');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 1)
		{
			heart1 = game.add.image(15, 15, 'health');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}

		if (health == 0)
		{
			heart1 = game.add.image(15, 15, 'healthgone');
			heart2 = game.add.image(40, 15, 'healthgone');
			heart3 = game.add.image(65, 15, 'healthgone');

			heartScale();
		}
	}
}

function destroyPreviousEnemies(enemies) { //Destroys all enemies if a new screen size is detected so that there is not two sets of enemies on screen
	for (var i = 0; i < enemies.length; i++) {
		var currentEnemy = enemies[i];
		if (typeof currentEnemy != 'undefined') {
			currentEnemy.destroy();
		}
	}
}

function destroyPreviousBarricades(barricades) { //Destroys all barricades if a new screen size is detected so that there is not two sets of barricades on screen
	for (var i = 0; i < enemies.length; i++) {
		var currentBarricade = barricades[i];
		if (typeof currentBarricade != 'undefined') {
			currentBarricade.destroy();
		}
	}
}

function runLoseGame() { //If a player loses all of their health then the lose game screen will appear
	heart1.scale.setTo(scaleRatio, scaleRatio);
	heart2.scale.setTo(scaleRatio, scaleRatio);
	heart3.scale.setTo(scaleRatio, scaleRatio);

	deathSound.play();
	musicSound.stop();

	game.time.events.add(600, function()
	{
		loseGame();
	});
}

function heartScale() { //Scales the players health indicators to fit on screen
	heart1.scale.setTo(scaleRatio, scaleRatio);
	heart2.scale.setTo(scaleRatio, scaleRatio);
	heart3.scale.setTo(scaleRatio, scaleRatio);
}

function healthKill() { //Changes all of the health indicators if the player dies
	heart3.kill();
	heart2.kill();
	heart1.kill();
}

function enemyGroup() { //Creates a new set of enemy bullets each time a new set of enemies is created
	enemyBullets = game.add.group();
	enemyBullets.enableBody = true;
	enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
}
