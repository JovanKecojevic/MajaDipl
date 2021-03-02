const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var fileSubjectSchema = new mongoose.Schema({
  id: {type:String, required: true},
  filePath: {type: String, required: true},
  title: {type:String, required:true},
  date: {type: Date, required:true},
  subjectName: {type:String, default:null},
  author: {type:String,required:true},
  authorName: {type:String,required:true},
  post: {type:String,default:null},
  size: {type:String,required:true},
  type: {type:String,default:null}
});

fileSubjectSchema.plugin(uniqueValidator);

mongoose.model('fileSubjectModel', fileSubjectSchema, 'fileSubjects');
