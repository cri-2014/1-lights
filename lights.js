function svetophor(time_r, time_y, time_g){
	this.state = 'default';
	this.red_work = time_r;
	this.yellow_work = time_y;
	this.green_work = time_g;
	this.toRed = function(){
		this.state = 'Red';
		//console.log("now is " + this.state);
		setTimeout(function() {this.toYellow();}.bind(this), this.red_work);
	}
	this.toYellow = function(){
		this.state = 'Yellow';
		//console.log("now is " + this.state);
		setTimeout(function() {this.toGreen();}.bind(this), this.yellow_work);
	}
	this.toGreen = function(){
		this.state = 'Green';
		//console.log("now is " + this.state);
		setTimeout(function() {this.toRed();}.bind(this), this.green_work);
	}
	this.getState = function(){
		console.log(this.state);
	}
};


var light = new svetophor(5000, 3000, 5000);
light.toRed();
setInterval(function() {light.getState();}, 1000);
//setInterval(light.getState(), 1000);
