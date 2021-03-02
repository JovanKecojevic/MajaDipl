import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { StudentService } from 'src/app/service/studentService.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private router: Router, private service: StudentService) {}

  ngOnInit(): void {
  }

  showErrorMessage = false;

  loginForm: FormGroup = new FormGroup({
    oldpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    newpasswordRetyped: new FormControl('', Validators.required)
  });

  setNewPassword(): void
  {
    if (this.loginForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    if (this.loginForm.value.newpassword !== this.loginForm.value.newpasswordRetyped) {
      this.showErrorMessage = true;
      return;
    }
    /*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;
    if (this.registerEmpForm.value.password.match(pattern) === null) {
      this.showPasswordPatternErrorMessage = true;
      return;
    }
    this.showPasswordPatternErrorMessage = false;
    */
    const pw = {
      username: localStorage.getItem("username"),
      type: localStorage.getItem("type"),
      oldpassword: this.loginForm.value.oldpassword,
      newpassword: this.loginForm.value.newpassword
    };
    console.log("Ovako izgleda pw u komponenti: ", pw);

    this.service.changePassword(pw).subscribe(data => {

      if(data.message == "Successfully updated user!")
      {
        console.log(data);
        if(HeaderComponent.firstLog)
        {
          HeaderComponent.firstLog = false;
          this.service.logout();
        }
        this.loginForm.reset();
        alert("Password changed successfullly!");
        if(localStorage.getItem("type") == "Employee")
          this.router.navigate(['/profile/' + JSON.parse(localStorage.getItem("user")).username]);
      }
      else
        alert(data.message);
    },
      err => { console.log(err.message); });

    this.loginForm.reset();
  }
}
