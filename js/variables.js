//Initializes the majority of the variables before the game is loaded 
var spacefield;
var backgroundv = 5;

var player;
var playerspeed = 1000;
var cursors;

var health = 3;
var damage = 1;
var currentHealth;

var heart1;
var heart2;
var heart3;

var bullets;
var bulletTime = 0;
var attack;

var enemies;

var barricades;

var distance = 10;
var speed = 350;
var currentSpeed;
var increase = 50;
var time = 90;

var currentLevel = 1;
var level = currentLevel;
var levelText;

var currentScore = 0;
var score = currentScore;
var highScore = 0;
var highScoreText;
var scoreText; //Stores the text that will be displayed to show the players score
var winText; //Stores the text that will be displayed when the player wins
var loseText; //Stores the text that will be displayed when the player loses

var localStorageName = "Josh";

var enemyBullets;
var firingTimer = 0;
var livingEnemies = [];

var textStyle = { font: '2.3vw "VT323", monospace', fill: '#fff' };
var textStyle2 = { font: '5vw "VT323", monospace', fill: '#fff', align: 'center' };
var textStyle3 = { font: '3.5vw "VT323", monospace', fill: '#fff' };
var textStyle4 = { font: '3vw "VT323", monospace', fill: '#fff', align: 'center' };

var me;
var currentTime;
var timeDifference;
var timeRemaining;
var minutes;
var seconds;
var result;

var blastSound;
var explodeSound;
var moveSound;
var musicSound;
var damageSound;
var deathSound;

var howTo;
var playerMovement;
var playerLeftRight
var playerShoot;
var playerAttack;
var howToGo;

var scaleRatio = window.devicePixelRatio / 2.6;

var width2560 = window.matchMedia("(max-width: 2560px)");
var width1920 = window.matchMedia("(max-width: 1920px)");
var width1600 = window.matchMedia("(max-width: 1600px)");
var width1440 = window.matchMedia("(max-width: 1440px)");
var width1366 = window.matchMedia("(max-width: 1366px)");
var width1280 = window.matchMedia("(max-width: 1280px)");
var width1024 = window.matchMedia("(max-width: 1024px)");
var width960 = window.matchMedia("(max-width: 960px)");
var width800 = window.matchMedia("(max-width: 800px)");
var width768 = window.matchMedia("(max-width: 768px)");
var width640 = window.matchMedia("(max-width: 640px)");
var width568 = window.matchMedia("(max-width: 568px)");
var width480 = window.matchMedia("(max-width: 480px)");
var width414 = window.matchMedia("(max-width: 414px)");
var width375 = window.matchMedia("(max-width: 375px)");
var width360 = window.matchMedia("(max-width: 360px)");
var width320 = window.matchMedia("(max-width: 320px)");

var barricade;
var barricade2;
var barricade3;
var barricade4;
var barricade5;
var barricade6;
var barricade7;
var barricade8;
var barricade9;
var barricade10;
var barricade11;
var barricade12;
var barricade13;
var barricade14;
var barricade15;
var barricade16;
var barricade17;
var barricade18;
var barricade19;
var barricade20;
var barricade21;

var bary;
var barx;

var enemy;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var enemy7;
var enemy8;
var enemy9;
var enemy10;
var enemy11;
var enemy12;
var enemy13;
var enemy14;
var enemy15;
var enemy16;
var enemy17;
var enemy18;
var enemy19;
var enemy20;
var enemy21;

var startpoint = 50;

var distanceheight = 60;
var distancewidth1 = 310;
var distancewidth2 = 400;

var enemysize = 90;
var enex;
var eney;
var row = 5;
var column = 15;

var fire = false;
var left = false;
var right = false;

var spacing = 88;

var variableState = {
  create: function() {
    game.state.start('boot');
  }
};
