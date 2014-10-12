var config = {
    red: 3000,
    yellow: 1000,
    green: 5000,
    tramDuration: 10000,
    tramWaiting: 3000,
    setDuration: function (r, y, g, d, w) {
        this.red = r;
        this.yellow = y;
        this.green = g;
        this.tramDuration = d;
        this.tramWaiting = w;
    }
};

function TrafficLights(config) {
    this._state = null;
    this._timeout = null;
    this.redTime = config.red;
    this.yellowTime = config.yellow;
    this.greenTime = config.green;
    this.tramDuration = config.tramDuration;
    this.tramWaiting = config.tramWaiting;

}

TrafficLights.prototype.toRed = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "red";
    this.timeout = setTimeout(function () {this.toGreen()}.bind(this), this.redTime);
};

TrafficLights.prototype.toYellow = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "yellow";
    this.timeout = setTimeout(function() {this.toRed()}.bind(this), this.yellowTime);
};

TrafficLights.prototype.toGreen = function() {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "green";
    this.timeout = setTimeout(function () {this.toYellow()}.bind(this), this.greenTime);
};

TrafficLights.prototype.tramHandler = function() {

};


var lights = new TrafficLights(config);
lights.toYellow();
setInterval(function () {
    console.log(lights.state);
}, 500);