const mongoose = require('mongoose');

var raceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date:{type: String, required: true},
  organizer:{type: String, required: true},
  location:{type: String, required: true},
  description:{type: String, required: true},
  address:{type: String, required: true},
  price:{type:String, required:true},
  imagePath:{ type: String,  required:true}
});

mongoose.model('raceModel', raceSchema, 'races');
