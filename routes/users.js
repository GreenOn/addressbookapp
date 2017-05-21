var Router = require('restify-router').Router;
var router = new  Router();
var restify = require('restify');
var server = restify.createServer();

var User = require('../models/users');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../config');
var jwt = require('jsonwebtoken');
var authHelper = require('./auth/autherize');


router.post('/login', function(req, res){
	User.find(req.body, function(err, user){
		if (err) throw err;

		console.log("Log in successful");

		if (user.length == 1){
			if (user[0].enabled != true){
				res.json(404,{
					msg: 'Please activate your account.'
				});
			}else{
				var user_obj = JSON.parse(JSON.stringify(user[0]));
				
				var token = jwt.sign(user_obj, config.secret, {
					expiresIn: 3600*24 //expires in 24 hours
				});
				res.json(200,{
					token: token,
					user: user[0]
				});
			}
		}else{
			res.status(404).json({
				msg: 'Invalid credentials.'
			});
		}
	});
});


router.post('/', function(req, res){
	var newUser = User(req.body);
	console.log("I am in post.");
	console.log(newUser);
	console.log('req.body: ', req.body)
	console.log({email: req.body.email, username: req.body.username});
	User.find({ $or: [{email: req.body.email}, {username: req.body.username}] }, function(err, arr_users){
		if (err) throw err;

		if (arr_users.length > 0){
			console.log("Duplicate details");
			res.json(409, {
				msg: 'Duplicated Email or Username.'
			});
		}else{
			newUser.save(function(err){
				if (err) throw err;

				console.log("New user created!");
				console.log(newUser);
				
				var Email = require('./emails');
				var Verifier = require('./verifyCode');
				newUser.verify_code = Verifier.generateVerificationCode(newUser.email);
				Email.sendConfirmationEmail(newUser.email, newUser.verify_code);

				newUser.save(function(err){
					if (err) throw err;

					console.log("Verification Code Saved");
					res.json(201,newUser);	
				});
			});
		}
	});
	
});

//router.use(authHelper.userTokenHandler);

router.get('/', authHelper.userTokenHandler, authHelper.adminTokenHandler, function(req, res){
	User.find({admin:false}, function(err, arr_users){
			if (err) throw err;

			console.log("Fetching user List successful");
			console.log(arr_users);

			res.status(200).json({
				users: arr_users
			});
	});
});
router.get('/:user_oid', authHelper.userTokenHandler, function(req, res){
	var user_oid = req.params.user_oid;
		//Fetch specific user
		User.findById(ObjectId(user_oid), function(err, user){
			if (err) throw err;

			console.log("Fetching user successful");
			console.log(user);

			res.status(200).json(user);
		});
});
router.put('/:user_oid', authHelper.userTokenHandler, function(req, res){
	var user_oid = req.params.user_oid;
	if (user_oid == null || user_oid == undefined){
		res.status(400).json({
			msg: 'Need User Id.'
		});
		res.done();
	}

	User.update({_id: ObjectId(user_oid)}, req.body, {multi:false}, function(err, num_affected){
		if (err) throw err;

		if (num_affected == 0){
			res.status(404).json({
				msg: 'No User found.'
			});
		}else{
			console.log("Updating User successful");
			console.log(num_affected);

			res.status(200).json({
				msg: 'User updated.'
			});
		}
	});
});
router.del('/:user_oid', authHelper.userTokenHandler, function(req, res){
	var user_oid = req.params.user_oid;
	if (user_oid == null || user_oid == undefined){
		res.status(400).json({
			msg: 'Need User Id.'
		});
		res.done();
	}

	User.findById(ObjectId(user_oid), function(err, user){
		if (err) throw err;

		if (user == null){
			res.status(404).json({
				msg: 'No User found.'
			});
		}else{
			user.remove(function(err){
				if (err) throw err;

				console.log("Removing User successful");

				res.status(200).json({
					msg: 'User updated.'
				});
			});			
		}
	});
});
router.applyRoutes(server);
module.exports = router;