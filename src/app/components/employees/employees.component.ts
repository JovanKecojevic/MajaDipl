import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

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
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private router: Router, private service: StudentService) {}



  employees: Employee[] = null;


  ngOnInit(): void
  {

    this.service.getEmployees().subscribe(data=>{
      this.employees=[];
      data.forEach(emp => {
        this.employees.push(emp);
      });
    }, err => {
      console.log(err);
    })
  }

  empPage(tp):void
  {
    localStorage.setItem("profile",JSON.stringify(tp));
    this.router.navigate(['/profile/'+tp.username]);
  }

  getPhoto(path:String):String
  {
    var output:String = "../../assets/";
    if(path == null || path.length==0)
    {
      output = output+"user.png";
    }
    else
    {
      output=output+""+path;
    }
    return output;
  }
}
