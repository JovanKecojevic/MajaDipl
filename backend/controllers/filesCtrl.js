const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');

/*
const Employee = mongoose.model('employeeModel');
const Subject = mongoose.model('subjectModel');
const Group = mongoose.model('groupModel');
*/

const Files = mongoose.model('fileSubjectModel');


module.exports.filesUpload = (req, res, next) =>
{
  console.log(req.body);
  var file = new Files();
  const url = req.protocol + "://" + req.get("host");
  file.id = req.body.id;
  file.title = req.body.title;
  file.date = req.body.date;
  file.subjectName = req.body.subjectName;
  file.author = req.body.author;
  file.authorName = req.body.authorName;
  file.post = req.body.post;
  file.filePath= url + "/filesFolder/" + req.file.filename;
  file.size = req.file.size;
  file.type = req.body.type;

  file.save((err, doc) => {
    if (!err) {
      res.status(200).json({ message: "Successfuly uploaded file!" });
    }
    else{
      console.log(err);
    }
  });
}

module.exports.getStudentSubjectAll = (req, res, next) =>
{
  Files.find().then(documents => {
      res.status(200).send(documents);
  });
}



module.exports.getFile = (req, res, next) =>
{

  /*
  Files.find().then(documents => {
      res.status(200).send(documents);
  });*/
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





