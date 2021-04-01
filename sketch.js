var dog, happyDog;
var database;
var foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObject; 

function preload()
{
	doggie1 = loadImage("images/dogImg.png");
  doggieHappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(700,700);

  database = firebase.database();
  console.log(database);

  doggie = createSprite(250,250,1,1);
  doggie.addImage(doggie1)
  doggie.scale = 0.2

  foodObject = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feedPet = createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
}


function draw() {  

  background(46, 139, 87);

  foodObject.display();

  drawSprites();

  textSize(15);
  stroke("black");
  fill("cyan");
  text("Food Remaining:" + foodS, 250,480);

  fedTime = database.ref("Feedtime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  if(lastFed>12){
    text("Last fed:" + lastFed%12 + "PM", 350,30);
  }

  else if(lastFed ==0){
    text("Last fed: 12 AM" ,350,30);
  }

  else{
    text("Last fed:" + lastFed + "AM", 350,30);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

function feedDog(){

  doggie.addImage(doggieHappy)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodObject.getFoodStock(),
     FeedTime:hour ()
   })
  }

  function addFoods(){
    foodS++
    database.ref('/').update({
      Food:foodS
    })
  }

