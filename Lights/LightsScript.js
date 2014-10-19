var config = 
{
    timeout : 
	{
        green 	: 6000,
        yellow 	: 2000,
        red		: 6000
    },
    order :
	[
		'green', 'yellow', 'red'
	],
	tram :
	{
		wait  : 3000,
		time  : 10000,
		smart : 0.3
	}
};

function Lights (config) 
{
	this._state		= null;
	this._config 	= config;
	this._timeout 	= null;
	this._timeoutID = null;
	this._lastUse   = null;

	this._prevState = null;
	this._prevTime  = null;
								
	Lights.prototype.state = function() 
	{
		return this._state;
	};
	
	Lights.prototype.nextColor = function() 
	{
		var index  = this._config.order.indexOf(this._state);
		var amount = this._config.order.length;

        var nextColor = this._config.order[ ( ++index % amount ) ];
        var timeout   = this._config.timeout[ nextColor ];
		
        this.switchColor(nextColor, timeout);
    };
	
    Lights.prototype.switchColor = function(color, timeout)
	{
		this._state = color;
		this._timeout = timeout;
		this._lastUse = new Date();
		
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
	
    Lights.prototype.tramWaiting = function () 
    {
    	if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout(function () 
    	{
    		this.tramHere();
    	}.bind(this), this._config.tram.wait);
	};

	Lights.prototype.tramHere = function () 
	{
    	this._prevState = this._state;
    	this._prevTime  = 
    		this._config.timeout[this._prevState] - (new Date() - this._lastUse);
    	this._state     = "green";

    	if (this._timeoutID) 
		{
            clearTimeout(this._timeoutID);
        }
        this._timeoutID = setTimeout (function () 
    	{
    		this.backToLastState();
    	}.bind(this), this._config.tram.time);
	};

	Lights.prototype.backToLastState = function () 
	{

    	if (this._prevTime < this._config.tram.smart * this._config.timeout[this._prevState]) 
    	{
    		this._prevTime = 0;
   	 	}
   	 	if (this._prevState == "green")
   	 		if (this._prevTime > this._config.tram.time)
              	  this._prevTime -= this._config.tram.time;


       	this.switchColor(this._prevState, 
						 this._config.timeout[this._prevState]);
	};

	Lights.prototype.startListenTram = function(tramEvent) 
	{
   		 tramEvent.add("tram", function () 
   		 {
   		 	this.tramWaiting()
   		 }.bind(this));
	};

	this.toGreen();
}

function EventEmitter() 
{
	this._listeners = {};

	EventEmitter.prototype.add = function(name, func)
	{
		if (this._listeners[name] == null)
			this._listeners[name] = [];

		this._listeners[name].push(func);
	}

	EventEmitter.prototype.del = function(name, func)
	{
		for(var key in _listeners)
		{
			for (var i=0; i < this._listeners[key].length; ++i)
				if (this._listeners[key][i] === func) 
					this._listeners[key].splice(i, 1);
		}
	}

	EventEmitter.prototype.emit = function(key) 
	{
		for (var i=0; i < this._listeners[key].length; ++i)
			setTimeout(this._listeners[key][i], 0);	
	}
}

var lights = new Lights(config);

var tramEvent = new EventEmitter();
	lights.startListenTram(tramEvent);

setInterval(function() 
{
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