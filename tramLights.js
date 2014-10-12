var config = {
    red: 3000,
    yellow: 1000,
    green: 5000,
    setDuration: function (r, y, g) {
        this.red = r;
        this.yellow = y;
        this.green = g;
    }
};

function TrafficLights(config) {
    this.config = config;
    this.state = null;
    this.timeout = null;
}

TrafficLights.prototype.toRed = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "red";
    this.timeout = setTimeout(function () {this.toGreen()}.bind(this), this.config.red); 
};

TrafficLights.prototype.toYellow = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "yellow";
    this.timeout = setTimeout(function() {this.toRed()}.bind(this), this.config.yellow);
};

TrafficLights.prototype.toGreen = function() {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.state = "green";
    this.timeout = setTimeout(function () {this.toYellow()}.bind(this), this.config.green);
};

var lights = new TrafficLights(config);
lights.toYellow();
setInterval(function () {
    console.log(lights.state);
}, 500);