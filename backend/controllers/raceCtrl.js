const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');

const Race = mongoose.model('raceModel');

/*
const Employee = mongoose.model('employeeModel');
const Subject = mongoose.model('subjectModel');

*/


module.exports.createRace = (req, res, next) =>
{
  console.log(req.body);

  var file = new Race();

  const url = req.protocol + "://" + req.get("host");
  file.name = req.body.name;
  file.date = req.body.date;
  file.organizer = req.body.organizer;
  file.location = req.body.location;
  file.description = req.body.description;
  file.address = req.body.address;
  file.price = req.body.price;
  file.imagePath= url + "/filesFolder/" + req.file.filename;

  file.save((err, doc) => {
    if (!err) {
      res.status(200).json({ message: "Successfuly created race!" });
    }
    else{
      console.log(err);
    }
  });
}

module.exports.getRaces = (req, res, next) =>
{
  Race.find().then(documents => {
      res.status(200).send(documents);
  });
}



 /*
module.exports.getStudentSubjectAll = (req, res, next) =>
{
  Files.find().then(documents => {
      res.status(200).send(documents);
  });
}



module.exports.getFile = (req, res, next) =>
{


  Files.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.deleteFile = (req, res, next) =>
{
  Files.deleteOne({ id: req.params.id}).then(result => {
    console.log(result);
    if(result.n!=0)
    res.status(200).json({ message: "File deleted!", tip:1 });
    else
    res.status(200).json({ message: "File not found!", tip:2 });
  })
    .catch(err => {
      alert("Greska");
      console.log("Error! Failed to delete subject!");
      res.status(400).json({ message: err });
    });
}

*/



