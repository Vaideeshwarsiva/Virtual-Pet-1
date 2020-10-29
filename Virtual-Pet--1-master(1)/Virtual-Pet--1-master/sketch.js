//Create variables here
var dog, dogImg, dogImg1;
var database;
var TheFood, foodStock, foodS;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(300,500,20,20);
  dog.addImage( dogImg);
  dog.scale = 0.3;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {    
  background(0);
  if(keyWentDown(UP_ARROW)) {
    if(foodS == 0){
      dog.addImage("dog2",dogImg1);
    }
    writeStock(foodS);
    //dog.addImage(dogImg1)
  }

 
  drawSprites();

  text("Food Remaining: " + foodS, 200,200);
  text("Press Up Arrow To Feed The Dog.", 400,400);
  //add styles here

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0) {
    x = 0;
   // dog.addImage("dog2",dogImg1);
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    food: x
  })
}



