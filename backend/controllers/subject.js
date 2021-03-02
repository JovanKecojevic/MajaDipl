const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');


const Subject = mongoose.model('subjectModel');
const StudentSubject = mongoose.model('studentSubjectModel');

module.exports.createSubject = (req, res, next) => {

    console.log("_________________________");
    console.log(req.body);
    var subject = new Subject();
    subject.name = req.body.name;
    subject.type = req.body.type;
    subject.studies = req.body.studies;
    subject.semester = req.body.semester;
    subject.department = req.body.department;
    subject.code = req.body.code;
    subject.fond = req.body.fond;
    subject.espb = req.body.espb;
    subject.goal = req.body.goal;
    subject.propositions = req.body.propositions;
    subject.lab = "";
    subject.teachers =  null;
    subject.exercises =  null;
    subject.exam =  null;
    subject.lectures =  null;

    subject.save((err, doc) => {
      if (!err)
      {
        res.status(200).json({ message: "Subject successfuly created!" });
      }
      else
      {
        console.log(err);
      }
    });

}


module.exports.getSubjectsBachelor = (req, res, next) =>
{
  Subject.find({studies:"Osnovne"}).then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.getSubjectsMaster = (req, res, next) =>
{
  Subject.find({studies:"Master"}).then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.getSubjects = (req, res, next) =>
{
  Subject.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.deleteSubject = (req, res, next) =>
{
  Subject.deleteOne({ code: req.params.code }).then(result => {
    console.log(result);
    if(result.n!=0)
    res.status(200).json({ message: "Subject deleted!" });
    else
    res.status(200).json({ message: "Subject not found!" });
  })
    .catch(err => {
      alert("GReska");
      console.log("Error! Failed to delete subject!");
      res.status(400).json({ message: err });
    });
}

module.exports.putSubject = (req, res, next) =>
{
  console.log(req.body);
    var subject = {
      name : req.body.name,
      type : req.body.type,
      studies : req.body.studies,
      semester : req.body.semester,
      department : req.body.department,
      code : req.body.code,
      fond : req.body.fond,
      espb : req.body.espb,
      goal : req.body.goal,
      propositions : req.body.propositions,
      lab: req.body.lab
    }

    Subject.updateOne({ code: req.body.code }, subject).then(documents => {
      res.status(200).json({
        message: 'Successfully updated Subject!'
      });
    });

}

module.exports.createStudentSubject = (req, res, next) => {

  console.log("_________________________");
  console.log(req.body);
  var data = new StudentSubject();
  data.username = req.body.student;
  data.code = req.body.code;


  data.save((err, doc) => {
    if (!err)
    {
      res.status(200).json({ message: "Successfuly subscribed!" });
    }
    else
    {
      console.log(err);
    }
  });

}


module.exports.getStudentSubject = (req, res, next) =>
{
  StudentSubject.find({ user : req.body.name }).then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.getStudentSubjectAll = (req, res, next) =>
{
  StudentSubject.find().then(documents => {
      res.status(200).send(documents);
  });
}

