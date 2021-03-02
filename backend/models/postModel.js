const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  postType:{type: String, required: true},
  date: {type:Date, required:true},
  subject: {type: String, required: true},
  author: {type: String},
  authorName: {type: String}
});

postSchema.plugin(uniqueValidator);

mongoose.model('postModel', postSchema, 'posts');
