/**
 * Светофор
 *
 * @param {Object} config
 * @constructor
 */

var config = Object.create(null);

var config = {
    red: 40,
    yellow: 5,
    green: 45,
    get time() {
        return this.red + this.yellow + this.green;
    },
    set time(time) {
        if (time < this.red + this.yellow) {
            throw new Error('Bad value');
        }
            
        this.green = time - this.red - this.yellow;
    }
};

function Lights(config) {
    // Публичные поля
    this.state = null;
            
    // Приватныt поля
    this._timeout = null;
    this._config = config;

    /**
	 * Переключение в зеленый
	 */
	Lights.prototype.toGreen = function () {
		console.log("Change to green");
	    if (this._timeout) {
	        clearTimeout(this._timeout);
	    }
	            
	    this.state = 'green';
	    this._timeout = setTimeout(function () {
	        this.toYellow();
	    }.bind(this), this._config.green * 1000)
	};
	/**
	 * Переключение в желтый
	 */
	Lights.prototype.toYellow = function () {
		console.log("Change to yellow");
	    if (this._timeout) {
	        clearTimeout(this._timeout);
	    }
	            
	    this.state = 'yellow';
	    this._timeout = setTimeout(function () {
	        this.toRed();
	    }.bind(this), this._config.yellow * 1000)
	};
	/**
	 * Переключение в красный
	 */
	Lights.prototype.toRed = function () {
		console.log("Change to red");
	    if (this._timeout) {
	        clearTimeout(this._timeout);
	    }
	            
	    this.state = 'red';
	    this._timeout = setTimeout(function () {
	        this.toGreen();
	    }.bind(this), this._config.red * 1000)
	};
	
}

var lights = new Lights(config);
lights.toYellow();
            
setInterval(function () {
    console.log(lights.state);
}, 500);

