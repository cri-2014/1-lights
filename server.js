var http = require('http');

var server = http.createServer();

var tram = false;

var address = '127.0.0.1'
var port = 8000

server.on('request', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
	res.write(tram.toString());
	res.end()
})

server.listen(port, address);

var traminterval = setInterval(function(){tram = !tram;}, 3000);