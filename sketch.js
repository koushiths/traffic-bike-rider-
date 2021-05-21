var path, bike1;
var car1, car2, car3;
var pathImg, bike1Img;

var oppcar1Img, oppcar2Img,oppcar3Img;

var gameOverImg;

var c1G, c2G, c3G;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

function preload() {
  pathImg = loadImage("rd.jpg");
  
  bike1Img = loadImage("b1.png");
  

  oppcar1Img = loadImage("c4.png");

  oppcar2Img = loadImage("c5.png");

  oppcar3Img = loadImage("a1.png ");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  // Moving background
  path = createSprite(width/2, 120);
  path.addImage(pathImg);
  path.velocityY = -5;
  path.scale=4.0

  //creating boy running
  bike1 = createSprite(width/2,height-100, 20, 20);
  bike1.addImage( bike1Img);
  bike1.scale = 0.3;

  //set collider for mainCyclist
  bike1.setCollider("circle", 0, 0, 5)

  c1G = new Group();
  c2G = new Group();
  c3G = new Group();

}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 0, 30);

  if (gameState === PLAY) {

    distance = distance + Math.round(getFrameRate() / 60);
    path.velocityY = (6 + 3 * distance / 100);

if (keyDown(LEFT_ARROW)) {
 bike1.x=bike1.x-8 || touches.length>0 
    touches=[]
}
  
  if (keyDown(RIGHT_ARROW)) {
 bike1.x=bike1.x+8 || touches.length>0 
    touches=[]
}
    edges = createEdgeSprites();
    bike1.collide(edges);

    //code to reset the background
   if (path.y >  height) {
    path.y =  height / 2;
  }  

    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 60 === 0) {
      if (select_oppPlayer == 1) {
        car1();
      } else if (select_oppPlayer == 2) {
        car2();
      } else if (select_oppPlayer == 3){
        car3();
      }
    }

    if (c1G.isTouching(bike1)) {
      gameState = END;
      player1.velocityY = 0;
      player1.addImage( oppcar1Img);
    }

    if (c2G.isTouching(bike1)) {
      gameState = END;
      player2.velocityY = 0;
      player2.addImage( oppcar2Img);
    }

    if (c3G.isTouching(bike1)) {
      gameState = END;
      player3.velocityY = 0;
      player3.addImage( oppcar3Img);
    }

  } else if (gameState === END) {


    text("press UP ARROW to RESTART", 200, 300);

    path.velocityY = 0;
    bike1.velocityY = 0;
    bike1.addImage(bike1Img);

    c1G.setVelocityYEach(0);
    c1G.setLifetimeEach(-1);

    c2G.setVelocityYEach(0);
    c2G.setLifetimeEach(-1);

    c3G.setVelocityYEach(0);
    c3G.setLifetimeEach(-1);

    //write condition for calling reset( )
if (keyDown(UP_ARROW)) {
  reset();
}

  }
}


function car1() {
  player1 = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  player1.scale = 0.2;
  player1.velocityY = (6 + 3 * distance / 150);
  player1.addImage(oppcar1Img);
  player1.setLifetime = 170;
  c1G.add(player1);
}

function car2() {
  player2 = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  player2.scale = 0.5;
  player2.velocityY = (6 + 3* distance / 150);
  player2.addImage(oppcar2Img);
  player2.setLifetime = 170;
  c2G.add(player2);
}

function car3() {
  player3 = createSprite(Math.round(random(50, width-50), 40, 10, 10));
  player3.scale = 0.7;
  player3.velocityY = (6 + 3 * distance / 150);
  player3.addImage(oppcar3Img);
  player3.setLifetime = 170;
  player3.setCollider("circle", 0, 0, 150)
  c3G.add(player3);
}

//create reset function here
function reset() {
  gameState = PLAY
  
  bike1.addImage( bike1Img);

  c1G.destroyEach();
  c2G.destroyEach();
  c3G.destroyEach();
  
  distance=0
}