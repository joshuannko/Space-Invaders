class Player{
	// Construct player
	constructor(x,y,shape){
		this.x = x || 0;
		this.y = y || 0;
		this.xDir = 1;
		this.s = 4;
		this.shape = shape || [0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1];
		this.speed = 0.06; //
		this.isMovingLeft = false;
		this.isMovingRight = false;
		this.isShooting = false;
		this.missile = {x: this.x, y: this.y, s: 7};
	}
	
	// Player can shoot missiles
	shoot(){
	 if( !this.isShooting ){
	 	this.missile = {x: this.x+this.s/2, y: this.y, s: 3};
	 	this.isShooting = true;
	 }
	}
	
	// Player movement mechanics
	update(){
		if( this.x > 0 && this.isMovingLeft ){
			this.x -= this.speed * dt;
		}
		if( this.x < w/4-this.s && this.isMovingRight ){
			this.x += this.speed * dt;
		}

		if(this.isShooting){
			this.missile.y -= 0.12 * dt;
			if( this.missile.y < 0 ){
				this.isShooting = false;
				this.missile = {};
			}
		}
	}

	// Display player
	show(){
		c.fillStyle = "white";
		for(let i = 0; i < this.shape.length; i++){
				if(this.shape[i]){
					c.fillRect( (this.x+i%4)*this.s, (this.y+(i>>2))*this.s, this.s, this.s);
				}
		}
		if( this.isShooting ){
			c.fillRect( this.missile.x*this.s, this.missile.y*this.s, this.missile.s, this.missile.s);
		}
		this.update();
	}
}
