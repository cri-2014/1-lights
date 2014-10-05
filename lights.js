var json = '{"green":4000,"yellow":1000,"red":6000}';

function Traffic_lights_constructor(config_file, init_state)
{
    //config_file - url json
    //init_state, state - 0 - green, 1 - yellow, 2 - red
    //int_state - 0 | 1 | 2
    
    var states = ["green", "yellow", "red"];
    if (!init_state) 
    {
        this.state = "green";
        this.int_state = 0;
    } else 
    {
        this.state = init_state;
        switch (this.state) {
            case "green":
                this.int_state = 0;
                break
            case "yellow":
                this.int_state = 1;
                break
            case "red":
                this.int_state = 2;
                break
        }
    }
    
    this.data = config_file || undefined; // like on default parameter
    if (this.data)
        this.data = JSON.parse(this.data)
    
    this.getState = function() // current state
    {
        return this.state
    };
    
    this.toGreen = function() // change state to green
    {
        clearInterval(self.intervalID); // Delete curr color state
        self.int_state = 0; // Set color to green
        self.state = states[self.int_state];
        
        self.intervalID = setInterval(self.ch, self.data[self.state]); // Start over again with new color
    };
    this.toYellow = function() // change state to yellow
    {
        clearInterval(self.intervalID); // Delete curr color state
        self.int_state = 1; // Set color to yellow
        self.state = states[self.int_state];
        
        self.intervalID = setInterval(self.ch, self.data[self.state]); // Start over again with new color
    };
    this.toRed = function() // change state to red
    {
        clearInterval(self.intervalID); // Delete curr color state
        self.int_state = 2; // Set color to green
        self.state = states[self.int_state];
        
        self.intervalID = setInterval(self.ch, self.data[self.state]); // Start over again with new color
    };
    
    this.ch = function ()
    {
        clearInterval(self.intervalID); // Delete curr color state
        self.int_state += 1; // Pass to next color
        self.int_state %= 3;
        self.state = states[self.int_state];
        
        //console.log(self)
        self.intervalID = setInterval(self.ch, self.data[self.state]); // Start over again with next color
        //alert("Мы тут"); 
    };
    
    // Init our timer
    var self = this; // Copy our this 
    this.intervalID = setInterval(this.ch, this.data[this.state]); // Set interval to the first color
    
    this.stopIt = function () // Stop switching lights
    {
        clearInterval(this.intervalID);
    }
}

var a = new Traffic_lights_constructor(json,"red");

// Tests
function test() {
  console.log(new_self.getState());
}
var new_self = a;

intervalID = setInterval(test, 1000); // Check state once in a sec

//clearInterval(intervalID); // Stop our tests
//a.stopIt(); // Stop our traffic lights