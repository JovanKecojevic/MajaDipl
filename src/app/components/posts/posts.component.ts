import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from 'src/app/service/studentService.service';

import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatExpansionModule} from "@angular/material/expansion"
import {MatRadioModule} from "@angular/material/radio"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from 'src/app/header/header.component';


interface Post
{
  title: string;
  content: string;
  date: Date;
  type: string;
}



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private router: Router, private service: StudentService, private fb: FormBuilder) {}

  /*
  postForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    type: new FormControl('', Validators.required)
  });*/

  postForm = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    date: [new Date()]
  });

  types: string[] =
  [
    "Competition",
    "Conference",
    "Internship",
    "Job"
  ]

  competitions: Post[] = null;
  conferences: Post[] = null;
  internships: Post[] = null;
  jobs: Post[] = null;


  newPostType = null;

  showErrorMessage = false;
  showErrorPassword = false;

  getDate(tp:any): string
  {
    var dateObj = new Date(tp.date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return day+"/"+month+"/"+year;
  }

  competitionsBool() : Boolean
  {
    if(this.competitions == null || this.competitions.length === 0)
      return false;
    return true;
  }

  conferencesBool() : Boolean
  {
    if(this.conferences == null || this.conferences.length === 0)
      return false;
    return true;
  }

  internshipsBool() : Boolean
  {
    if(this.internships == null || this.internships.length === 0)
      return false;
    return true;
  }

  jobsBool() : Boolean
  {
    if(this.jobs == null || this.jobs.length === 0)
      return false;
    return true;
  }

  adminLogged() : Boolean
  {
    if(HeaderComponent.adminLogged)
      return true;
    return false;
  }

  ngOnInit(): void
  {
    this.service.getPosts().subscribe(data=>{
      this.competitions=[];
      this.conferences=[];
      this.internships=[];
      this.jobs=[];
      data.forEach(emp => {
      if(emp.postType === "Competition")
      this.competitions.push(emp);
      if(emp.postType === "Conference")
      this.conferences.push(emp);
      if(emp.postType === "Internship")
        this.internships.push(emp);
      if(emp.postType === "Job")
        this.jobs.push(emp);
      console.log(emp.date);
      });
    }, err =>
    {
      console.log(err);
    })
  }

  radioChange(event : any)
  {
      this.newPostType = event.target.value;
  }

  createPost():void
  {
    if (this.postForm.invalid)
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
    const post =
    {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        date: this.postForm.value.date,
        type: this.newPostType,
        subject: "POST"
    };

    console.log(post);
    this.service.createPost(post).subscribe(data => {
      console.log(data);
      this.postForm.reset();
    },
      err => { console.log(err); });

    this.postForm.reset();
  }

}
