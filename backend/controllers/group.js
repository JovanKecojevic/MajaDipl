const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');
const multer= require('multer');

const Group = mongoose.model('groupModel');
const Files = mongoose.model('fileModel');
const Employee = mongoose.model('employeeModel');
const Subject = mongoose.model('subjectModel');


module.exports.getGroups = (req, res, next) =>
{
  Group.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.createGroup = (req, res, next) => {

  console.log("_________________________");
  console.log(req.body);
  var data = new Group();

  data.group = req.body.group;
  data.username = req.body.username;
  data.code = req.body.code;
  data.day = req.body.day;
  data.time = req.body.time;

  data.save((err, doc) => {
    if (!err)
    {
      res.status(200).json({ message: "Successfuly created group!", tip: 1 });
    }
    else
    {
      console.log(err);
    }
  });

}

module.exports.deleteGroup = (req, res, next) =>
{
  Group.deleteOne({ group: req.params.group, username: req.params.username, code: req.params.code }).then(result => {
    console.log(result);
    if(result.n!=0)
    res.status(200).json({ message: "Group deleted!", tip:1 });
    else
    res.status(200).json({ message: "Group not found!", tip:2 });
  })
    .catch(err => {
      alert("Greska");
      console.log("Error! Failed to delete subject!");
      res.status(400).json({ message: err });
    });
}


