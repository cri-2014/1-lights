var json = '{"green":4000,"yellow":1000,"red":6000}';

function Traffic_lights(config_file, init_state)
{
    this.state = null

    this._timeout = null
    this._config = config_file || null;
    if (this._config)
        this._config = JSON.parse(this._config)

    Traffic_lights.prototype.toYellow = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        this.state = 'yellow'
        this._timeout = setTimeout(function () {
            this.toRed();
        }.bind(this), this._config[this.state])
    }

    Traffic_lights.prototype.toGreen = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        this.state = 'green'
        this._timeout = setTimeout(function () {
            this.toYellow();
        }.bind(this), this._config[this.state])
    }

    Traffic_lights.prototype.toRed = function () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        this.state = 'red'
        this._timeout = setTimeout(function () {
            this.toGreen();
        }.bind(this), this._config[this.state])
    }

    this.getState = function() // current state
    {
        return this.state
    };
    
    this.stopIt = function () // Stop switching lights
    {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
    }
}

var my_Lights = new Traffic_lights(json);
my_Lights.toGreen();

// Tests
// Check state once in a sec
intervalID = setInterval(function () {
    console.log(this.getState());
}.bind(my_Lights), 1000);

//clearInterval(intervalID); // Stop our tests
//my_Lights.stopIt(); // Stop our traffic lights