/*
	The Game Project Part 4 - Character Interaction
*/


var gameChar_x;
var gameChar_y;

var floorPos_y;

var trees_x;
var treePos_y;

var cloud;
var mountain;

var canyon;
var canoyons;
var collectable;

var cameraPosX = 0;
var gameScore;
var snow=[];


//interaction variables
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var GameOver = false;
var LevelComplete = false;

function setup()
{
	createCanvas(1024, 576);

	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y - 1;
	gameScore = 0;


	trees_x = [-50,600,1000,1600];
	treePos_y = -40;


	cloud = [
		{x_pos:-1500,y_pos:1},
		{x_pos:-1000,y_pos:1},
		{x_pos:-500,y_pos:1},
		{x_pos:40,y_pos:1},
		{x_pos:2000,y_pos:1},
		{x_pos:1500,y_pos:1}
	]

	cloud.size = -90;

	mountain = [
		{x_pos:-1200, y_pos:49, size:0},
		{x_pos:-700, y_pos:49, size:0},
		{x_pos:-50, y_pos:49, size:0},
		{x_pos:1350, y_pos:49, size:0},
		{x_pos:700, y_pos:49, size:0}
	]


	canyon = [
		{x_pos:200, width:150},
		{x_pos:900, width:150},
		{x_pos:1600,width:150},
		{x_pos:2300,width:150}
	]
	floor=[
		{x_pos:500, floorPos_y},
		{x_pos:1000, floorPos_y},
		{x_pos:1500, floorPos_y},
		{x_pos:2500, floorPos_y},
		{x_pos:2000, floorPos_y},
		{x_pos:-150, floorPos_y},
		{x_pos:-1000, floorPos_y},
		{x_pos:-1500, floorPos_y}
	]

	collectable=[
		{x_pos:800, y_pos:floorPos_y-20,size:50,isFound:false},
		{x_pos:600, y_pos:floorPos_y-20,size:50,isFound:false},
		{x_pos:700, y_pos:floorPos_y-20,size:50,isFound:false},
		{x_pos:1500,y_pos:floorPos_y-20,size:50,isFound:false},
		{x_pos:2550, y_pos:floorPos_y-20,size:50,isFound:false}

	]

	flagpole= {
		x_pos:2600,
		y_pos:floorPos_y-110,
		isReached:false
	}

	  // Initialize snowflakes

	  for (var i = 0; i < 1069; i++) {
		snow.push({
		  x: random(width + 3000),
		  y: random(height),
		  radius: random(2, 6),
		  speed: random(1, 3)
		});
	  }
	


}


function draw()
{


///////////////////////////////////////DRAWING CODE//////////////////////////////////////

  let color1 = color(0);  // Red
  let color2 = color(3, 81, 158);  // Blue

  setGradient(0, 0, width, height, color1, color2);

///////////////////GAME SCORE TEXT//////////////
fill(255,0,0);
textSize(30);
text("Score: " + gameScore, 20, 116);

/////////////GAME OVER///////////////
if ( gameChar_y > 576){
	GameOver = true;
if(GameOver){
	fill(255,0,0);
	textSize(60);
	text("Game Over", 300,200);
	}
}

if(LevelComplete){
	fill(255,0,255);
	textSize(60);
	text("Level Complete :D", 515, 238);

}

cameraPosX = gameChar_x-width/2;
push();
translate(-cameraPosX, 0);


///////////////////////////FLOOOOOOOR////////////////////////////
for(var i = 0; i <floor.length; i++){
	noStroke();
	fill(209, 209, 209);
	rect(floor[i].x_pos, floorPos_y, width, height - floorPos_y); //draw some green ground
	fill(255);
	rect(floor[i].x_pos, floorPos_y, width, height/4 - floorPos_y/4);
	}

  noStroke();
  fill(255);

  for (var i = 0; i < snow.length; i++) {
  ellipse(snow[i].x, snow[i].y, snow[i].radius * 2);
    
    snow[i].y += snow[i].speed;

	if (snow[i].y > height) {
      snow[i].y = 0;
    }
  }

  for (var i = 0; i < snow.length; i++) {
	ellipse(snow[i].x*-1, snow[i].y, snow[i].radius * 2);
	  snow[i].y += snow[i].speed;
	  
	  if (snow[i].y > height) {
		snow[i].y = 0;
	  }
	}


//////////////////////////////////CLOUDS///////////////////////////////////

  for(var i = 0; i < cloud.length; i++){
	fill(255, 255, 255);
	ellipse(cloud[i].x_pos+90, cloud[i].y_pos+50, cloud.size+400,cloud.size+ 50);
	ellipse(cloud[i].x_pos+2000, cloud[i].y_pos+0, cloud.size+2000,cloud.size+ 60);
	ellipse(cloud[i].x_pos+400, cloud[i].y_pos+50,cloud.size+400, cloud.size+50);
	ellipse(cloud[i].x_pos+750, cloud[i].y_pos+50, cloud.size+500, cloud.size+50);
	ellipse(cloud[i].x_pos+500, cloud[i].y_pos+20, cloud.size+530, cloud.size+50);
	ellipse(cloud[i].x_pos+300, cloud[i].y_pos+30, cloud.size+500, cloud.size+50);
	ellipse(cloud[i].x_pos+100, cloud[i].y_pos+30, cloud.size+500, cloud.size+50);
	ellipse(cloud[i].x_pos+1300, cloud[i].y_pos+30, cloud.size+500, cloud.size+50);
}


///////////////////////////FLOOOOOOOR////////////////////////////
for(var i = 0; i <floor.length; i++){
	noStroke();
	fill(209, 209, 209);
	rect(floor[i].x_pos, floorPos_y, width, height - floorPos_y); //draw some green ground
	fill(255);
	rect(floor[i].x_pos, floorPos_y, width, height/4 - floorPos_y/4);
	}

//////////////////////////MOUNTAIN////////////////////////////////////////////
for( var i = 0; i < mountain.length; i++){

	fill(156, 156, 156);
	triangle(mountain[i].x_pos+423, mountain[i].y_pos+383, mountain[i].x_pos+580,mountain[i].y_pos+90,mountain[i].x_pos+731,mountain[i].y_pos+383);
	// ellipse(mountain[i].x_pos+580,mountain[i].y_pos+432, mountain[i].size+200,mountain[i].size+564);
	fill(255, 255, 255);
	triangle(mountain[i].x_pos+637,mountain[i].y_pos+200, mountain[i].x_pos+580,mountain[i].y_pos+90,mountain[i].x_pos+521,mountain[i].y_pos+200);
	
}


for (var i =0; i< canyon.length; i++){
	noStroke();
	fill(92, 40, 0);
	rect(canyon[i].x_pos, floorPos_y, canyon[i].width, height -floorPos_y);
}


/////////////////////////////////////TREE///////////////////////////////////
for( var i = 0; i< trees_x.length; i++){
	fill(130, 90, 9);
	rect(trees_x[i]+150,treePos_y+312, 10, 160);
	fill(139, 199, 139);
	rect(trees_x[i]+150,treePos_y+300, 50, 50);
	fill(72, 199, 0);
	rect(trees_x[i]+100,treePos_y+300, 50, 50);
	fill(63, 117, 32);
	rect(trees_x[i]+100,treePos_y+350, 50, 50);
	fill(73, 184, 9);
	rect(trees_x[i]+150,treePos_y+350, 50, 50);
	fill(255, 25, 0);
	rect(trees_x[i]+ 105,treePos_y+400, 10, 10, 100);
}

///////////////////////////////////////////COLLECTABLE///////////////////////////////

for( var i = 0; i < collectable.length; i++){

	if(collectable[i].isFound == false){
	fill(255, 255, 0);
	noStroke();
	rect(collectable[i].x_pos,collectable[i].y_pos, collectable[i].size-40, collectable[i].size-40);
	triangle(collectable[i].x_pos+5, collectable[i].y_pos-10, collectable[i].x_pos, collectable[i].y_pos, collectable[i].x_pos+10,collectable[i].y_pos);
	triangle(collectable[i].x_pos+10,collectable[i].y_pos, collectable[i].x_pos+20, collectable[i].y_pos+5, collectable[i].x_pos+10,collectable[i].y_pos+10);
	triangle(collectable[i].x_pos+5, collectable[i].y_pos+20, collectable[i].x_pos,  collectable[i].y_pos+10,collectable[i].x_pos+10, collectable[i].y_pos+10);
	triangle(collectable[i].x_pos-10, collectable[i].y_pos+5, collectable[i].x_pos, collectable[i].y_pos, collectable[i].x_pos, collectable[i].y_pos+10);
    

	if(dist(gameChar_x, gameChar_y, collectable[i].x_pos, collectable[i].y_pos) < 21 ){
		collectable[i].isFound =true;
		}

	if(collectable[i].isFound == true){
		gameScore+=1;
		console.log(gameScore);
		}
	}

}




if(flagpole.isReached == false){
	///pole//
	fill(50, 50, 50);
	rect(flagpole.x_pos, flagpole.y_pos-190, 8, 300);
	////flag
	fill(255, 0, 0);
	triangle(flagpole.x_pos,flagpole.y_pos-70,flagpole.x_pos-161, flagpole.y_pos-70, flagpole.x_pos,flagpole.y_pos+23);
	//attempt at drawing a skull onto the poll
	fill(255);
	// Draw the top circle part of the skull.
	ellipse(flagpole.x_pos-37, flagpole.y_pos-46, 50, 40);
	// Draw the bottom rectangle part of the skull.
	rect(flagpole.x_pos-52, flagpole.y_pos-34, 30, 20);
	// Change the fill color to black.
	fill(0);
	// Draw the eyes.
	ellipse(flagpole.x_pos-25, flagpole.y_pos-50, 8, 8);
	ellipse(flagpole.x_pos-50, flagpole.y_pos-50, 8, 8);
	// Draw the teeth lines.
	rect(flagpole.x_pos-48, flagpole.y_pos-32, 3, 15);
	rect(flagpole.x_pos-39, flagpole.y_pos-32, 3, 15);
	rect(flagpole.x_pos-29, flagpole.y_pos-32, 3, 15);
}
  
else if (flagpole.isReached == true){
	///pole//
	fill(50, 50, 50);
	rect(flagpole.x_pos, flagpole.y_pos-190, 8, 300);
	////flag
	fill(0, 255, 0);
	triangle(flagpole.x_pos,flagpole.y_pos-190,flagpole.x_pos-161, flagpole.y_pos-190, flagpole.x_pos,flagpole.y_pos-70);
	//attempt at drawing a skull onto the poll
	fill(255);
	// Draw the top circle part of the skull.
	ellipse(flagpole.x_pos-37, flagpole.y_pos-157, 50, 40);
	// Draw the bottom rectangle part of the skull.
	rect(flagpole.x_pos-52, flagpole.y_pos-141, 30, 20);
	// Change the fill color to black.
	fill(0);
	// Draw the eyes.
	ellipse(flagpole.x_pos-25, flagpole.y_pos-160, 8, 8);
	ellipse(flagpole.x_pos-50, flagpole.y_pos-160, 8, 8);
	// Draw the teeth lines.
	rect(flagpole.x_pos-48, flagpole.y_pos-140, 3, 15);
	rect(flagpole.x_pos-39, flagpole.y_pos-140, 3, 15);
	rect(flagpole.x_pos-29, flagpole.y_pos-140, 3, 15);

	LevelComplete = true;
}
  




  /////////////////GAME CHARACTER//////////////////////////
if(isLeft && isFalling){

	// add your jumping-left code
	//hat
	fill(0,0,0)
	rect(gameChar_x-3, gameChar_y-77,6,7)
	rect(gameChar_x-5, gameChar_y-71, 10,2)
	//head
	fill(130,103,124);
	rect(gameChar_x-7,gameChar_y-69,14,12);

	//eye
	fill(255,255,255);
	ellipse(gameChar_x-1,gameChar_y-64,7,7);
	fill(0,0,0);
	ellipse(gameChar_x-1,gameChar_y-64,2,2);
	//torso
	fill(0,0,0);
	rect(gameChar_x-12,gameChar_y-57,25,25);
	fill(255,0,0);
	triangle(gameChar_x-5,gameChar_y-57,gameChar_x,gameChar_y-53,gameChar_x+5,gameChar_y-57);
	triangle(gameChar_x,gameChar_y-53,gameChar_x+5,gameChar_y-41,gameChar_x-5,gameChar_y-41);
	triangle(gameChar_x,gameChar_y-37,gameChar_x-5,gameChar_y-41,gameChar_x+5,gameChar_y-41);
	//right arm
	fill(0,0,0)
	beginShape();
	vertex(gameChar_x+13,gameChar_y-57);
	vertex(gameChar_x+19,gameChar_y-73);
	vertex(gameChar_x+22,gameChar_y-71);
	vertex(gameChar_x+13,gameChar_y-41);
	endShape(CLOSE);
	//left arm
	beginShape();

	vertex(gameChar_x-12,gameChar_y-57);
	vertex(gameChar_x-18,gameChar_y-73);
	vertex(gameChar_x-22,gameChar_y-71);
	vertex(gameChar_x-12,gameChar_y-41);

	endShape(CLOSE);

	//left leg
	fill(130,103,124);

	rect(gameChar_x-20,gameChar_y-32,17,6)
	rect(gameChar_x-20,gameChar_y-26,7,15)

	//right leg
	rect(gameChar_x+5,gameChar_y-32,17,6);
	rect(gameChar_x+17,gameChar_y-47,5,17)

	}
else if(isRight && isFalling){
	// add your jumping-right code
	//hat
	fill(0,0,0);
	rect(gameChar_x -3, gameChar_y-77,6,7);
	rect(gameChar_x -5, gameChar_y-71, 10,2);
	//head
	fill(130,103,124);
	rect(gameChar_x -7 ,gameChar_y-69,14,12);
	//eye
	fill(255,255,255);
	ellipse(gameChar_x-1,gameChar_y-64,7,7);
	fill(0,0,0);
	ellipse(gameChar_x-1,gameChar_y-64,2,2);
	//torso
	fill(0,0,0);
	rect(gameChar_x-12,gameChar_y-57,25,25);
	fill(255,0,0);
	triangle(gameChar_x-5,gameChar_y-57,gameChar_x,gameChar_y-53,gameChar_x+5,gameChar_y-57);
	triangle(gameChar_x,gameChar_y-53,gameChar_x+5,gameChar_y-41,gameChar_x-5,gameChar_y-41);
	triangle(gameChar_x,gameChar_y-37,gameChar_x-5,gameChar_y-41,gameChar_x+5,gameChar_y-41);

	//right arm
	fill(0,0,0);
	beginShape();
	vertex(gameChar_x+13,gameChar_y-57);
	vertex(gameChar_x+19,gameChar_y-73);
	vertex(gameChar_x+22,gameChar_y-71);
	vertex(gameChar_x+13,gameChar_y-41);
	endShape(CLOSE);
	//left arm
	beginShape();
	vertex(gameChar_x-12,gameChar_y-57);
	vertex(gameChar_x-18,gameChar_y-73);
	vertex(gameChar_x-22,gameChar_y-71);
	vertex(gameChar_x-12,gameChar_y-41);
	endShape(CLOSE);


	//left leg
	fill(130,103,124);
	rect(gameChar_x-19,gameChar_y-32,20,6);
	rect(gameChar_x-23,gameChar_y-42,6,16);

	//right leg
	rect(gameChar_x+3, gameChar_y-32,16,6);
	rect(gameChar_x+17, gameChar_y-32,6,16);

}
	else if(isLeft && floorPos_y > gameChar_y){
	// add your walking left code
	//hat
	fill(0,0,0);
	rect(gameChar_x-5,gameChar_y-71,10,2);
	rect(gameChar_x-3,gameChar_y-77,6,7);
	//head
	fill(130,103,124);
	rect(gameChar_x-4, gameChar_y-69,8,12)
	//eye
	fill(255,255,255);
	ellipse(gameChar_x,gameChar_y+-63,6,6);
	fill(0,0,0);
	ellipse(gameChar_x,gameChar_y-63,2,2);
	//torso
	rect(gameChar_x-6, gameChar_y-57,12,25);
	//left arm
	fill(130,103,124);
	rect(gameChar_x-14, gameChar_y-52,17,4)
	rect(gameChar_x-18, gameChar_y-60,4,12)
	//right arm
	rect(gameChar_x+12, gameChar_y-52,4,12)
	rect(gameChar_x+6, gameChar_y-52,10,4)
	//left leg
	beginShape()
	vertex(gameChar_x-6,gameChar_y-32);///top
	vertex(gameChar_x-13, gameChar_y-22);
	vertex(gameChar_x-11, gameChar_y+1);
	vertex(gameChar_x-6, gameChar_y+1);
	vertex(gameChar_x-7, gameChar_y-22);
	vertex(gameChar_x-1, gameChar_y-32);//top
	endShape(CLOSE)
	//right leg
	beginShape()
	vertex(gameChar_x+2,gameChar_y-32);
	vertex(gameChar_x-5, gameChar_y-22);
	vertex(gameChar_x, gameChar_y+1);
	vertex(gameChar_x+6, gameChar_y+1);
	vertex(gameChar_x+1, gameChar_y-22);
	vertex(gameChar_x+6, gameChar_y-32);
	endShape(CLOSE)

}

else if(isRight && floorPos_y > gameChar_y){
	// add your walking right code
	//hat
	fill(0,0,0);
	rect(gameChar_x-5,gameChar_y-71,10,2);
	rect(gameChar_x-3,gameChar_y-77,6,7);
	//head
	fill(130,103,124);
	rect(gameChar_x-4, gameChar_y-69,8,12)
	//eye
	fill(255,255,255);
	ellipse(gameChar_x,gameChar_y-63,6,6);
	fill(0,0,0);
	ellipse(gameChar_x,gameChar_y-63,2,2);
	//torso
	rect(gameChar_x-6, gameChar_y-57,12,25);
	//right arm
	fill(130,103,124);
	rect(gameChar_x+2, gameChar_y-52,17,4)
	rect(gameChar_x+16, gameChar_y-60,4,12)
	//left arm
	rect(gameChar_x-18,gameChar_y-52,12,4)
	rect(gameChar_x-18,gameChar_y-52,4,12)
	//right leg
	beginShape()
	vertex(gameChar_x+6,gameChar_y-32);
	vertex(gameChar_x+11, gameChar_y-22);
	vertex(gameChar_x+9, gameChar_y +1);
	vertex(gameChar_x+3, gameChar_y +1);
	vertex(gameChar_x+6, gameChar_y-22);
	vertex(gameChar_x+1, gameChar_y-32);
	endShape(CLOSE)
	//left leg
	beginShape()
	vertex(gameChar_x-6,gameChar_y-32);
	vertex(gameChar_x-4, gameChar_y-22);
	vertex(gameChar_x-10,gameChar_y+1);
	vertex(gameChar_x-4, gameChar_y+1);
	vertex(gameChar_x+1, gameChar_y-22);
	vertex(gameChar_x-1, gameChar_y-32);
	endShape(CLOSE)
}
else if(isFalling || floorPos_y < gameChar_y){
	// add your jumping facing forwards code
	// Hat
	fill(0, 0, 0);
	rect(gameChar_x - 5, gameChar_y - 71, 10, 2);
	rect(gameChar_x - 3, gameChar_y - 77, 6, 7);

	// Head
	fill(130, 103, 124);
	rect(gameChar_x - 7, gameChar_y - 69, 14, 12);


	// Eye
	fill(255, 255, 255);
	ellipse(gameChar_x - 1, gameChar_y - 64, 7, 7);
	fill(0, 0, 0);
	ellipse(gameChar_x - 1, gameChar_y - 64, 2, 2);

	// Torso
	fill(0, 0, 0);
	rect(gameChar_x - 13, gameChar_y - 57, 25, 25);
	fill(255, 0, 0);
	triangle(gameChar_x , gameChar_y - 53, gameChar_x - 5, gameChar_y - 57, gameChar_x + 5, gameChar_y - 57);
	triangle(gameChar_x , gameChar_y - 53, gameChar_x + 5, gameChar_y - 41, gameChar_x - 5, gameChar_y - 41);
	triangle(gameChar_x , gameChar_y - 37, gameChar_x + 5, gameChar_y - 41, gameChar_x - 5, gameChar_y - 41);

	//left arm/
	fill(0,0,0)
	beginShape();

	vertex(gameChar_x -12,gameChar_y-57);
	vertex(gameChar_x -18,gameChar_y-73);
	vertex(gameChar_x -22,gameChar_y-71);
	vertex(gameChar_x -12,gameChar_y-44);

	endShape(CLOSE);


	//right arm
	fill(0,0,0);
	beginShape();
	vertex(gameChar_x+12,gameChar_y-57);
	vertex(gameChar_x+19,gameChar_y-73);
	vertex(gameChar_x+22,gameChar_y-71);
	vertex(gameChar_x+12,gameChar_y-41);
	endShape(CLOSE);

	//right leg
	fill(130, 103, 124);
	rect(gameChar_x+2,gameChar_y-32,7,21);


	beginShape()

	vertex(gameChar_x+9,gameChar_y-21)
	vertex(gameChar_x+17,gameChar_y-27)
	vertex(gameChar_x+20,gameChar_y-24)
	vertex(gameChar_x+9,gameChar_y-11)


	endShape()

	//left leg
	rect(gameChar_x-8,gameChar_y-32,7,21);

	beginShape()

	vertex(gameChar_x-8,gameChar_y-11)
	vertex(gameChar_x-1,gameChar_y-21)
	vertex(gameChar_x-17,gameChar_y-27)
	vertex(gameChar_x-20,gameChar_y-24)

	endShape()
}
else
	{
	// add your standing front facing code
	//head
	fill(130, 103, 124);
	rect(gameChar_x - 7,gameChar_y-69,14,12);

	//hat
	fill(0,0,0);
	rect(gameChar_x-5,gameChar_y -71,10,2);
	rect(gameChar_x -3,gameChar_y -77,6,7);

	//eye
	fill(255,255,255);
	ellipse(gameChar_x-1,gameChar_y-64,7,7);
	fill(0,0,0);
	ellipse(gameChar_x-1,gameChar_y-64,2,2);

	// torso
	fill(0, 0, 0);
	rect(gameChar_x - 12, gameChar_y - 57, 25, 25);
	fill(255, 0, 0);
	triangle(gameChar_x - 5, gameChar_y - 57, gameChar_x, gameChar_y - 53, gameChar_x + 5, gameChar_y - 57);
	triangle(gameChar_x, gameChar_y - 53, gameChar_x + 5, gameChar_y - 41, gameChar_x - 5, gameChar_y - 41);
	triangle(gameChar_x, gameChar_y - 37, gameChar_x - 5, gameChar_y - 41, gameChar_x + 5, gameChar_y - 41);

	//arms
	fill(0,0,0);
	//right arm
	beginShape();
	vertex(gameChar_x + 13, gameChar_y - 57);
	vertex(gameChar_x + 22, gameChar_y - 37);
	vertex(gameChar_x + 17, gameChar_y - 35);
	vertex(gameChar_x + 13, gameChar_y - 44);
	endShape(CLOSE);


	//left arm
	beginShape();
	vertex(gameChar_x - 12, gameChar_y - 57);
	vertex(gameChar_x - 21, gameChar_y - 37);
	vertex(gameChar_x - 17, gameChar_y - 35);
	vertex(gameChar_x - 12, gameChar_y - 44);
	endShape(CLOSE);

	// legs
	// right leg
	fill(130, 103, 124);
	rect(gameChar_x - 8, gameChar_y - 32, 7, 33);
	// left leg
	rect(gameChar_x + 2, gameChar_y - 32, 7, 33);

}


pop();

	/////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	
	if(isLeft==true && floorPos_y > gameChar_y){
		gameChar_x-=3;
	}
	else if(isRight==true && floorPos_y > gameChar_y){
		gameChar_x+=3;
	}

	if(gameChar_y < floorPos_y-1 && isFalling==true){
		gameChar_y+=1;
		isFalling==true;
	}

    else{ 
	isFalling=false;
	}



	if(dist(gameChar_x, gameChar_y, flagpole.x_pos, flagpole.y_pos) < 21 ){
		flagpole.isReached = true;

	}

for(var i =0; i < canyon.length; i++){

	if(gameChar_x > canyon[i].x_pos && gameChar_x < canyon[i].x_pos+150 && isFalling == false){
		isPlummeting = true;
		console.log("in canyon");
	}
	else{
		isPlummeting = false;
	}


	
	if (isPlummeting == true){
		console.log("TRUTH");
		gameChar_y+=1;

	}


}




}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(key == "a" && LevelComplete == false){
		isLeft = true;
	}
	else if(key =="d" && LevelComplete == false){
		isRight = true;
	}
	else if(key == "w" && !isFalling && floorPos_y > gameChar_y && LevelComplete == false){
	 	gameChar_y-=100;
		isFalling=true;
	 }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);


	if(key == "a"){
		isLeft = false;
	}

	else if(key =="d"){
		isRight = false;
	}

}

function setGradient(x, y, w, h, c1, c2) {
	noFill();
  
	for (let i = y; i <= y + h; i++) {
	  let inter = map(i, y, y + h, 0, 1);
	  let c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(x, i, x + w, i);
	}
  }




