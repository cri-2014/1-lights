function Lights (config) 
{
	this._state = null;
	this._timeout = null;
	
	this.greenTime = config.greenTime;
	this.yellowTime = config.yellowTime;
	this.redTime = config.redTime;
								
	Lights.prototype.state = function() 
	{
		return this._state;
	};
				
	Lights.prototype.toRed = function() 
	{
		if (this._timeout)
		{
			clearTimeout(this._timeout);
		}
		this._state = "red";
		this._timeout = setTimeout(function() 
		{
			this.toGreen();
		}.bind(this), this.redTime);
	};
		
	Lights.prototype.toYellow = function() 
	{
		if (this._timeout)
		{
			clearTimeout(this._timeout);
		}
		this._state = "yellow";
		this._timeout = setTimeout(function() 
		{
			this.toRed();
		}.bind(this), this.yellowTime);
	};
		
	Lights.prototype.toGreen = function() 
	{
		if (this._timeout)
		{
			clearTimeout(this._timeout);
		}
		this._state = "green";
		this._timeout = setTimeout(function() 
		{
			this.toYellow();
		}.bind(this), this.greenTime);
	};
		
}

var config = 
{
	greenTime:	6000,
	yellowTime:	2000,
	redTime:	6000
}

var lights = new Lights(config);
lights.toGreen();

setInterval(function() 
	{
		alert("now is " + lights.state());
	}, 2000); 
