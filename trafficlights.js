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
	
	EventEmitter.prototype.__returnFunction = function (event, position, data) {
		return function () {
			this.listeners[event][position](data);
		}.bind(this);
	};
    
    EventEmitter.prototype.emit = function (event, data) {
        if (this.listeners[event] !== undefined) {
            for (var i = 0; i < this.listeners[event].length; i++) {
                setTimeout(this.__returnFunction(event, i, data), 0);
            }
        }
    };
    
}
        

function TrafficLight(redTime, yellowTime, greenTime) { 
    this.__trammode = null;
    this.__tramtimer = null;
    this.__timer = null;
    this.__tramstate = null;
    this.__state = null;
    this.__stateChangedTime = null;
    this.__redTime = redTime;
    this.__yellowTime = yellowTime;
    this.__greenTime = greenTime;
    this.__tramWaitTime = 3000;
    this.__tramGreenTime = 10000;
    this.__usefulCoefficient = 0.7;


    TrafficLight.prototype.__setnewtimer = function (delay, func) {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
        this.__stateChangedTime = new Date();
        this.__timer = setTimeout(func, delay);
    };
    
    TrafficLight.prototype.__currentStateTime = function () {
        return this['__' + this.__state + 'Time'];
    };

    TrafficLight.prototype.toRed = function () {
        console.log('Changed to red');
        this.__state = 'red';
        this.__setnewtimer(this.__redTime, function () {
            this.toGreen();
        }.bind(this));
    };

    TrafficLight.prototype.toGreen = function () {
        console.log('Changed to green');
        this.__state = 'green';
        this.__setnewtimer(this.__greenTime, function () {
            this.toYellow();
        }.bind(this));
    };

    TrafficLight.prototype.toYellow = function () {
        console.log('Changed to yellow');
        this.__state = 'yellow';
        this.__setnewtimer(this.__yellowTime, function () {
            this.toRed();
        }.bind(this));
    };
    
    TrafficLight.prototype.__exittrammode = function () {
        console.log('Exit tram mode');
        this.__tramstate = null;
        this.__trammode = null;
        if (new Date() - this.__stateChangedTime > this.__usefulCoefficient * this.__currentStateTime()) {
            switch (this.__state) {
                case 'red': this.toGreen(); break;
                case 'yellow': this.toRed(); break;
                case 'green': this.toYellow(); break;
            }
        }
    };
    
    TrafficLight.prototype.__entertrammode = function () {
        console.log('Entering tram mode');
        this.__trammode = 'using';
        this.__tramstate = 'green';
        this.__tramtimer = setTimeout(function () {
                        this.__exittrammode();
                    }.bind(this), this.__tramGreenTime);
    };
    
    TrafficLight.prototype.__tramcallback = function (data) {
        if (!this.__trammode) {
            console.log('Handling tram event');
            this.__trammode = 'waiting';
            this.__tramtimer = setTimeout(function () {
                        this.__entertrammode();
                    }.bind(this), this.__tramWaitTime);
        }
    };
    
    TrafficLight.prototype.tramsubscribe = function (event) {
        event.addListener('tram', function() {
                            this.__tramcallback();
                        }.bind(this));
    };

    TrafficLight.prototype.state = function () {
        if (this.__trammode == 'using')
            return this.__tramstate;
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