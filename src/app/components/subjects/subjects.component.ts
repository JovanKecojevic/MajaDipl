import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

interface Group
{
  group: String,
  code: String,
  username:String,
  day:String,
  time:String
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  subjects:Subject[];
  subjectsSem:Subject[][];
  groups : Group[] =null;

  semesters = ['1','2','3','4','5','6','7','8'];
  semes = [0,1,2,3,4,5,6,7];

  sub_name = null;
  subject:Subject = null;

  checked = false;

  ngOnInit(): void
  {
    this.subjects=[];
    this.subjectsSem=[];
    this.groups = [];

    for(let i=0;i<8;i++)
    {
      this.subjectsSem[i]=[];
    }

    this.service.getSubjectsInfo().subscribe(data=>
    {
      var k;

      data.forEach(element => {
      k = Number(element.semester) - 1;
      console.log(k);
      this.subjectsSem[k].push(element);
      this.subjects.push(element);
      });
    });

    this.service.getGroups().subscribe(data =>{
      data.forEach(element => {
          if(element.username == localStorage.getItem("username"))
            this.groups.push(element);
      });
    });

  }

  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }

  alter()
  {
    if(this.sub_name==null || this.sub_name=="null") alert("Please select the subject!");
    else
    {
      this.subjects.forEach(element => {
        if(element.code == this.sub_name)
        {
          this.subject = element;
          this.checked = true;
        }
      });
    }
  }

  nameOf(code)
  {
    var output = this.subjects.find(element => element.code == code);
    return output.name + " | " + output.code;
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

  updateSubject()
  {
    this.service.updateSubject(this.subject).subscribe(data=>
      {
        alert(data.message);
        this.checked = false;
      });
  }

}
