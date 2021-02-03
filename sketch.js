var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword;
var swordImage;
var fruitImage1;
var fruitImage2;
var friutImage3;
var furitImage4;
var alienImage;
var fruit1;
var fruit2;
var fruit3;
var fruit4;
var alien;
var alienImage;
var gameoverImage;





function preload(){
  
 swordImage = loadImage("sword.png");
 alienImage = loadAnimation("alien1.png","alien2.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 gameoverImage = loadImage("gameover.png");
 sound1 = loadSound("knifeSwooshSound.mp3");
 sound2 = loadSound("gameover.mp3");
}

function setup(){
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.setCollider("rectangle",0,0,40,40);
  sword.debug = false;

  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
}






function draw(){

  background("lightblue");
  
  if (gameState === PLAY){
    fruits();
    enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      sound1.play();
      score = score + 1
      
    }
    else
  {
   if (enemyGroup.isTouching(sword)){
     gameState = END;
     sound2.play();
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     
     sword.addImage(gameoverImage);
     sword.x = 200;
     sword.y = 200;
     }  
   } 
 }
  
  
  drawSprites();
  
  text("Score: "+ score,300,30);
}




function fruits(){
    if(World.frameCount%80===0){
      position = Math.round(random(1,2));
      
      
    fruit = createSprite(400,200,20,20);
      console.log(position);
      fruit.scale = 0.2;
     
     if(position == 1)
      {
      fruit.x = 400;
       fruit.velocityX  = -(7 + (score/4));
      
      }
      else
      {
        if(position == 2){
          fruit.x = 0;
          fruit.velocityX = (7 +(score/4));
        }
        }   
        
       fruit.scale = 0.2;
       fruit.debug = false;
    
    
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else if(r == 4){
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruitGroup.add(fruit)
  
}
}








function enemy(){
  if(World.frameCount %200 === 0){
    alien = createSprite(400,200,20,20);
    alien.addAnimation("moving",alienImage);
    alien.y = Math.round(random(100,300));
    alien.velocityX = -(8 + (score/10));
    alien.setLifetime = 50;
    
    enemyGroup.add(alien);
  }
}


