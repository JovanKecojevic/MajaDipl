const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');


const Admin = mongoose.model('adminModel');
const User = mongoose.model('userModel');


module.exports.userRegistration = (req, res, next) => {
  console.log("_________________________");
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");

  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.birthday = req.body.birthday;
  user.mail = req.body.mail;
  user.userType = req.body.userType;
  user.imagePath = url + "/filesFolder/" + req.file.filename;

  user.save((err, doc) => {
    if (!err)
    {
      res.status(200).json({ message: "User successfuly registered!" });
    }
    else
    {
      console.log(err);
    }
  });
}


module.exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType;

  console.log(req.body);


  if(req.body.userType == "Admin")
  {
    Admin.findOne({ username: username }, function (err, user)
    {
      if (err || user === null)
      {
        res.status(400).json({
          message: "Incorrect username"
        });;
      } else {
        if (password == user.password) {
          res.status(200).json({message:"Successfully logged in",us:user});
        }
        else {
          res.status(400).json({
            message: "Incorrect password"
          });
        }
      }
    });
  }
  else
  {
    User.findOne({ username: username,userType: userType}, function (err, user)
    {
      if (err || user === null)
      {
        res.status(400).json({
          message: "Incorrect username"
        });;
      }
      else
      {
        if (password == user.password) {
          res.status(200).json({message:"Successfully logged in", firstlog: user.firstlog, us:user});
        }
        else {
          res.status(400).json({
            message: "Incorrect password"
          });
        }
      }
    });

  }
}


module.exports.changePassword = (req, res, next) => {
  const username = req.body.username;
  const oldPassword = req.body.oldpassword;
  const newPassword = req.body.newpassword;
  const fl = false;

  console.log(req.body);

  if(req.body.type === "admin")
  {
    Admin.findOne({ username: req.body.username }).then(user =>
    {
      if (user.password == oldPassword)
      {
        Admin.updateOne({ username: req.body.username }, { password: newPassword }, {firstlog: false}).then(doc => {
          res.status(200).json({
            message: 'Successfully updated user!'
          });
        });
      }
      else
      {
        res.status(400).json({
          message: 'Old password is not correct!'
        });
      }
    })
  }
  else
  {
    User.findOne({ username: req.body.username }).then(user =>
      {
        if (user.password == oldPassword)
        {
          User.updateOne({ username: req.body.username },
                            { password: newPassword }).then(doc =>
            {
              console.log(doc.username + " " + doc.password);
              res.status(200).json({
              message: 'Successfully updated user!'
            });
          });
        }
        else
        {
          res.status(200).json({
            message: 'Old password is not correct!'
          });
        }
      });
  }
}

module.exports.getUsers = (req, res, next) =>
{
  User.find().then(result => {
    console.log(result);
    res.status(200).send(result);
  })
    .catch(err => {
      console.log("Error! Couldn't get Users!");
      res.status(400).json({ message: err });
    });

}


/*
module.exports.studentRegistration = (req, res, next) => {
  if(req.body.userType === "user")
  {
    this.userRegistration(req,res,next);
  }
  else
  {
    console.log("_________________________");
    console.log(req.body);
    var user = new Student();
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.index = req.body.index;
    user.type = req.body.type;
    user.status = req.body.status;
    user.userType = 'Student';

    //user.nizProcitanih=[];

    user.save((err, doc) => {
      if (!err)
      {
        res.status(200).json({ message: "Student successfuly registered!" });
      }
      else
      {
        console.log(err);
      }
    });
  }
}





module.exports.deleteUser = (req, res, next) =>
{
  if(req.params.userType === "Student")
  {
    Student.deleteOne({ username: req.params.username }).then(result => {
      res.status(200).json({ message: "Student deleted!" });
    })
      .catch(err => {
        console.log("Error! Failed to delete student!");
        res.status(400).json({ message: err });
      });
  }
  if(req.params.userType === "user")
  {
    user.deleteOne({ username: req.params.username }).then(result => {
      res.status(200).json({ message: "user deleted!" });
    })
      .catch(err => {
        console.log("Error! Failed to delete user!");
        res.status(400).json({ message: err });
      });
  }

}

module.exports.getUser = (req, res, next) =>
{
  if(req.params.userType === "Student")
  {
    Student.findOne({ username: req.params.username }).then(result => {
      console.log(result);
      res.status(200).send(result);
    })
      .catch(err => {
        console.log("Error! Couldn't get a Student");
        res.status(400).json({ message: err });
      });
  }
  if(req.params.userType === "user")
  {
    user.findOne({ username: req.params.username }).then(result => {
      res.status(200).send(result);
    })
      .catch(err => {
        console.log("Error! Couldn't get an user");
        res.status(400).json({ message: err });
      });
  }
}

module.exports.putUser = (req, res, next) =>
{
  if(req.body.userType === "Student")
  {
    var user = {
      username : req.body.username,
      password : req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      index : req.body.index,
      type : req.body.type,
      status : req.body.status,
      userType : 'Student'
    };

    Student.updateOne({ username: req.body.username }, user).then(documents => {
      res.status(200).json({
        message: 'Successfully updated Student!'
      });
    });
  }
  if(req.body.userType === "user")
  {
    console.log(req.body);
    var user = {
      username : req.body.username,
      password : req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      phone : req.body.phone,
      address : req.body.address,
      website : req.body.website,
      personal : req.body.personal,
      title : req.body.title,
      cabinet : req.body.cabinet,
      status : req.body.status,
      userType : 'user',
      imagePath : req.body.imagePath,
    }

    user.updateOne({ username: req.body.username }, user).then(documents => {
      res.status(200).json({
        message: 'Successfully updated user!'
      });
    });
  }
}


module.exports.getusers = (req, res, next) =>
{
  user.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.getStudents = (req, res, next) =>
{
  Student.find().then(documents => {
      res.status(200).send(documents);
  });
}
*/
