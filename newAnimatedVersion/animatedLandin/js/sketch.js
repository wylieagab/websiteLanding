var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
var w, h;
var flying = 0;
var terrain = [];
var canvas;
var b;
//b = loadImage("img/header.jpg");

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	//createCanvas(600,600,WEBGL);
	b = loadImage("../img/landing");
	canvas = createCanvas(
		window.innerWidth,
		window.innerHeight, WEBGL
		); 
	frameRate(85);
	canvas.position(0,0);
	canvas.style('z-index', '1');

	//w = window.innerWidth;
	//h = window.innerHeight;
	
	cols = w / scl;
	rows = h / scl;

	for (var i = 0; i < cols; i++) {
		terrain[i] = [];
		for (var j = 0; j < rows; j++) {
			terrain[i][j] = 0;
		}
	}
}

function draw() {
	flying -= 0.1;
	var joff = flying;
	for (var j = 0; j < rows; j++) {
		var ioff = 0;
		for (var i = 0; i < cols; i++) {
			terrain[i][j] =map(noise(ioff,joff), 0, 1, -100, 100);
			ioff += 0.2;
		}
		joff += 0.2;
	}


	background(0);
	translate(0,50);
	rotateX(PI/3);
	//rotateZ(PI/3);
	noFill();
	stroke(100);
	//fill(200,200,200,50);
	translate(-w/2,-h/2);
	
	for (var j = 0; j < rows-1; j++) {
		beginShape(TRIANGLE_STRIP);
		for(var i = 0; i < cols; i++) {
			vertex(i*scl, j*scl, terrain[i][j]);
			vertex(i*scl, (j+1)*scl, terrain[i][j+1]);
			//rect(i*scl, j*scl, scl, scl);
		}
		endShape();
	}
}