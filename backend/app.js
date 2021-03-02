const express= require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


require('./models/studentModel');
require('./models/adminModel');
require('./models/employeeModel');
require('./models/userModel');
require('./models/postModel');
require('./models/subjectModel');
require('./models/studentSubjectModel');
require('./models/groupModel');
require('./models/fileModel');
require('./models/fileSubjectModel');
require('./models/raceModel');


mongoose.connect("mongodb+srv://admin:BMZLncxAk4sqmC7a@cluster0.1ftyk.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to database");
}).catch(()=>{console.log('Connection failed')});

const rtsIndex = require('./routes/index.router');

var app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use("/images", express.static(path.join("backend/images")));
app.use("/filesFolder", express.static(path.join("backend/filesFolder")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('', rtsIndex);

module.exports= app;
