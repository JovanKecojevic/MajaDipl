import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';


interface Subject
{
  name: String,
  semester:  String,
  type:  String,
  studies:  String,
  department:  String,
  code:  String,
  fond:  String,
  espb:  String,
  goal:  String,
  propositions:  String,
  lab:  String
}

interface Student
{
  username:String,
  firstname:String,
  lastname:String,
  index:String
}

interface StudentSubject
{
  username: String,
  code: String
}


@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css']
})
export class AdminSubjectComponent implements OnInit {

  subjectCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    studies: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    fond: new FormControl('', Validators.required),
    espb: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    propositions: new FormControl('', Validators.required),
    lab: new FormControl('', Validators.required),
  });

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  subjects:Subject[];
  studentSubject: StudentSubject[];

  students:Student[];
  student:Student = null;

  sub_name=null;
  stud_name=null;

  ngOnInit(): void
  {
    this.subjects=[];
    this.students=[];
    this.studentSubject=[];

    this.service.getSubjectsInfo().subscribe(data=>
      {
        data.forEach(element => {
          this.subjects.push(element);
        });
      });

    this.service.getStudents().subscribe(data=>
      {
        data.forEach(element => {
          this.students.push(element);
        });
      });

    console.log(this.students);

    this.service.getStudentSubjectAll().subscribe(data => {
      this.studentSubject = data;
      console.log(this.studentSubject);
    });


  }

  goTo(page)
  {
    this.router.navigate([page]);
  }

  showErrorMessage = false;

  create = false;
  update = false;
  delete = false;
  stud = false;

  deleteSubjectName = null;

  findSubjectName = null;

  setOption(k)
  {
    this.create = false;
    this.update = false;
    this.delete = false;
    this.stud = false;

    switch(k)
    {
      case 0:
        this.create = true;
        break;
      case 1:
        this.update = true;
        break;
      case 2:
        this.delete = true;
        break;
      case 3:
        this.stud = true;
        break;
    }
  }

  nameOf(code)
  {
    var output = this.subjects.find(element => element.code == code);
    return output.name + " | " + output.code;
  }

  nameOfStudent(username)
  {
    var output = this.students.find(element => element.username == username);
    return output.firstname + " " + output.lastname + " | " + output.index;
  }


  createSubject()
  {
    if (this.subjectCreateForm.invalid) {
      this.showErrorMessage = true;
      return;
    }

    const subject = {
      name: this.subjectCreateForm.value.name,
      semester:  this.subjectCreateForm.value.semester,
      type:  this.subjectCreateForm.value.type,
      studies:  this.subjectCreateForm.value.studies,
      department:  this.subjectCreateForm.value.department,
      code:  this.subjectCreateForm.value.code,
      fond:  this.subjectCreateForm.value.fond,
      espb:  this.subjectCreateForm.value.espb,
      goal:  this.subjectCreateForm.value.goal,
      propositions:  this.subjectCreateForm.value.propositions,
      lab:  this.subjectCreateForm.value.lab,
    };

    this.service.subjectCreate(subject).subscribe(data => {
      console.log(data);
      this.subjectCreateForm.reset();
      console.log("Sam ovde");
      alert("The subject is created successfully");
      this.router.navigate(['/login']);
    },
      err => { console.log(err); });

    //this.subjectCreateForm.reset();

  }

  deleteSubject()
  {

    const subj = {
      code:this.deleteSubjectName
    }
    this.service.deleteSubject(subj).subscribe(data => {
      if(data.message=="Subject deleted!")
      {
        alert("Deleted successfully!");
        location.reload();
      }
      else
        alert("Subject not found!")
    },
      err => {console.log(err); });
  }

  subject:Subject = null;

  getThisSubject()
  {
    const subj = {
      code:this.findSubjectName
    }

    console.log(subj.code);

    this.service.getSubjectsInfo().subscribe(data =>
      {
        var pom = data.find(element => element.code == subj.code);
        if(pom !=null)
        {
          this.subject = pom;
          console.log(this.subject);
          this.setOption(1);
        }
        else
          alert("Subject not found!")
    },
      err => {console.log(err); });
  }

  updateSubject()
  {
    this.service.updateSubject(this.subject).subscribe(data=>
      {
        alert(data.message);
        this.subject = null;
        location.reload();
      });
  }

  addStudentSubject()
  {
    if(this.sub_name == null || this.stud_name == null)
    {
      alert("Please enter all the required fields!");
      return;
    }

    var pom = this.studentSubject.find(element => ((element.code == this.sub_name) && (element.username == this.stud_name)));

    if(pom != null)
    {
      alert("Already subscribed!");
      return;
    }

    var message =
    {
      code: this.sub_name,
      student: this.stud_name
    };

    this.service.subjectSubscribe(message).subscribe(data=>
    {
      alert(data.message);
      location.reload();
    });

  }
}
