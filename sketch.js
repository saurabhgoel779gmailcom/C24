var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
var lose, loseAnimation, play, playAnimation;
function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
  playAnimation=loadAnimation("images/play.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  play=createSprite(width,height,100,100);
  play.addAnimation("playimg", playAnimation);
  play.visible=false;
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(countDistanceX-150,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,6520);
}

function draw() {
  background('skyblue');
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
          //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }

   }

   if(mario.spt.x<100 || mario.spt.isTouching(obstacleGroup)){
    gameState=LOSE;
  }

  if(flag.isTouching(mario.spt)){
    gameState=WIN;
  }

  if(gameState===LOSE)//END State
  {   
    lose();
  }

  if(gameState===WIN)//WIN state
  {  
    win();
  }
  

   drawSprites();
}

function lose(){
  text("YOU LOSE!!", width/2,height/2);
  text("Click 'r' to restart", width/2,height/2+50);
  mario.spt.velocityY=0;
  mario.spt.pause();
  obstacleGroup.destroyEach();
}

function win(){
  textSize(18);
  fill("red");
  stroke("black");
  text("Click 'r' to restart", width/2,height/2+100);
  mario.spt.velocityY=0;
  mario.spt.pause();
  obstacleGroup.destroyEach();
}

