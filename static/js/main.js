let canvas, 
		c, 
		invaders, 
		w, 
		h, 
		dt, 
		player, 
		lives,
		lastUpdate,
		wave;

let highScores;
canvas = document.createElement('canvas');
canvas.width = w = 240;
canvas.height = h = 240;
c = canvas.getContext('2d',{alpha: false});

// Initial function to create canvas and initialise elements
function init(){
	username = "Josh";
	lives = 5;
	wave = 1;
	dt = 0;
	lastUpdate = Date.now();
	canvas.style.border = "solid #33ff00";
	document.body.appendChild(canvas);
	invaders = new Genetics();
	invaders.createPopulation();
	player = new Player( w/8/4, h/4-4 );
	update();
}

// Ensure object speed doesn't change based on frame rate
function deltaTime(){
	let now = Date.now();
	dt = now - lastUpdate;
	lastUpdate = now;
}

// Function to check conditions to either end or continue the game
function update(){
	c.fillStyle = "black";
	c.fillRect(0,0,w,h);
	c.fillStyle = "white";
	c.font = "15px Belmongo";
	c.fillText("Wave: "+wave, 5, 10);
	c.fillText("Lives: "+lives, 5, 20);
	for(let i = 0; i < invaders.population.length; i++){
		invaders.population[i].show();
	}
	player.show();
	let allDead = true;
	for(let i = 0; i < invaders.population.length; i++){
		if( invaders.population[i].isAlive ){
			allDead = false;
			break;
		}
	}
	if(allDead){
		invaders.createPopulation();
		wave++;
	}
	if(lives == 0){
		gameOver();
		return;
	}
	deltaTime();
	requestAnimationFrame(update);
}

// Start of game display
function landing(){
	canvas.style.border = "solid white";
	document.body.appendChild(canvas);
	c.fillStyle = "#33ff00";
	c.fillRect(0,0,w,h);
	c.fillStyle = "white";
	let txt1 = "SPACE INVADERS";
	c.font = "26px Belmongo";
	c.fillText(txt1, (w-c.measureText(txt1).width)/2, h/3);
	let txt2 = ("Press ENTER to Start");
	c.fillText(txt2, (w-c.measureText(txt2).width)/2, h/1.5);
}

// End of game display
function gameOver(){
	c.fillStyle = "#33ff00";
	c.fillRect(0,0,w,h);
	c.fillStyle = "white";
	let txt1 = "Game Over!";
	c.font = "38px Belmongo";
	c.fillText(txt1, (w-c.measureText(txt1).width)/2, h/3);
	let txt3 = "Press ENTER to play again...";
	c.font = "15px Belmongo";
	c.fillText(txt3, (w-c.measureText(txt3).width)/2, h/1.5);
	let txt2 = ("Wave "+wave);
	c.font = "30px DOKYO";
	c.fillText(txt2, (w-c.measureText(txt2).width)/2, h/2);

	saveScore();
}

// Display scores in HTML
function showHighScores() {
	const highScores = JSON.parse(localStorage.getItem(highScores)) || [];
	const highScoreList = document.getElementById(highScores);
  
	highScoreList.innerHTML = highScores.map((wave) =>`<li>${name} - ${wave}</li>`).join('');
}

// Save user scores to session storage
function saveScore() {
	const name = prompt('You got a new score! Enter name:');
	sessionStorage.setItem(wave, name);
};

// Event handlers to control the flow of the game
function addEvents(){
	document.addEventListener("keydown", function(e){
		switch(e.keyCode){
			case 13:
					init();
				break;
			case 32:
					player.shoot();
				break;
			case 37:
					player.isMovingLeft = true;
				break;
			case 39:
					player.isMovingRight = true;
				break;
			case 8:
					landing();
				break;
		}
	});

	// When no buttons are pressed, nothing occurs
	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			case 37:
					player.isMovingLeft = false;
				break;
			case 39:
					player.isMovingRight = false;
				break;
		}
	});

	/*  To make sure the game doesn't go
		on if the browser isn't active   */
	window.addEventListener("focus",function(){
		lastUpdate = Date.now();
	});

	// window.addEventListener('load', function(e) {
	// 	window.applicationCache.addEventListener('updateready', function(e) {
	// 	  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	// 			window.applicationCache.swapCache();
	// 			window.location.reload();
	// 	  }
	// 	}, false);
	// }, false);
}

// Initialise the game
addEvents();
landing();
