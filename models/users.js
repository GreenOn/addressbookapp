// grab the things we need
var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongodb);
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  group: {type: String, required: false, default:''},
  admin: {type: Boolean, default: false},
  account: {type: String, required: false, default:'basic'},
  verify_code: {type: String, required:false, default:''},
  enabled: {type:Boolean, required:true, default: false},
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next){
   // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;