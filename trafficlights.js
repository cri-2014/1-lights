function TrafficLight(redTime, yellowTime, greenTime) {	
    this.__timer = null;
    this.__state = null;
    this.__redTime = redTime;
    this.__yellowTime = yellowTime;
    this.__greenTime = greenTime;

    var setnewtimer = function (delay, func) {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
        this.__timer = setTimeout(func, delay);
    };

    TrafficLight.prototype.toRed = function () {
        this.__state = 'red';
        setnewtimer.call(this, this.__redTime, function () {
            this.toGreen();
        }.bind(this));
    };

    TrafficLight.prototype.toGreen = function () {
        this.__state = 'green';
        setnewtimer.call(this, this.__greenTime, function () {
            this.toYellow();
        }.bind(this));
    };

    TrafficLight.prototype.toYellow = function () {
        this.__state = 'yellow';
        setnewtimer.call(this, this.__yellowTime, function () {
            this.toRed();
        }.bind(this));
    };

    TrafficLight.prototype.state = function () {
        return this.__state;
    };

    this.toGreen();
}

changeDOM = function() {
    document.getElementById('colorParagraph').innerHTML = a.state();
};

var a = new TrafficLight(5000, 5000, 5000);