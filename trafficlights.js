function EventEmitter() {
    this.listeners = {};

    EventEmitter.prototype.addListener = function (event, listener) {
        if (this.listeners[event] === undefined) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    };
	
    EventEmitter.prototype.removeListener = function (event, listener) {
        if (this.listeners[event] !== undefined) {
            for (var i = 0; i < this.listeners[event].length; i++) {
                if (this.listeners[event][i] === listener)
                    this.listeners[event].splice(i,1);
            }
        }
    };
    
    EventEmitter.prototype.emit = function (event, data) {
        if (this.listeners[event] !== undefined) {
            for (var i = 0; i < this.listeners[event].length; i++) {
                this.listeners[event][i](data);
			}
		}
	}
    
}
        

function TrafficLight(redTime, yellowTime, greenTime) {    
    this.__timer = null;
    this.__state = null;
    this.__redTime = redTime;
    this.__yellowTime = yellowTime;
    this.__greenTime = greenTime;

    this.__setnewtimer = function (delay, func) {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
        this.__timer = setTimeout(func, delay);
    };

    TrafficLight.prototype.toRed = function () {
        this.__state = 'red';
        this.__setnewtimer(this.__redTime, function () {
            this.toGreen();
        }.bind(this));
    };

    TrafficLight.prototype.toGreen = function () {
        this.__state = 'green';
        this.__setnewtimer(this.__greenTime, function () {
            this.toYellow();
        }.bind(this));
    };

    TrafficLight.prototype.toYellow = function () {
        this.__state = 'yellow';
        this.__setnewtimer(this.__yellowTime, function () {
            this.toRed();
        }.bind(this));
    };
	
	TrafficLight.prototype.tramcallback = function (data) {
		console.log('TRAM');
	};
	
	TrafficLight.prototype.tramsubscribe = function (event) {
		event.addListener('tram', this.tramcallback);
	};

    TrafficLight.prototype.state = function () {
        return this.__state;
    };

    this.toGreen();
}

changeDOM = function () {
    document.getElementById('colorParagraph').innerHTML = tl.state();
};

var tl = new TrafficLight(5000, 5000, 5000);
var event = new EventEmitter();
tl.tramsubscribe(event);