/***** M00895648 || CST2120 Coursework 2 *****/

class Invader{
	constructor(x,y,shape,speed){
		this.x = x || 0;
		this.y = y || 0;
		this.xDir = 1;
		this.s = 4;
		this.i = 0;
		this.speed = speed != undefined ? speed : 0.008;
		this.frame = 0;
		this.dir = (Math.random() < 0.5 ? -1 : 1);
		this.maxFrame = Math.floor(Math.random() * 32) + 16;
		this.shape = shape || [0,1,1,0,0,1,1,0,1,1,1,1,0,1,1,0];
		this.isAlive = true;
	}
	
	update(){
		if( this.y >= h>>2 ){
			lives--;
			this.isAlive = false;
			return;
		}

		// Random horizontal starting point
		if(!this.shape[this.i] ){
			let value =  this.dir * this.speed * dt
			if( this.x + value > 0 && (this.x + value) * this.s < w - this.s * this.s ){
				this.x += value;
			}
		}
		
		// Vertical movement
		this.y += this.speed * dt;
		
		if( this.frame == this.maxFrame){
			this.dir = -this.dir;
			this.frame = 0;
			this.maxFrame = Math.floor( Math.random() * 32 ) + 16;
			this.i = ++this.i % this.shape.length;
		}
		
		// Randomised horizontal movement
		this.frame++;


		// Destroy alien if shot
		if( Math.sqrt((player.missile.y - this.y)**2 + (player.missile.x - (this.x+2))**2) < 2.5){
			let x = player.missile.x;
			let y = player.missile.y;
			let area = c.getImageData((x * this.s), y * this.s, player.missile.s+1, player.missile.s);
			for(let i = 0; i < area.data.length; i++){
				if( area.data[i] ){
					this.isAlive = false;
					player.missile = {};
					player.isShooting = false;
					break;
				}
			}
		}
	}
	
	// Display invaders and user
	show(){
		if(this.isAlive){
			c.fillStyle = "white";
			for(let i = 0; i < this.shape.length; i++){
					if(this.shape[i]){	
						c.fillRect( (this.x+i%4)*this.s, (this.y+(i>>2))*this.s, this.s, this.s);
					}
			}
			this.update();
		}
	}
}

class Genetics{
	constructor(){
		this.population = [];
		this.populationSize = 10;
		this.populationFeaturesSize = 16;
	}

	createPopulation(){
		this.population = [];
		for(let i = 0; i < this.populationSize; i++){
			let shape = [];
			for(let j = 0; j < this.populationFeaturesSize; j++){
				shape.push(Math.random() < 0.5 ? 1 : 0);
			}
			this.population.push(new Invader(w/4/2, Math.random()*-20, shape));
		}
	}
}