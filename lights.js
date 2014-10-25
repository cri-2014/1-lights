function svetophor(time_r, time_y, time_g){
        this.state = 'default';
        this.red_work = time_r;
        this.yellow_work = time_y;
        this.green_work = time_g;
        this.last_time = 0;
        this.last_state;
        svetophor.prototype.toRed = function(){
                //alert('svetophor started');
                //console.log('svetophor started');
                this.state = 'Red';
                this.id_r = setTimeout(function() {this.toYellow();}.bind(this), this.red_work);
        }
        svetophor.prototype.toYellow = function(){
                this.state = 'Yellow';
                this.id_y = setTimeout(function() {this.toGreen();}.bind(this), this.yellow_work);
        }
        svetophor.prototype.toGreen = function(){
                this.state = 'Green';
                this.id_g = setTimeout(function() {this.toRed();}.bind(this), this.green_work);
        }
        svetophor.prototype.getState = function(){
                //console.log(this.state);
                return this.state;
                //alert(this.state);
        }
        svetophor.prototype.tram_is_coming = function(){
                //console.log('Last state -', this.last_state);
                this.id_tram_com = setTimeout(function() {this.smart_time();}.bind(this), 3000);
                //console.log('Tram is coming');
                //clearTimeout(this.id_tram_com);
        }
        svetophor.prototype.smart_time = function(){
                this.last_state = this.state;
                clearTimeout(this.id_r);
                clearTimeout(this.id_y);
                clearTimeout(this.id_g);
                this.state = 'Green';
                id_tram = setTimeout(function() {this.back_to_last_state();}.bind(this), 5000);
        }
        svetophor.prototype.back_to_last_state = function() {
                switch(this.last_state) {
                        case 'Red':
                                this.toRed();
                                break;
                        case 'Yellow':
                                this.toYellow();
                                break;
                        case 'Green':
                                this.toGreen();
                                break;
                };
        }
        svetophor.prototype.stop = function() {
                clearTimeout(this.id_r);
                clearTimeout(this.id_y);
                clearTimeout(this.id_g);
                clearTimeout(this.id_tram_com);
                clearTimeout(this.id_tram);
                this.state = 'default';
        }
};

//exports.svetophor = svetophor;
// var light = new svetophor(2000, 1000, 2000);

// light.toRed();
//setInterval(light.getState.bind(light), 1000)
/*var EventEmitter = require('events').EventEmitter;
var Light_Events = new EventEmitter;
Light_Events.on('tram', light.tram_is_coming.bind(light))
setTimeout(function(){Light_Events.emit('tram')}, 2000);*/