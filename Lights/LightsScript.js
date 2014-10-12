var config = 
{
    timeout : 
	{
        green 	: 6000,
        yellow 	: 2000,
        red		: 6000,
    },
    order :
	[
		'green', 'yellow', 'red'
	]
};

function Lights (config) 
{
	this._state		= null;
	this._config 	= config;
	this._timeout 	= null;
	this._timeoutID = null;
								
	Lights.prototype.state = function() 
	{
		return this._state;
	};
	
	Lights.prototype.nextColor = function() 
	{
		var index  = this._config.order.indexOf(this._state);
		var amount = this._config.order.length;

        var nextColor = this._config.order[ (++index % amount) ];
        var timeout   = this._config.timeout[ nextColor ];
		
        this.switchColor(nextColor, timeout);
    };
	
    Lights.prototype.switchColor = function(color, timeout)
	{
		this._state = color;
		this._timeout = timeout;
		
		if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout(function() 
		{
            this.nextColor();
        }.bind(this), this._timeout);
    };
	
	Lights.prototype.toGreen = function() 
	{
        this.switchColor("green", 
						 this._config.timeout.green);
    };
	
	Lights.prototype.toYellow = function() 
	{
        this.switchColor("yellow", 
						 this._config.timeout.yellow);
    };
	
	Lights.prototype.toRed = function() 
	{
        this.switchColor("red", 
						 this._config.timeout.red);
    };
	
	this.toGreen();
}

var lights = new Lights(config);

setInterval(function() {
	var currentColor = lights.state();
	
	switch(currentColor)
	{
		case 'green':
			document.getElementById('green').src = 'Lights/green.jpg';
			document.getElementById('yellow').src = 'Lights/none.jpg';
			document.getElementById('red').src = 'Lights/none.jpg';
			break;
		case 'yellow':
			document.getElementById('green').src = 'Lights/none.jpg';
			document.getElementById('yellow').src = 'Lights/yellow.jpg';
			document.getElementById('red').src = 'Lights/none.jpg';
			break;
		case 'red':
			document.getElementById('green').src = 'Lights/none.jpg';
			document.getElementById('yellow').src = 'Lights/none.jpg';
			document.getElementById('red').src = 'Lights/red.jpg';
			break;
	}
	
}, 100); 