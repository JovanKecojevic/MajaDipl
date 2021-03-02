import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router, private service: StudentService) {}

  registerStForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRep: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    index: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  registerStFormUpdate: FormGroup;

  registerEmpForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRep: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl(''),
    website: new FormControl(''),
    personal: new FormControl(''),
    title: new FormControl('', Validators.required),
    cabinet: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    imagePath: new FormControl('')
  });

  registerEmpFormUpdate: FormGroup;

  deleteForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  showErrorMessage =  false;
  showErrorPassword = false;
  showMessageSelectDeleteType = true;
  showMessageSelectUpdateType = true;

  foundUser = false;

  alterType: string = null;

  createType: string = null;
  deleteType: string = null;
  updateType: string = null;

  types: string[] =
  [
    'Create Student',
    'Create Employee'
  ];
// Ubaci radio button na html pitaj kog je tipa ovaj kog brises i onda dodaj to u kontroler da ga pitas
//da ga zna odakle bi brisao + ubaci userType kroz zahteve ->servis->...
  typesDelete: string[] =
  [
    'Delete Student',
    'Delete Employee'
  ];

  typesUpdate: string[] =
  [
    'Update Student',
    'Update Employee'
  ];

  typesAlter: string[] =
  [
    'Delete User',
    'Update User'
  ];

  radioChangeHandler(event : any)
  {
      this.createType = event.target.value;
  }

  radioChangeHandlerDelete(event : any)
  {
      this.deleteType = event.target.value;
  }

  radioChangeHandlerUpdate(event : any)
  {
      this.updateType = event.target.value;
  }

  radioChangeHandlerAlter(event : any)
  {
      this.alterType = event.target.value;
  }

  registerStudent(): void {
    if (this.registerStForm.invalid)
    {
      this.showErrorMessage = true;
      return;
    }
    this.showErrorMessage = false;

    if (this.registerStForm.value.password !== this.registerStForm.value.passwordRep) {
      this.showErrorPassword = true;
      return;
    }
    this.showErrorPassword = false;

    /*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;
    if (this.registerStForm.value.password.match(pattern) === null) {
      this.showPasswordPatternErrorMessage = true;
      return;
    }
    this.showPasswordPatternErrorMessage = false;
    */
      const student = {
      username: this.registerStForm.value.username,
      password: this.registerStForm.value.password,
      firstname: this.registerStForm.value.firstname,
      lastname: this.registerStForm.value.lastname,
      index: this.registerStForm.value.index,
      type: this.registerStForm.value.type,
      status: this.registerStForm.value.status,
      userType: 'Student'
    };

    console.log(student);
    this.service.registerStudentRequestAdmin(student).subscribe(data => {
      console.log(data);
      this.registerStForm.reset();
      this.router.navigate(['/admin']);
    },
      err => { console.log(err); });

    this.registerStForm.reset();
  }

  registerEmployee(): void {
    if (this.registerEmpForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    if (this.registerEmpForm.value.password !== this.registerEmpForm.value.passwordRep) {
      this.showErrorPassword = true;
      return;
    }
    /*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.registerEmpForm.value.password.match(pattern) === null) {
      this.showErrorMessage = true;
      return;
    }
    */
    const regUser = {
      firstname: this.registerEmpForm.value.firstname,
      lastname: this.registerEmpForm.value.lastname,
      username: this.registerEmpForm.value.username,
      password: this.registerEmpForm.value.password,
      status: this.registerEmpForm.value.status,
      website: this.registerEmpForm.value.website,
      personal: this.registerEmpForm.value.personal,
      cabinet: this.registerEmpForm.value.cabinet,
      title: this.registerEmpForm.value.title,
      phone: this.registerEmpForm.value.phone,
      address: this.registerEmpForm.value.address,
      userType: 'Employee',
      imagePath: this.registerEmpForm.value.imagePath
    };

    this.service.registerEmployeeRequestAdmin(regUser).subscribe(data => {
      console.log(data);
      this.registerEmpForm.reset();
      this.router.navigate(['/admin']);
    },
      err => { console.log(err); });

    this.registerEmpForm.reset();
  }

  createEmployee(): Boolean{
    if (this.createType==="Create Employee")
      return true;
    return false;
  }

  createStudent(): Boolean{
    if (this.createType==="Create Student")
      return true;
    return false;
  }

  deleteTypeMethod(): Boolean{
    if (this.alterType === "Delete User")
      return true;
    return false;
  }

  updateTypeMethod(): Boolean{
    if (this.alterType === "Update User")
      return true;
    return false;
  }


  updateTypeMethodStudent(): Boolean{
    if (this.updateType === "Update Student")
      return true;
    return false;
  }


  updateTypeMethodEmployee(): Boolean{
    if (this.updateType === "Update Employee")
      return true;
    return false;
  }


  deleteUser(): void
  {
    this.showMessageSelectDeleteType = false;
    if (this.deleteForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    var k:string = null;

    if(this.deleteType === "Delete Student")
    {
      k = "Student";
    }
    if(this.deleteType === "Delete Employee")
    {
      k = "Employee";
    }


    const delUser = {
      username: this.deleteForm.value.username,
      userType: k
    }

    console.log(delUser);

    if(k !== null)
    {
      this.showMessageSelectDeleteType = false;
      this.service.deleteUser(delUser).subscribe(data => {
        console.log(data);
        this.deleteForm.reset();
        this.router.navigate(['/admin']);
      },
        err => { console.log(err); });
    }
    else
    {
      this.showMessageSelectDeleteType = true;
    }
  }

  updateUser(): void
  {
    this.showMessageSelectUpdateType = false;
    if (this.updateForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    var k:string = null;

    if(this.updateType === "Update Student")
    {
      k = "Student";
    }
    if(this.updateType === "Update Employee")
    {
      k = "Employee";
    }

    const delUser = {
      username: this.updateForm.value.username,
      userType: k
    }

    console.log(delUser);

    if(k !== null)
    {
      this.showMessageSelectUpdateType = false;
      this.service.updateUser(delUser).subscribe(data =>
      {
        console.log(data);
        this.foundUser = true;
        if(this.updateType === "Update Student")
        {
          this.initializeStudentForm(data);
        }
        if(this.updateType === "Update Employee")
        {
          this.initializeEmployeeForm(data);
        }

        //this.router.navigate(['/admin']);
      },
        err => { console.log(err); });
    }
    else
    {
      this.showMessageSelectUpdateType = true;
    }
  }

  putStudent():void
  {
    if (this.registerStFormUpdate.invalid)
    {
      this.showErrorMessage = true;
      return;
    }
    this.showErrorMessage = false;
    /*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;
    if (this.registerStForm.value.password.match(pattern) === null) {
      this.showPasswordPatternErrorMessage = true;
      return;
    }
    this.showPasswordPatternErrorMessage = false;
    */
      const student = {
      username: this.registerStFormUpdate.value.username,
      password: this.registerStFormUpdate.value.password,
      firstname: this.registerStFormUpdate.value.firstname,
      lastname: this.registerStFormUpdate.value.lastname,
      index: this.registerStFormUpdate.value.index,
      type: this.registerStFormUpdate.value.type,
      status: this.registerStFormUpdate.value.status,
      userType: 'Student'
    };

    console.log(student);
    this.service.putUser(student).subscribe(data => {
      console.log(data);
      this.registerStForm.reset();
      this.router.navigate(['/admin']);
    },
      err => { console.log(err); });

    this.registerStForm.reset();
  }

  putEmployee():void
  {
    if (this.registerEmpFormUpdate.invalid) {
      this.showErrorMessage = true;
      return;
    }
    /*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.registerEmpForm.value.password.match(pattern) === null) {
      this.showErrorMessage = true;
      return;
    }
    */
    const regUser = {
      firstname: this.registerEmpFormUpdate.value.firstname,
      lastname: this.registerEmpFormUpdate.value.lastname,
      username: this.registerEmpFormUpdate.value.username,
      password: this.registerEmpFormUpdate.value.password,
      status: this.registerEmpFormUpdate.value.status,
      website: this.registerEmpFormUpdate.value.website,
      personal: this.registerEmpFormUpdate.value.personal,
      cabinet: this.registerEmpFormUpdate.value.cabinet,
      title: this.registerEmpFormUpdate.value.title,
      phone: this.registerEmpFormUpdate.value.phone,
      address: this.registerEmpFormUpdate.value.address,
      userType: 'Employee',
      imagePath: this.registerEmpFormUpdate.value.imagePath
    };

    this.service.putUser(regUser).subscribe(data => {
      console.log(data);
      this.registerEmpForm.reset();
      this.router.navigate(['/admin']);
    },
      err => { console.log(err); });

    this.registerEmpForm.reset();
  }

  initializeStudentForm(data): void
  {
    this.registerStFormUpdate= new FormGroup({
      username: new FormControl(data.username, Validators.required),
      password: new FormControl(data.password, Validators.required),
      firstname: new FormControl(data.firstname, Validators.required),
      lastname: new FormControl(data.lastname, Validators.required),
      index: new FormControl(data.index, Validators.required),
      type: new FormControl(data.type, Validators.required),
      status: new FormControl(data.status, Validators.required)
    });
  }

  initializeEmployeeForm(data): void
  {
    this.registerEmpFormUpdate= new FormGroup({
      username: new FormControl(data.username, Validators.required),
      password: new FormControl(data.password, Validators.required),
      firstname: new FormControl(data.firstname, Validators.required),
      lastname: new FormControl(data.lastname, Validators.required),
      address: new FormControl(data.address, Validators.required),
      phone: new FormControl(data.phone),
      website: new FormControl(data.website),
      personal: new FormControl(data.personal),
      title: new FormControl(data.title, Validators.required),
      cabinet: new FormControl(data.cabinet, Validators.required),
      status: new FormControl(data.status, Validators.required),
      imagePath: new FormControl(data.imagePath)
    });
  }

  goTo(pageName)
  {
    this.router.navigate([pageName]);
  }
}
