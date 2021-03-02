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
  selector: 'app-bachelor',
  templateUrl: './bachelor.component.html',
  styleUrls: ['./bachelor.component.css']
})
export class BachelorComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}


  studentLoged;
  studentSubject: StudentSubject[];


  subjects:Subject[];
  subjectsSem:Subject[][];

  subjectsSemSi:Subject[][];
  subjectsSemRti:Subject[][];
  subjectsSemOther:Subject[][];

  semesters = ['1','2','3','4','5','6','7','8'];
  semes = [0,1,2,3,4,5,6,7];

  si = false;
  rti = false;
  other = false;

  ngOnInit(): void
  {

    this.studentLoged = (localStorage.getItem("type") == "Student");

    this.studentSubject = [];

    var pom = localStorage.getItem("username");

    if(pom!=null)
    {
      this.service.getStudentSubject(pom).subscribe(data =>{
        this.studentSubject = data;
        console.log(this.studentSubject);
      });
    }

    this.subjects=[];
    this.subjectsSem=[];
    this.subjectsSemSi=[];
    this.subjectsSemRti=[];
    this.subjectsSemOther=[];

    for(let i=0;i<8;i++)
    {
      this.subjectsSem[i]=[];
      this.subjectsSemSi[i]=[];
      this.subjectsSemRti[i]=[];
      this.subjectsSemOther[i]=[];
    }

    this.service.getSubjects().subscribe(data=>
    {
      var k;

      data.forEach(element => {
      k = Number(element.semester) - 1;
      console.log(element.type);
      this.subjectsSem[k].push(element);

      if(element.department=="Software Engineering")
        this.subjectsSemSi[k].push(element);
      else
      {
        if(element.department=="RTI")
          this.subjectsSemRti[k].push(element);
        else
          this.subjectsSemOther[k].push(element);
      }

      this.subjects.push(element);
      });

    });
  }

  /*
  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }
  */
  checkIfSubjectsSi(sem) : Boolean
  {
    if(this.subjectsSemSi[sem].length==0)
      return false;
    else
      return true;
  }


  checkIfSubjectsRti(sem) : Boolean
  {
    if(this.subjectsSemRti[sem].length==0)
      return false;
    else
      return true;
  }


  checkIfSubjectsOther(sem) : Boolean
  {
    if(this.subjectsSemOther[sem].length==0)
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

  postavi(n)
  {
    this.si = false;
    this.rti = false;
    this.other = false;

    switch (n)
    {
      case 0:
        this.si=true;
        break;
      case 1:
        this.rti=true;
        break;
      case 2:
        this.other=true;
        break;
    }
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

    var pom = this.studentSubject.find(element => ((element.code == subj.code)&&(element.username == localStorage.getItem("username"))));

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
