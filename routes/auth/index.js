var restify = require('restify');
var router = restify.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../config');
var jwt = require('jsonwebtoken');


router.post('/', function(req, res){
	var newUser = User(req.body);
	console.log({email: req.body.email, username: req.body.username});
	User.find({ $or: [{email: req.body.email}, {username: req.body.username}] }, function(err, arr_users){
		if (err) throw err;

		if (arr_users.length > 0){
			console.log("Duplicate details");
			res.status(409).json({
				msg: 'Duplicated Email or Username.'
			});
		}else{
			newUser.save(function(err){
				if (err) throw err;

				console.log("New user created!");
				console.log(newUser);
				
				var Email = require('email');
				var Verifier = require('verifier');
				newUser.verify_code = Verifier.generateVerificationCode(newUser.email);
				Email.sendConfirmationEmail(newUser.email, newUser.verify_code);

				newUser.save(function(err){
					if (err) throw err;

					console.log("Verification Code Saved");
					res.status(201).json(newUser);	
				});
			});
		}
	});
	
});
router.get('/', function(req, res){
	User.find({admin:false}, function(err, arr_users){
			if (err) throw err;

			console.log("Fetching user List successful");
			console.log(arr_users);

			res.status(200).json({
				users: arr_users
			});
	});
});
router.get('/:user_oid', function(req, res){
	var user_oid = req.params.user_oid;
		//Fetch specific user
		User.findById(ObjectId(user_oid), function(err, user){
			if (err) throw err;

			console.log("Fetching user successful");
			console.log(user);

			res.status(200).json(user);
		});
});
router.put('/:user_oid', function(req, res){
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
router.delete('/:user_oid', function(req, res){
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
router.post('/login', function(req, res){
	User.find(req.body, function(err, user){
		if (err) throw err;

		console.log("Log in successful");

		if (user.length == 1){
			if (user[0].enabled != true){
				res.status(404).json({
					msg: 'Please activate your account.'
				});
			}else{
				var user_obj = JSON.parse(JSON.stringify(user[0]));
				
				var token = jwt.sign(user_obj, config.secret, {
					expiresIn: 3600*24 //expires in 24 hours
				});
				res.status(200).json({
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

module.exports = router;