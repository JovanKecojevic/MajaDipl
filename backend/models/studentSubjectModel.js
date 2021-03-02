const mongoose = require('mongoose');

var studentSubjectSchema = new mongoose.Schema({
  username: {type: String, required: true},
  code: {type: String, required: true}
});

mongoose.model('studentSubjectModel', studentSubjectSchema, 'studentSubjects');
