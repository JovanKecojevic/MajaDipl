import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from 'src/app/service/studentService.service';

interface Post
{
  title: string;
  content: string;
  date: Date;
  type: string;
  author: String;
  authorName: String;
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
  size:String,
  type:String
}

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
  lday:  String,
  ltime:  String,
  eday:  String,
  etime:  String,
  propositions:  String,
  lab:  String
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService) {}

  subject : Subject[] = null;

  currentDate: Date = new Date();
  week = this.currentDate.getDate() - 7;
  weekAgo: Date = new Date();
  toCmp: Date = new Date();

  posts: Post[] = null;
  postsNewer: Post[] = null;
  postsToShow: Post[] = null;

  filesPost: Files[] = [];

  selectedFile:File;

  map = new Map<string, Files[]>();

  getDate(tp:any): string
  {
    var dateObj = new Date(tp.date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return day+"/"+month+"/"+year;
  }


  ngOnInit(): void
  {
    var pom = false;

    var k = this.route.snapshot.paramMap.get('id');
    this.subject = [];

    this.weekAgo.setDate(this.week);

    this.service.getSubjectsInfoPosts().subscribe(data =>{
      data.forEach(element => {
        if(element.name == k)
        {
          this.subject.push(element);
        }
      });
    });

    console.log(this.subject);

    this.service.getPosts().subscribe(data=>{
      this.posts = [];
      this.postsNewer = [];

      console.log(data);

      var nadjen = null;

      for(let i=0;i<this.subject.length;i++)
      {
        nadjen = data.find(element => element.subject == this.subject[i].code);
      }
      console.log(nadjen);

      data.forEach(emp => {
        for(let i=0;i<this.subject.length;i++)
        {
          if(emp.subject === this.subject[i].code)
          {
            this.posts.push(emp);
            if(new Date(emp.date).getTime() > this.weekAgo.getTime())
            {
              this.postsNewer.push(emp);
            }
          }
        }
      });
      if(this.posts.length == 0) console.log("Prazan je");

      this.posts.sort((b,a) => a.date.toLocaleString().localeCompare(b.date.toLocaleString() ));
      this.postsNewer.sort((b,a) => a.date.toLocaleString().localeCompare(b.date.toLocaleString() ));
      this.postsToShow = this.postsNewer;
    }, err =>
    {
      console.log(err);
    });

    this.service.getFiles().subscribe(data =>{

      data.forEach(element => {
        if(element.type=="Post")
        {
          this.filesPost.push(element);
        }
      });
    });

  }

  moreOrLess:string = "Show posts older than a week";

  changeML(): void
  {
    if(this.moreOrLess === "Show posts older than a week")
    {
      this.moreOrLess = "Show less";
      this.postsToShow = this.posts;
    }
    else
    {
      this.moreOrLess = "Show posts older than a week";
      this.postsToShow = this.postsNewer;
    }
  }

  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }

  logovanUsername(author)
  {
    return (localStorage.getItem("username") == author);
  }

  deletePost(post)
  {
    this.service.deletePost(post).subscribe(data =>{
      alert(data.message);
      location.reload();
    });
  }

  updatePost(post)
  {
    localStorage.setItem("PostUpdate",JSON.stringify(post));
    this.router.navigate(["/update-post"]);
  }

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

  PostFiles(post)
  {
    var output:Files[] = [];
    console.log(this.filesPost);
    if(this.filesPost.length>0)
    {
      console.log(this.filesPost + " TOOOOO BREEE");
      this.filesPost.forEach(element=>{
        if(element.type=="Post" && element.subjectName == post._id)
          output.push(element);
      });
    }
    return output;
  }

  UploadTheFile(tp)
  {
    if(this.selectedFile!=null)
    {
      var us = JSON.parse(localStorage.getItem("user"));

      var titleFile = prompt("Enter the name of the file:");

      var message =
      {
        id: Date.now().toLocaleString(),
        title: titleFile,
        file: this.selectedFile,
        date: new Date(),
        subjectName: tp._id,
        author: us.username,
        authorName: us.firstname + " " + us.lastname,
        type:"Post"
      }

      console.log(message.file);

      this.service.uploadFile(message).subscribe(data=>
        {
          console.log(data);
          alert("Successfully uploaded file!");
          location.reload();
        });
    }
  }

  preview(tp)
  {
    var win = window.open(tp.filePath, '_blank');
    win.focus();
  }
}
