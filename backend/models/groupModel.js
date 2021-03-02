const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  group: {type: String, required: true},
  username: {type: String, required: true},
  code: {type: String, required: true},
  day: {type: String, required: true},
  time: {type: String, required: true}
});

mongoose.model('groupModel', groupSchema, 'groups');
