const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  birthday: {type: Date, required: true},
  mail: {type: String, required: true},
  imagePath: {type: String},
  userType: {type: String, required: true}
});

mongoose.model('userModel', userSchema, 'users');
