const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var fileSchema = new mongoose.Schema({
  filePath: {type: String, required: true, unique:true},
});

fileSchema.plugin(uniqueValidator);

mongoose.model('fileModel', fileSchema, 'files');
