import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

interface Files
{
  id:String,
  filePath:  String,
  title:String,
  date: Date,
  subjectName:String,
  author:String,
  authorName:String,
  post:String,
  size:String
}

interface Employee
{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  website: string;
  personal: string;
  title: string;
  cabinet: string;
  status: string;
  imagePath:string;
}


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService,private http:HttpClient) {}

  fajlURL: string;

  selectedFile:File = null;
  fajl = null;

  groups:Group[] = [];

  subject:Subject[] = [];

  subjects:Subject[] = [];

  employees:Employee[] = [];

  fajlovi:Files[] = [];

  titleFile = "";

  ngOnInit(): void
  {

    var k = this.route.snapshot.paramMap.get('id');

    this.service.getSubjectsInfo().subscribe(data =>{
      data.forEach(element => {
        this.subjects.push(element);
        if(element.name == k)
        {
          this.subject.push(element);
        }
      });
    });

    this.service.getGroups().subscribe(data =>{
      data.forEach(element => {
          this.groups.push(element);
      });
    });

    this.service.getEmployees().subscribe(data=>{
      data.forEach(element => {
        this.employees.push(element);
    });
    });

    this.service.getFiles().subscribe(data=>{
      data.forEach(element => {
        if(element.subjectName == k && element.type=="Exams")
        {
          this.fajlovi.push(element);
        }
    });
    this.fajlovi.sort((b,a) => a.date.toLocaleString().localeCompare(b.date.toLocaleString() ));

    });



    console.log(this.fajlovi);

  }

  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }



  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];

    console.log(this.selectedFile);
    console.log(this.selectedFile.name);


    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      this.fajlURL = reader.result as string;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile()
  {
    console.log(this.titleFile);

    var us = JSON.parse(localStorage.getItem("user"));

    var message =
    {
      id: Date.now().toLocaleString(),
      title: this.titleFile,
      file: this.selectedFile,
      date: new Date(),
      subjectName: this.subject[0].name,
      author: us.username,
      authorName: us.firstname + " " + us.lastname,
      type:"Exams"
    }

    console.log(message.file);

    this.service.uploadFile(message).subscribe(data=>
      {
        console.log(data);
        alert("Successfully uploaded file!");
        location.reload();
      });

  }

  employeeSubject()
  {
      var pom = this.groups.find(element=> (element.username==localStorage.getItem("username")) &&(element.code == this.subject[0].code))

      if(pom == null)
        return false;
      else
        return true;
  }

  getDate(tp)
  {
    var dateObj = new Date(tp.date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return day+"/"+month+"/"+year;
  }

  getKB(bytes)
  {
    return Number(bytes/1024);
  }

  preview(tp)
  {
    var win = window.open(tp.filePath, '_blank');
    win.focus();
  }

  deleteFile(tp)
  {
    this.service.deleteFile(tp).subscribe(data =>{
      alert("Succsessfully deleted!");
      location.reload();
    });
  }
}
