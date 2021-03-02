import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';
import { EmployeeComponent } from '../employee/employee.component';


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
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}


  groups : Group[];
  createG : Group;
  deleteG : Group;

  subjects:Subject[];

  checked = false;

  employees : Employee[];

  ngOnInit(): void
  {
    this.groups = [];
    this.subjects = [];
    this.employees = [];
    this.createG =
    {
      username: "",
      group: "",
      code: "",
      day:"",
      time:""
    };
    this.deleteG =
    {
      username: "",
      group: "",
      code: "",
      day:"",
      time:""
    };

    this.service.getGroups().subscribe(data =>{
      data.forEach(element => {
          this.groups.push(element);
      });
    });


    this.service.getSubjects().subscribe(data=>{
      data.forEach(element => {
        this.subjects.push(element);
    });
    })

    this.service.getSubjectsMaster().subscribe(data=>{
      data.forEach(element => {
        this.subjects.push(element);
    });
    })

    this.service.getEmployees().subscribe(data=>{
      data.forEach(element => {
        this.employees.push(element);
    });
    });

    console.log(this.employees);

  }

  goTo(page)
  {
    this.router.navigate([page]);
  }

  showErrorMessage = false;

  create = false;
  delete = false;



  setOption(k)
  {
    this.create = false;
    this.delete = false;

    switch(k)
    {
      case 0:
        this.create = true;
        break;
      case 2:
        this.delete = true;
        break;
    }
  }

  createGroup()
  {
    console.log(this.createG);
    if(this.createG.code=="" || this.createG.group == "" || this.createG.username == "" || this.createG.day == "" || this.createG.time == "")
    {
      this.checked = true;
      return;
    }

    var pom1 = this.subjects.find(element => (element.code == this.createG.code));

    if(pom1==null)
    {
      alert("Subject doesn't exist!");
      return;
    }

    var pom2 = this.employees.find(element => (element.username == this.createG.username));

    if(pom2==null)
    {
      alert("Employee doesn't exist!");
      return;
    }

    var pom = this.groups.find(element => ((element.code == this.createG.code)&&(element.group == this.createG.group)&&(element.username == this.createG.username)));

    if(pom != null)
    {
      alert("Already exists!");
    }
    else
    {
      this.service.createGroup(this.createG).subscribe(data=>{
        console.log(data);
        if(data.tip == 1)
          alert("Group successfully created!");
        location.reload();
      });
    }

  }

  checkedD = false;



  deleteGroup()
  {
    console.log(this.deleteG);
    if(this.deleteG.code=="" || this.deleteG.group == "" || this.deleteG.username == "")
    {
      this.checkedD = true;
      return;
    }

    var pom1 = this.subjects.find(element => (element.code == this.deleteG.code));

    if(pom1==null)
    {
      alert("Subject doesn't exist!");
      return;
    }

    var pom2 = this.employees.find(element => (element.username == this.deleteG.username));

    if(pom2==null)
    {
      alert("Employee doesn't exist!");
      return;
    }

    this.service.deleteGroup(this.deleteG).subscribe(data=>{
      console.log(data);

      if(data.tip == 2)
        alert(data.message);
        else
      {
        alert(data.message);
        location.reload();
      }
    });

  }


/*
  subject:Subject = null;

  getThisSubject()
  {
    const subj = {
      code:this.findSubjectName
    }

    console.log(subj.code);

    this.service.getSubjects().subscribe(data =>
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
  */
}
