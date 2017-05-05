var restify = require('restify');
var mongoose = require('mongoose');

var server = restify.createServer();

const port = 8080;



server.listen(port, function(){
	console.log("%s listeneing on %s ", server.name, port);
})

