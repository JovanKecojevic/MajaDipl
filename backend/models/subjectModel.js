const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

var subjectSchema = new mongoose.Schema({
  name: { type: String, required: true},
  type: { type: String, required: true},
  studies: { type: String, required: true},
  semester: { type: String, required: true},
  department: { type: String, required: true},
  code: { type: String, required: true},
  fond: { type: String, required: true},
  espb: { type: String, required: true},
  goal: { type: String, required: true},
  propositions: { type: String},
  teachers: { type: [Object]},
  lectures: { type: [Object]},
  exercises: { type: [Object]},
  exam: { type: [Object]},
  lab: { type: String, default:""}
});

subjectSchema.plugin(uniqueValidator);

mongoose.model('subjectModel', subjectSchema, 'subjects');
