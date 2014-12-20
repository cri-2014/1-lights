/**
*  Отрисовка светофора
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
	ctx.fillStyle = 'red';
	ctx.fillRect(20, 20, 90, 90);
	ctx.fillStyle = 'white';
	ctx.fillRect(20, 130, 90, 90);
}
function colorYellow(){
	ctx.fillStyle = 'yellow';
	ctx.fillRect(20, 130, 90, 90);
	ctx.fillStyle = 'white';
	ctx.fillRect(20, 240, 90, 90);
}
function colorGreen(){
	ctx.fillStyle = 'green';
	ctx.fillRect(20, 240, 90, 90);
	ctx.fillStyle = 'white';
	ctx.fillRect(20, 20, 90, 90);
}


/**
*	Event Emitter
*/





/**
 * Светофор
 *
 * @param {Object} config
 * @constructor
 */
var config = Object.create(null);

var config = {
    red: 10,
    yellow: 3,
    green: 15,
    tramGreen: 10,
    tramWaiting: 3
};

function Lights(config) {
    
    this.state = null;

    this._timeout = null;
    this._config = config;
}

/**
* Переключение в зеленый
*/
Lights.prototype.toGreen = function () {
	console.log("Change to green");
	            
   	this.state = 'green';
	colorGreen();

	this._timeout = setTimeout(function () {
	    this.toYellow();
	}.bind(this), this._config.green * 1000)
};

/**
* Переключение в желтый
*/
Lights.prototype.toYellow = function () {
	console.log("Change to yellow");
	            
    this.state = 'yellow';
    colorYellow();

    this._timeout = setTimeout(function () {
        this.toRed();
    }.bind(this), this._config.yellow * 1000)
};

/**
 * Переключение в красный
 */
Lights.prototype.toRed = function () {
	console.log("Change to red");
	            
    this.state = 'red';
    colorRed(); 

    this._timeout = setTimeout(function () {
        this.toGreen();
    }.bind(this), this._config.red * 1000)
};

/**
*  Состояние светофора
*/	
Lights.prototype.state = function () {
	console.log(this.state);
}

var lights = new Lights(config);
lights.toRed();

 
setInterval(function () {
    console.log(lights.state);
}, 500);
         