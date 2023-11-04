// Create a web server that's going to send a response of big image (bigger then 3MB) to any client that sends a request to your specified server:port. Use the best way for performance. (Try to solve this in many different ways and inspect the loading time in the browser and send many requests to see the performance differences)

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
    var readStream = fs.createReadStream(path.join(__dirname, 'big_image.jpg'));
    readStream.pipe(res);
});

server.listen(8080);
