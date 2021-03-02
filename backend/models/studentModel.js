const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var studentSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password:{type: String, required: true},
  firstname:{type: String, required: true},
  lastname:{type: String, required: true},
  index:{type: String, required: true},
  type:{type: String, required: true},
  status: { type: String, required: true},
  userType:{ type: String, required: true},
  firstlog:{ type: Boolean, default: true}
});

studentSchema.plugin(uniqueValidator);

mongoose.model('studentModel', studentSchema, 'students');
