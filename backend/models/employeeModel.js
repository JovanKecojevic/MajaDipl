const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var employeeSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password:{type: String, required: true},
  firstname:{type: String, required: true},
  lastname:{type: String, required: true},
  address:{type: String, required: true},
  phone:{type: String},
  website:{type: String},
  personal:{type: String},
  title: { type: String, required: true},
  cabinet: { type: String, required: true},
  status: { type: String, required: true},

  userType:{ type: String, required: true},
  firstlog:{ type: Boolean, default: true},
  imagePath:{ type: String, default: null}
});

employeeSchema.plugin(uniqueValidator);

mongoose.model('employeeModel', employeeSchema, 'employees');
