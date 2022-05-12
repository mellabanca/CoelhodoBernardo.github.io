const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var floor;

var rope;
var fruit;

var stick, stick1, stick2;

var bunnySprite;
var soprador;

var backgroundImage, fruitImage, rabbitImage,buttonImage,MuteImg;
var buttonImage2,buttonImage3;
var rope2, rope3;
var blink, eating, sad;

var backgroundSound, cutSound, depre, guloso, fu;

function preload(){
  backgroundImage = loadImage("./preload/background.png");
  fruitImage = loadImage("./preload/melon.png");
  rabbitImage = loadImage("./preload/Rabbit-01.png");
  blink = loadAnimation("./preload/blink_1.png","./preload/blink_2.png","./preload/blink_3.png");
  eating = loadAnimation("./preload/eat_0.png","./preload/eat_1.png","./preload/eat_2.png","./preload/eat_3.png","./preload/eat_4.png");
  sad = loadAnimation("./preload/sad_1.png","./preload/sad_2.png","./preload/sad_3.png");
  backgroundSound = loadSound("./preload/sound1.mp3");
  cutSound = loadSound("./preload/rope_cut.mp3");
  depre = loadSound("./preload/sad.wav");
  guloso = loadSound("./preload/eating_sound.mp3");
  fu = loadSound("./preload/air.wav");

  blink.playing = true;
  eating.playing = true;
  sad.playing = true;

  eating.looping = false;
  sad.looping = false;
}

function setup() 
{
  var ifMobile = /iPhone|IPad|iPod|Android/i.test(navigator.userAgent);
  if(ifMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  
  backgroundSound.play();
  backgroundSound.setVolume(0.3);
  engine = Engine.create();
  world = engine.world;

  bunnySprite = createSprite(170,canH-80,100,100);
  bunnySprite.scale = 0.2;
  bunnySprite.addImage(rabbitImage);
  bunnySprite.addAnimation("blink", blink);
  bunnySprite.addAnimation("eating", eating);
  bunnySprite.addAnimation("sad", sad);

  bunnySprite.changeAnimation("blink");

  buttonImage = createImg("./preload/cut_button.png");
  buttonImage.position(20,30);
  buttonImage.size(30,30);
  buttonImage.mouseClicked(cortar);

  buttonImage2 = createImg("./preload/cut_button.png");
  buttonImage2.position(330,35);
  buttonImage2.size(30,30);
  buttonImage2.mouseClicked(cortar2);

  buttonImage3 = createImg("./preload/cut_button.png");
  buttonImage3.position(360,200);
  buttonImage3.size(30,30);
  buttonImage3.mouseClicked(cortar3);
  /*soprador = createImg("./preload/balloon.png");
  soprador.position(10,250);
  soprador.size(150,100);
  soprador.mouseClicked(ballon);*/

  MuteImg = createImg("./preload/mute.png");
  MuteImg.position(430,20);
  MuteImg.size(50,50);
  MuteImg.mouseClicked(Mute);
 
  floor = new Floor(200,canH,600,20);
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,15);
  World.add(world,fruit);
  stick = new Connect(rope,fruit);
  stick1 = new Connect(rope2,fruit);
  stick2 = new Connect(rope3,fruit);

  blink.frameDelay = 30;
  eating.frameDelay = 20;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImage, width/2, height/2, displayWidth+80, displayHeight);
  Engine.update(engine);

  if(fruit !== null){
    image(fruitImage,fruit.position.x, fruit.position.y, 65,65);
  }
 
  floor.show();
  rope.show();
  rope2.show();
  rope3.show();

  if(collision(fruit,bunnySprite) === true){
    bunnySprite.changeAnimation("eating");
    guloso.play();
  }
  if(fruit !== null && fruit.position.y >= 650){
    bunnySprite.changeAnimation("sad");
    fruit = null;
    depre.play();
    backgroundSound.stop();
  }
  drawSprites();
}

function ballon(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
fu.play();

}

function Mute(){
  if(backgroundSound.isPlaying()){
    backgroundSound.stop();
  }else{
    backgroundSound.play();
  }
}

function cortar(){
  rope.break();
  stick.noConnect();
  stick = null;
  cutSound.play();
}

function cortar2(){
  rope2.break();
  stick1.noConnect();
  stick1 = null;
  cutSound.play();
}

function cortar3(){
  rope3.break();
  stick2.noConnect();
  stick2 = null;
  cutSound.play();
}

function collision(corpo_1,sprite_1){
  if(corpo_1 !== null){
    var meters = dist(corpo_1.position.x, corpo_1.position.y, sprite_1.position.x, sprite_1.position.y);
    if(meters <= 80 ){
      World.remove(world,fruit);
      fruit = null;
      return true; 
    } else{
      return false;
    }
  }
}
