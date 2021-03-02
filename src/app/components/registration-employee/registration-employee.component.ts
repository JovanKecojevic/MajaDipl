import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

import {Runner} from 'src/app/model/Runner'

@Component({
  selector: 'app-registration-employee',
  templateUrl: './registration-employee.component.html',
  styleUrls: ['./registration-employee.component.css']
})
export class RegistrationEmployeeComponent implements OnInit {


  registerForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    passwordRep: [null, [Validators.required]],
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    birthday: [new Date()],
    mail: [null, [Validators.required]],
  });

  showErrorMessage = false;
  showServerErrorMessage = false;

  constructor(private router: Router, private service: StudentService,private fb: FormBuilder) { }


  register(): void {
    if (this.registerForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.passwordRep) {
      this.showServerErrorMessage = true;
      return;
    }
/*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.registerForm.value.password.match(pattern) === null) {
      this.showErrorMessage = true;
      return;
    }
*/
    const regUser = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      birthday: this.registerForm.value.birthday,
      mail: this.registerForm.value.mail,
      file: this.selectedFile,
      title: (new Date()).getTime().toString(),
      userType: 'Runner'
    };

    this.service.registerUserRequest(regUser).subscribe(data => {
      console.log(data);
      this.registerForm.reset();
      alert("Runner registered successfully!");
      this.router.navigate(['/login']);
    },
      err => { console.log(err); });

    this.registerForm.reset();
  }

  back(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  selectedFile:File;


  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];

    console.log(this.selectedFile);
    console.log(this.selectedFile.name);
    /*
    const reader = new FileReader();
    reader.onload = () => {
      this.fajlURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile);
    */
  }

}
