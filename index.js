var Router = require('restify-router').Router;
var routerInstance = new  Router();

var restify = require('restify');
var mongoose = require('mongoose');

routerInstance.use(restify.bodyParser());
// function userRouter(req, res, next) {  
//   res.send('./routes/users');
//   next();
// }

// routerInstance.get('/user', userRouter);

// routerInstance.post('/user', userRouter);
 
var db = mongoose.connection;

db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established');
});


var server = restify.createServer();


const port = 8080;

const dirname = './client';

// All routes will be prefixed with /api

routerInstance.add('/api',require('./routes'));


// add user routes 
routerInstance.applyRoutes(server);

server.get(/\/?.*/, restify.serveStatic({
  directory: './client',
  default:'index.html'
}));



server.listen(port, function(){
	console.log("%s listeneing on %s ", server.name, port);
})

