/**
*  Draw traffic light
*/
var canvas  = document.getElementById("test");
var ctx     = canvas.getContext('2d');
ctx.strokeStyle = 'red';
ctx.strokeRect(15, 15, 100, 100);
ctx.strokeStyle = 'yellow'; 
ctx.strokeRect(15, 125, 100, 100);
ctx.strokeStyle = 'green';
ctx.strokeRect(15, 235, 100, 100);

function colorRed(){
	clearColor();
	ctx.fillStyle = 'red';
	ctx.fillRect(20, 20, 90, 90);
}
function colorYellow(){
	clearColor();
	ctx.fillStyle = 'yellow';
	ctx.fillRect(20, 130, 90, 90);

}
function colorGreen(){
	clearColor();
	ctx.fillStyle = 'green';
	ctx.fillRect(20, 240, 90, 90);
	
}
function clearColor(){
	ctx.fillStyle = 'white';
	ctx.fillRect(20, 20, 90, 90);
	ctx.fillRect(20, 130, 90, 90);
	ctx.fillRect(20, 240, 90, 90);
}


/**
*	Event Emitter
*/
function EventEmitter(){
	this._eventListener = {};

	/**
	*  Add event
	*/
	EventEmitter.prototype.addListener = function(eventName,listener){
		if(this._eventListener[eventName] === undefined){
			this._eventListener[eventName] = [];
		}
		this._eventListener[eventName].push(listener);
	}
	/**
	*  Delete event
	*/
	EventEmitter.prototype.deleteListener = function(eventName,listener){
		if(this._eventListener[eventName] !== undefined){
			for(var i = 0; i < this._eventListener[eventName].length; i++){
				if(this._eventListener[eventName][i] === listener)
					this._eventListener[eventName].splice(i,1);
			}
		}
	}

	EventEmitter.prototype.returnListener = function(eventName, position, data){
		return function() {
			this._eventListener[eventName][position](data);
		}.bind(this);
	}

	EventEmitter.prototype.emit = function (eventName,data) {
	    if (this._eventListener[eventName] !== undefined) {
	    	for (var i = 0; i < this._eventListener[eventName].length; i++) {
	            setTimeout(this.returnListener(eventName, i, data), 0);
	        }
	    }
	}
}




/**
 * Traffic light
 */
var config = Object.create(null);

var config = {
    red: 10,
    yellow: 3,
    green: 10,
};

function Lights(config) {
    
    this._state = null;
    this._timeout = null;
    this._config = config;

    this._tramMode = null;
    this._tramState = null;
	this._tramWating = 3;
	this._tramGreen = 10;    

	/**
	*  To Green
	*/
	Lights.prototype.toGreen = function () {
		console.log("Change to green");
		
		this._state = 'green';
		colorGreen();

		this._timeout = setTimeout(function () {
		    this.toYellow();
		}.bind(this), this._config.green * 1000)
	};

	/**
	*  To Yellow
	*/
	Lights.prototype.toYellow = function () {
		console.log("Change to yellow");
		            
	    this._state = 'yellow';
	    colorYellow();

	    this._timeout = setTimeout(function () {
	        this.toRed();
	    }.bind(this), this._config.yellow * 1000)
	};

	/**
	 * To Red
	 */
	Lights.prototype.toRed = function () {
		console.log("Change to red");
		            
	    this._state = 'red';
	    colorRed(); 

	    this._timeout = setTimeout(function () {
	        this.toGreen();
	    }.bind(this), this._config.red * 1000)
	};

	/**
	*  Traffic light state
	*/	
	Lights.prototype.state = function () {
		console.log(this._state);
		return this._state;
	}

	/**
	*  Return old state traffic light
	*/
	Lights.prototype.tramBuyBuy = function(){
		console.log("Tram Buy Buy!");
		document.getElementById('textTram').innerHTML = "";
		this._tramMode = null;
		this._tramState = null;
		switch (this._state){
			case 'red': lights.toRed(); break;
			case 'yellow': lights.toYellow(); break;
			case 'green': lights.toGreen(); break;
		}
	}

	/**
	*  Tram is there
	*/
	Lights.prototype.tramToGreen = function(){
		this._tramMode = 'Tram is there';
		console.log(this._tramMode);
		document.getElementById('textTram').innerHTML = this._tramMode;
		
		this._tramState = 'green';
	//	colorGreen();
		var tmp = this._tramGreen - this._tramWating;
		this._timeout = setTimeout(function(){
				this.tramBuyBuy();
		}.bind(this), tmp * 2000)
	};

	/**
	*  Tram wating
	*/
	Lights.prototype.drivers = function(){
		if (!this._tramMode) {
			this._tramMode = 'Tram wating';
			console.log(this._tramMode);
			document.getElementById('textTram').innerHTML = this._tramMode;
			
			clearTimeout(this._timeout);
			colorGreen();
			this._timeout = setTimeout(function(){
					this.tramToGreen();
			}.bind(this),this._tramWating * 1000)	
		};	
	};

	/**
	*  Subscribe
	*/
	Lights.prototype.tramSubscribe = function(eventName){
		eventName.addListener('tram', function() {
			this.drivers();
		}.bind(this));
	}
}


/**
*  Start program 
*/
var lights = new Lights(config);
lights.toGreen();
ev = new EventEmitter();
lights.tramSubscribe(ev);
setInterval(function () {
    ev.emit('tram')
}, 11000);