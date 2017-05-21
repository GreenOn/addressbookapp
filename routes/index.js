var Router = require('restify-router').Router;
var router = new  Router();

var restify = require('restify');

router.add('/user', require('./users'));
router.add('/verify', require('./verify'));
router.add('/support', require('./support'));
router.get('/', function(req, res){
	res.status(200).json({message: 'API server is up and running!'});
});

module.exports = router;