import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/studentService.service';


interface Subject
{
  name: String,
  semester:  String,
  type:  String,
  studies:  String,
  department:  String,
  code:  String,
  fond:  String,
  espb:  String,
  goal:  String,
  propositions:  String,
  lab:  String
}

interface Group
{
  group: String,
  code: String,
  username:String,
  day:String,
  time:String
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  otherUser = JSON.parse(localStorage.getItem("profile"));
  myProfile = false;

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  subjects : Subject[] = null;
  groups : Group[] =null;

  registerEmpForm: FormGroup

  ngOnInit(): void
  {
    this.subjects = [];
    this.groups = [];
    if(this.user == null) this.myProfile = false;
    else
    {
      if(this.user.username == this.route.snapshot.paramMap.get("username"))
      {
        this.myProfile = true;
        this.registerEmpForm = new FormGroup({
          firstname: new FormControl(this.user.firstname, Validators.required),
          lastname: new FormControl(this.user.lastname, Validators.required),
          address: new FormControl(this.user.address, Validators.required),
          phone: new FormControl(this.user.phone),
          website: new FormControl(this.user.website),
          personal: new FormControl(this.user.personal),
          title: new FormControl(this.user.title, Validators.required),
          cabinet: new FormControl(this.user.cabinet, Validators.required),
          status: new FormControl(this.user.status, Validators.required)
        });
      }
      else
      {
        this.myProfile = false;
      }
    }
    this.service.getSubjectsInfo().subscribe(data =>{
      data.forEach(element => {
        this.subjects.push(element);
      });
    });

    var profileName = "";

    if(this.myProfile)
      profileName = this.user;
    else
      profileName = this.otherUser;


    this.service.getGroups().subscribe(data =>{
      data.forEach(element => {
        if(this.otherUser.username == element.username)
            this.groups.push(element);
      });
    });

    console.log(this.groups);
  }

  nameOf(code)
  {
    return this.subjects.find(element => element.code == code).name;
  }

  getPhoto(): String
  {
    if(this.myProfile)
    {
      if(this.user.imagePath != null && this.user.imagePath.length != 0)
        return "../../assets/" + this.user.imagePath;
      else
        return "../../assets/user.png";
    }
    else
    {
      if(this.otherUser.imagePath != null && this.otherUser.imagePath.length != 0)
        return "../../assets/" + this.otherUser.imagePath;
      else
        return "../../assets/user.png";
    }

  }

  submit()
  {
    if(this.user!=null)
    {    this.user.firstname =  this.registerEmpForm.value.firstname;
    this.user.lastname = this.registerEmpForm.value.lastname;
    this.user.status = this.registerEmpForm.value.status;
    this.user.website = this.registerEmpForm.value.website;
    this.user.personal = this.registerEmpForm.value.personal;
    this.user.cabinet = this.registerEmpForm.value.cabinet;
    this.user.title = this.registerEmpForm.value.title;
    this.user.phone = this.registerEmpForm.value.phone;
    this.user.address = this.registerEmpForm.value.address;

    this.service.putUser(this.user).subscribe(data => {
      console.log(data);
      alert("My profile is changed successfully!");
    },
      err => { console.log(err); });
  }
  }

}
