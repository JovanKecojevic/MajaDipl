import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

@Component({
  selector: 'app-race-create',
  templateUrl: './race-create.component.html',
  styleUrls: ['./race-create.component.css']
})
export class RaceCreateComponent implements OnInit {

  raceForm = this.fb.group({
    name: [null, [Validators.required]],
    date: [new Date()],
    location: [null, [Validators.required]],
    description: [null, [Validators.required]],
    address: [null, [Validators.required]],
    price: [null, [Validators.required]]
  });

  showErrorMessage = false;
  showServerErrorMessage = false;

  constructor(private router: Router, private service: StudentService,private fb: FormBuilder) { }


  createRace(): void {
    if (this.raceForm.invalid || this.selectedFile == null) {
      this.showErrorMessage = true;
      return;
    }
/*
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.raceForm.value.password.match(pattern) === null) {
      this.showErrorMessage = true;
      return;
    }
*/
    const race = {
      name: this.raceForm.value.name,
      date: this.raceForm.value.date,
      address: this.raceForm.value.address,
      location: this.raceForm.value.location,
      description: this.raceForm.value.description,
      organizer: localStorage.getItem("username"),
      price: this.raceForm.value.price,
      file: this.selectedFile,
      title: (new Date()).getTime().toString(),
    };

    this.service.createRace(race).subscribe(data => {
      console.log(data);
      this.raceForm.reset();
      alert("Race created successfully!");
      this.router.navigate(['/home']);
    },
      err => { console.log(err); });

    this.raceForm.reset();
  }

  ngOnInit(): void {
  }

  selectedFile:File;


  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];

    console.log(this.selectedFile);
    console.log(this.selectedFile.name);
  }
}
