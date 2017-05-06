var restify = require('restify');
var mongoose = require('mongoose');

var server = restify.createServer();

const port = 8080;

const dirname = './client';


server.get('/about', restify.serveStatic({
  directory: './client',
  file: 'about.html'
}));

server.get(/\/?.*/, restify.serveStatic({
  directory: './client',
  default:'index.html'
}));

server.listen(port, function(){
	console.log("%s listeneing on %s ", server.name, port);
})

