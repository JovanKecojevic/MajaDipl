import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Subject } from 'rxjs';
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

interface Employee
{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  website: string;
  personal: string;
  title: string;
  cabinet: string;
  status: string;
  imagePath:string;
}

@Component({
  selector: 'app-sub-info',
  templateUrl: './sub-info.component.html',
  styleUrls: ['./sub-info.component.css']
})
export class SubInfoComponent implements OnInit {


constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}


  subject : Subject[] = null;
  subjects : Subject[] = null;
  groups : Group[] =null;
  employees : Employee[] = null;


  ngOnInit(): void
  {
    var k = this.route.snapshot.paramMap.get('id');

    this.subject = [];
    this.subjects = [];
    this.groups = [];
    this.employees = [];


    this.service.getSubjectsInfo().subscribe(data =>{
      data.forEach(element => {
        this.subjects.push(element);
        if(element.name == k)
        {
          this.subject.push(element);
        }
      });
    });

    this.service.getGroups().subscribe(data =>{
      data.forEach(element => {
          this.groups.push(element);
      });
    });

    this.service.getEmployees().subscribe(data=>{
      data.forEach(element => {
        this.employees.push(element);
    });
    });
  }

  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }

  goToEmp(page)
  {
    localStorage.setItem("profile",JSON.stringify(this.employees.find(data => data.username == page)));
    this.router.navigate(['/profile/'+page]);
  }

  lectures(code)
  {
    var groups:Group[]= [];

    this.groups.forEach(data => {
      if(data.code == code)
        groups.push(data);
    });

    return groups;
  }

  nameOf(us)
  {
    var output = this.employees.find(element => element.username == us);

    return output.firstname + " " + output.lastname;
  }

}
