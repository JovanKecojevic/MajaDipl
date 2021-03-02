const express = require('express');
const router = express.Router();
const multer= require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'text/plain': 'txt',
  'application/pdf': 'pdf',
  'application/vnd.ms-powerpoint' : 'ppt',
  'application/x-zip-compressed' : 'zip'
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*let isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type (user.js)");
    if (isValid) {
      error = null;
    }*/
    cb(null, "backend/filesFolder");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('-');
    console.log(file.mimetype);
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "." + ext);
  }
})

const ctrlUser = require('../controllers/user');
const ctrlRace = require('../controllers/raceCtrl');

const ctrlPost = require('../controllers/post');
const ctrlSubject = require('../controllers/subject');
const ctrlGroup = require('../controllers/group');
const ctrlFiles = require('../controllers/filesCtrl');


//register
router.post('/registration_employee',multer({ storage: storage }).single("file"), ctrlUser.userRegistration);


//login
router.post('/login', ctrlUser.login);

//pwchange
router.post('/password', ctrlUser.changePassword);

//race
router.post('/race-create',multer({ storage: storage }).single("file"), ctrlRace.createRace);
router.get('/home', ctrlRace.getRaces);

//user
router.get('/race', ctrlUser.getUsers);

/*
//registrate students
router.post('/registration_student', ctrlUser.studentRegistration);
router.post('/admin', ctrlUser.studentRegistration);

//registrate employees
router.post('/registration_employee', ctrlUser.employeeRegistration);





//delete users
router.delete('/admin/:userType/:username', ctrlUser.deleteUser);

//update users
router.get('/admin/:userType/:username', ctrlUser.getUser);
router.put('/admin', ctrlUser.putUser);

//get employees
router.get('/employees', ctrlUser.getEmployees);
router.get('/admin-subject', ctrlUser.getStudents);


//posts
router.post('/posts', ctrlPost.createPost);
router.get('/posts', ctrlPost.getPosts);
router.post('/sub-posts', ctrlPost.createPost);
router.delete('/subject/:date', ctrlPost.deletePost);
router.put('/update-post', ctrlPost.putPost);

//subjects
router.post('/admin-subject', ctrlSubject.createSubject);
router.delete('/admin-subject/:code', ctrlSubject.deleteSubject);

router.get('/bachelor', ctrlSubject.getSubjectsBachelor);
router.get('/master', ctrlSubject.getSubjectsMaster);
router.get('/sub-info', ctrlSubject.getSubjects);
router.get('/subject', ctrlSubject.getSubjects);

router.put('/subjects', ctrlSubject.putSubject);

//subscriptions
router.post("/subject",ctrlSubject.createStudentSubject);
router.get('/subscription', ctrlSubject.getStudentSubject);
router.get('/subscriptions', ctrlSubject.getStudentSubjectAll);

//groups
router.get("/groups",ctrlGroup.getGroups);
router.post("/groups",ctrlGroup.createGroup);
router.delete("/groups/:group/:username/:code",ctrlGroup.deleteGroup);

//files
router.post("/files",multer({ storage: storage }).single("file"), ctrlFiles.filesUpload);
router.get("/files", ctrlFiles.getStudentSubjectAll);
router.get("/fileOne", ctrlFiles.getFile);
router.delete("/files/:id", ctrlFiles.deleteFile);
*/


module.exports = router;
