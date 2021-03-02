import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent
{
  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  static loggedIn = false;
  static adminLogged = false;
  static studentLogged = false;
  static employeeLogged = false;
  static firstLog = false;

  get firstlog()
  {
    return HeaderComponent.firstLog;
  }

  get logged() {

    return HeaderComponent.loggedIn;
  }

  get alogged() {
    return HeaderComponent.adminLogged;
  }

  get elogged()
  {
    return HeaderComponent.employeeLogged;
  }

  get slogged()
  {
    return HeaderComponent.studentLogged;
  }



  logout(): void
  {
    this.service.logout();
  }

  ngOnInit(): void
  {
    if(localStorage.getItem("username") != null)
      HeaderComponent.loggedIn = true;
    var userType = localStorage.getItem("type");
    if(userType === "Admin")
      HeaderComponent.adminLogged = true;
    if(userType === "Employee")
      HeaderComponent.employeeLogged = true;
    if(userType === "Student")
      HeaderComponent.studentLogged = true;
  }


  goToR(page)
  {
    var s = localStorage.getItem("username");
    this.router.navigate([page +'/' + s]);
  }

  goTo(page)
  {
    this.router.navigate([page]);
  }

}
