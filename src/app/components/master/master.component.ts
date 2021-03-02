import { Component, OnInit } from '@angular/core';
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
  lday:  String,
  ltime:  String,
  eday:  String,
  etime:  String,
  propositions:  String,
  lab:  String
}

interface StudentSubject
{
  username: String,
  code: String
}

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  studentLoged;
  studentSubject: StudentSubject[];

  subjects:Subject[];
  subjectsSem:Subject[][];

  semesters = ['1','2'];
  semes = [0,1];

  si = false;
  rti = false;
  other = false;

  ngOnInit(): void
  {

    this.studentLoged = (localStorage.getItem("type") == "Student");

    this.studentSubject = [];


    this.service.getStudentSubject(localStorage.getItem("username")).subscribe(data =>{
      this.studentSubject = data;
      console.log(this.studentSubject);
    });


    this.subjects=[];
    this.subjectsSem=[];

    for(let i=0;i<8;i++)
    {
      this.subjectsSem[i]=[];
    }

    this.service.getSubjectsMaster().subscribe(data=>
    {
      var k;

      data.forEach(element => {
      k = Number(element.semester) - 1;
      console.log(element.type);
      this.subjectsSem[k].push(element);
      this.subjects.push(element);
      });

    });

    console.log(this.subjects);
  }

  checkIfSubjects(sem) : Boolean
  {
    if(this.subjectsSem[sem].length==0)
      return false;
    else
      return true;
  }

  provera(sem,p): Boolean
  {
    if(p.semester == sem)
      return true;
    return false;
  }

  goTo(sub)
  {
    var k = localStorage.getItem("username");

    var pom = this.studentSubject.find(element => ((element.code == sub.code) && (element.username == k)));

    console.log(pom);

    if(k==null)
    {
      alert("You have to log in to use this feature!");
    }
    else
    {
      if(pom == null && localStorage.getItem("type")=="Student")
      {
        alert("You have to subscribe to this subject to use this feature");
      }
      else
        this.router.navigate(['/subject'+'/'+sub.name]);
    }
  }


  sub(subj)
  {

    var pom = this.studentSubject.find(element =>((element.code == subj.code)&&(element.username == localStorage.getItem("username"))));

    if(pom != null)
    {
      alert("You can't subscribe again on this subject!");
    }
    else
    {
      var message =
      {
        code:subj.code,
        student: localStorage.getItem("username")
      }
      console.log("sub() -> ",message);
      this.service.subjectSubscribe(message).subscribe(data =>{
        alert("Subscribed succsessfully!");
        location.reload();
      });
    }
  }
}
