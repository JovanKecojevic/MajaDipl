import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';

import {Race} from 'src/app/model/Race';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  races:Race[] = [];

  showErrorMessage = false;
  showServerErrorMessage = false;

  constructor(private router: Router, private service: StudentService,private fb: FormBuilder) { }




  ngOnInit(): void
  {
    this.service.getRaces().subscribe(data =>{
      data.forEach(element => {
        if((new Date(element.date).getTime() > (new Date()).getTime()))
        this.races.push(element);
      });
      console.log(this.races);
      this.races.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      console.log(this.races);
    });
  }

  selectedFile:File;
  //majam


  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];

    console.log(this.selectedFile);
    console.log(this.selectedFile.name);
  }

  getDateFormat(tp:any): string
  {
    var dateObj = new Date(tp.date);
    dateObj.setDate(dateObj.getDate()+1);

    var month = dateObj.getUTCMonth()+1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return day+"/"+month+"/"+year;
  }

  goTo(tp)
  {
    localStorage.setItem("race",JSON.stringify(tp));



    this.router.navigate(['/race/'+tp._id]);
  }

}
