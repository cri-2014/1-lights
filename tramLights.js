
var config = {
    red: 10000,
    yellow: 2000,
    green: 20000,
    tramDuration: 10000,
    tramWaiting: 3000,
    smartCoeff: 0.3,
    setDuration: function (r, y, g, d, w, s) {
        this.red = r;
        this.yellow = y;
        this.green = g;
        this.tramDuration = d;
        this.tramWaiting = w;
        this.smartCoeff = s;
    }
};

function TrafficLights(config) {
    this.state = null;
    this.timeout = null;
    this.prevState = null;
    this.prevTime = null;
    this.lastStart = null;
    this.redTime = config.red;
    this.yellowTime = config.yellow;
    this.greenTime = config.green;
    this.tramDuration = config.tramDuration;
    this.tramWaiting = config.tramWaiting;
    this.smartCoeff = config.smartCoeff;

}

TrafficLights.prototype.toRed = function () {
    console.log("toRed");
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "red";
    this.timeout = setTimeout(function () {this.toGreen()}.bind(this), this.redTime);
    this.lastStart = new Date();
};

TrafficLights.prototype.toYellow = function () {
    console.log("toYellow");
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "yellow";
    this.timeout = setTimeout(function() {this.toRed()}.bind(this), this.yellowTime);
    this.lastStart = new Date();
};

TrafficLights.prototype.toGreen = function() {
    console.log("toGreen");
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "green";
    this.timeout = setTimeout(function () {this.toYellow()}.bind(this), this.greenTime);
    this.lastStart = new Date();
};

TrafficLights.prototype.tramHandler = function () {
    console.log("TramHandler start");
    setTimeout(function () {this.tramHere ()}.bind(this), this.tramWaiting);
};
TrafficLights.prototype.tramHere = function () {
    console.log("Tram is here!");
    clearTimeout (this.timeout);
    this.prevState = this.state;
    this.state = "green";
    this.prevTime = this[this.prevState + "Time"] - (new Date() - this.lastStart);
    setTimeout (function () {this.backToLastState ()}.bind(this), this.tramDuration );
};

TrafficLights.prototype.backToLastState = function () {
    console.log("Return to last state");
    if (this.prevTime < this.smartCoeff * this[this.prevState + "Time"]) {
        console.log("Smart lights working");
        this.prevTime = 0;
    }
    if (this.prevTime != 0) {
        this.state = this.prevState;
    }
   // console.log("prev state: ", this.prevState);
    //console.log("prev time: ", this.prevTime);
    switch (this.prevState) {
        case "green" :
            if (this.prevTime > this.tramDuration) {
                this.prevTime -= this.tramDuration;
            }
            setTimeout (function () {this.toYellow()}.bind(this), this.prevTime);
            break;
        case "yellow" :
            setTimeout( function () {this.toRed()}.bind(this), this.prevTime);
            break;
        case "red" :
            setTimeout(function () {this.toGreen()}.bind(this), this.prevTime);
            break;
        }
};

TrafficLights.prototype.startListenTram = function(tramEvent) {
    tramEvent.on('tram', function () {this.tramHandler()}.bind(this));
};

var lights = new TrafficLights(config);
var EventEmitter = require('events').EventEmitter;

function TramEvent () {};
TramEvent.prototype = Object.create(EventEmitter.prototype);
var tramEvent = new TramEvent;
lights.startListenTram(tramEvent);
lights.toRed();
//setInterval(function () {tramEvent.emit('tram')}.bind(tramEvent), 20000);
tramEvent.emit('tram');
setInterval(function () {
    console.log(lights.state);
}, 1000);