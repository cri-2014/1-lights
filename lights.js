Object.prototype.on = function (eventName, handler) {
	if (!this._handlers)
		this._handlers = [];
	if (!this._handlers[eventName])
		this._handlers[eventName] = handler;
};

Object.prototype.off = function (eventName) {
	if (!this._handlers)
		this._handlers = [];
	if (!this._handlers[eventName])
		return;
	this._handlers[eventName] = null;
};

Object.prototype.trigger = function (eventName) {
	if (!this._handlers)
		this._handlers = [];
	if (!this._handlers[eventName])
		return;
	this._handlers[eventName].call(arguments, 1);
};

function Lights(config) {
	this.state = null;
	this._timeout = null;
	this._config = config;
	this._elem = document.getElementById(config.blockId);
 
	this.toRed = function (time) {
		if (this._timeout)
			clearTimeout(this._timeout);
		this.state = "red";
		this._elem.className = this.state;
		this._timeout = setTimeout(function () {
			this.toYellow();
		}.bind(this), (time ? time : this._config.red) * 1000);
	};
	
	this.toYellow = function (time) {
		if (this._timeout)
			clearTimeout(this._timeout);
		this.state = "yellow";
		this._elem.className = this.state;
		this._timeout = setTimeout(function () {
			this.toGreen();
		}.bind(this), (time ? time : this._config.yellow) * 1000);
	};
	
	this.toGreen = function (time) {
		if (this._timeout)
			clearTimeout(this._timeout);
		this.state = "green";
		this._elem.className = this.state;
		this._timeout = setTimeout(function () {
			this.toRed();
		}.bind(this), (time ? time : this._config.green) * 1000);
	};
	
	this.start = function () {
		if (this._timeout)
			clearTimeout(this._timeout);
		this.toRed();
	};
}

function tramAnimation(v, delay, duration, to, durationLeft) {
	duration -= delay;
	var x0 = document.getElementsByClassName("tram")[0].getBoundingClientRect().left;
	document.getElementsByClassName("tram")[0].style.left = (x0 + v*1) + "px";
	if (duration > 0)
		setTimeout(function() {
			tramAnimation(v, delay, duration, to);
		}, delay);
	else
		if (to) {
			document.getElementsByClassName("tram")[0].className += " leaves"
			setTimeout(function() {
				tramAnimation(v, delay, 4000, false);
			}, delay);
		}
		else {
			document.getElementsByClassName("tram")[0].className = "tram";
			document.getElementsByClassName("tram")[0].style.left = "0px";
			document.getElementsByClassName("tram")[0].onclick = function () { lights.trigger('tram'); };
		}
}