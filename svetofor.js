function TrafficLight(config) {
    "use strict";
    this.state = config.defaultState;
    this.redTime = config.redTime;
    this.yellowTime = config.yellowTime;
    this.greenTime = config.greenTime;
    this._timeout = null;
    this._lightOnTime = null;
    this._lightLeftTime = null;
}

TrafficLight.prototype.toRed = function() {
    if (this._timeout) clearTimeout(this._timeout);
    this.state = "red";
    this._lightOnTime = (new Date()).valueOf();
    this._timeout = setTimeout(function() {this.toYellow()}.bind(this), this.redTime);
}

TrafficLight.prototype.toYellow = function() {
    if (this._timeout) clearTimeout(this._timeout);
    this.state = "yellow";
    this._lightOnTime = (new Date()).valueOf();
    this._timeout = setTimeout(function() {this.toGreen()}.bind(this), this.yellowTime);
}

TrafficLight.prototype.toGreen = function() {
    if (this._timeout) clearTimeout(this._timeout);
    this.state = "green";
    this._lightOnTime = (new Date()).valueOf();
    this._timeout = setTimeout(function() {this.toRed()}.bind(this), this.greenTime);
}

TrafficLight.prototype.start = function() {
    this["to" + this.state.charAt(0).toUpperCase() + this.state.slice(1)]();
}

TrafficLight.prototype.stop = function() {
    this._lightLeftTime = (new Date()).valueOf() - this._lightOnTime;
    if (this._timeout) clearTimeout(this._timeout);
}

var myConfig = {
    defaultState:"red"
    , redTime: 3000
    , yellowTime: 1000
    , greenTime: 5000
}

var myLight = new TrafficLight(myConfig);

myLight.on = function(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = [];
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
}

myLight.off = function(eventName, handler) {
    var handlers = this._eventHandlers[eventName];
    if (!handlers) return;
    for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] == handler) {
            handlers.splice(i--, 1);
        }
    }
}

myLight.trigger = function(eventName) {
    if (!this._eventHandlers[eventName]) {
        return;
    }

    var handlers = this._eventHandlers[eventName];
    for (var i = 0; i < handlers.length; i++) {
        handlers[i].apply(this, [].slice.call(arguments, 1));
    }
}

myLight.on("tram", function() {
    this.stop();

    var oldState = this.state;
    var oldTimeouts = [];

    oldTimeouts.push(this.redTime, this.yellowTime, this.greenTime);

    this.greenTime = 10000;
    this.yellowTime = 3000;

    switch (this.state) {
        case "green":
        this.greenTime += this._lightLeftTime;
        this._lightLeftTime = 0;
        this.toGreen();
        break;

        default:
        this.state = "yellow";
        setTimeout(function() {this.state = "green"}.bind(this), this.yellowTime);
        setTimeout(function() {
            this.state = oldState;
            this[this.state+"Time"] = this._lightLeftTime;
            this.start();
        }.bind(this), this.greenTime + this.yellowTime);
        break;
    }
    this.greenTime = oldTimeouts.pop();
    this.yellowTime = oldTimeouts.pop();
    this.redTime = oldTimeouts.pop();
});


myLight.start();

setInterval(function() {console.log(myLight.state)}, 1000);