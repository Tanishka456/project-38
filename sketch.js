// variables to load the images
var monkey_running, obstacleImage,bananaImage;

//variables to add the images
var banana , obstacle , monkey , ground;

// groups
var FoodGroup, obstacleGroup;

// variable for the score
var score;

// variable to display score/survivalTime
survivalTime = 0;

// game states
var PLAY = 1 , END = 0; gameState = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(1200,1200);
  
//creating the monkey
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1;
  
//creating the ground
ground = createSprite(400,350,800,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);

// creating the groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //creating the score
  score = 0;
  
}


function draw() {
background("white");
  
 if(ground.x < 0 ){
    ground.x = ground.width/2;
  }
   if(keyDown("space")){
    monkey.velocityY = -12;
  }
   // add gravity 
    monkey.velocityY = monkey.velocityY + 0.8;
  
   // make the monkey not fall of the ground
     monkey.collide(ground);
   
 //call food and obstacles1 function
      food();
      obstacles1();

      camera.position.x = displayWidth/2;
      camera.position.y = displayHeight/2;

  
drawSprites();

  
 
 
  //display score/survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  
  

//if(gameState === END){
// destroy the banana and the obstacles if game ends
if(monkey.isTouching(obstacleGroup)){
  ground.velocityX = 0;
  monkey.velocityY = 0;
 // FoodGroup.destroyEach();
//  obstacleGroup.destroyEach();
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}
  
/*}
  
monkey.debug = true;

if(gameState === PLAY){
// destroy the banana when monkey touches it 
if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
}
 
    
  
}*/


// defining the function 'food'

function food(){
if(frameCount%80 === 0){
  banana = createSprite(600,120,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.y = Math.round(random(120,200));
  banana.velocityX = -3;
//assign lifetime to the banana
  banana.lifetime = 200;
  FoodGroup.add(banana);
  monkey.depth = banana.depth+1;

}
}
}
// defining the function obstacles1

function obstacles1(){
if(frameCount% 300 === 0){
  obstacle = createSprite(400,310,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
 // obstacle.y = Math.round(random(140,200));
  obstacle.velocityX = -3;
  // assign lifetime to the obstacle
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
}
}