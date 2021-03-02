import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showErrorMessage = false;
  showServerErrorMessage = false;
  showErrorMessageRadio = false;

  loginType:string = "Admin";

 types: string[] =
 [
  'Runner',
  'Organiser'
 ];

 radioChangeHandler(event : any)
 {
    this.loginType = event.target.value;
 }

  constructor(private router: Router, private service: StudentService) {}

  login(): void {
    this.loginFormCheck();
    const userTry = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      userType: this.loginType
    };

    const username = this.loginForm.value.username;

    this.service.login(userTry).subscribe(data => {
      this.service.setCredentials(username, this.loginType);
      localStorage.setItem("user",JSON.stringify(data.us));
      this.service.nextPage(data);
      this.showErrorMessage = false;
    },
      err => {
        console.log(err.message);
        this.showErrorMessage = true;
      });

    this.loginForm.reset();
    console.log(this.loginType);
  }

  registerEmp(): void {
    this.router.navigate(['/registration-employee']);
  }

  registerSt(): void {
    this.router.navigate(['/registration-student']);
  }

  loginFormCheck(): void
  {
    if (this.loginForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    else
    {
      this.showErrorMessage = false;
    }
    if(this.loginType == "")
    {
      this.showErrorMessageRadio = true;
      return;
    }
    else
    {
      this.showErrorMessageRadio = false;
    }
  }

  get loged()
  {
    var k = localStorage.getItem("username");
    if(k==null || k.length == 0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
}
