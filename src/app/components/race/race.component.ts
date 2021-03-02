import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Race } from 'src/app/model/Race';
import { Runner } from 'src/app/model/Runner';
import { StudentService } from 'src/app/service/studentService.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  race:Race = null;
  org:Runner = null;

  showErrorMessage = false;
  showServerErrorMessage = false;

  constructor(private route:ActivatedRoute, router: Router, private service: StudentService,private fb: FormBuilder) { }

  ngOnInit(): void
  {
    /*
    this.service.getRaces().subscribe(data =>{
      data.forEach(element => {
        if(element._id == this.route.snapshot.paramMap.get("id"))
          this.race = element;
      });
      console.log(this.race);
    });

    this.service.getUsers().subscribe(data=>{
      data.forEach(element => {
        if(element._id == this.route.snapshot.paramMap.get("id"))
          this.race = element;
      });
      console.log(this.race);
    }); */
    this.race = JSON.parse(localStorage.getItem("race"));
    this.service.getUsers().subscribe(data=>{
      data.forEach(element => {
        if(element.username == this.race.organizer)
          this.org = element;
          console.log(this.org);
        });
    });

    console.log(this.race);

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



}
