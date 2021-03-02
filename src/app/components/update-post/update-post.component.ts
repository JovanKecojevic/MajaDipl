import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,public service: StudentService,private fb: FormBuilder) {}


  postForm;

  subjects:Subject[];
  subjectsSem:Subject[][];

  semesters = ['1','2','3','4','5','6','7','8'];
  semes = [0,1,2,3,4,5,6,7];

  sub_name = null;
  subject:Subject = null;


  post = JSON.parse(localStorage.getItem("PostUpdate"));

  dateOld = this.post.date;

  checked = false;

  ngOnInit(): void
  {
    this.postForm = this.fb.group({
      title: [this.post.title, [Validators.required]],
      content: [this.post.content, [Validators.required]],
      date: [this.post.date]
    })
  }

  goTo(page:String)
  {
    var s = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/'+page+'/'+s]);
  }

  alter()
  {
    if(this.sub_name==null || this.sub_name=="null") alert("Please select the subject!");
    else
    {
      this.subjects.forEach(element => {
        if(element.code == this.sub_name)
        {
          this.subject = element;
          this.checked = true;
        }
      });
    }
  }

  checkIfSubjects(sem) : Boolean
  {
    if(this.subjectsSem[sem].length==0)
      return false;
    else
      return true;

  }

  provera(sem,p): Boolean
  {
    if(p.semester == sem)
      return true;
    return false;
  }

  updatePost()
  {

    this.post.title = this.postForm.value.title;
    this.post.content = this.postForm.value.content;
    this.post.date = this.postForm.value.date;


    var newPost =
    {
      title: this.post.title,
      content: this.post.content,
      date: this.post.date,
      postType: this.post.postType,
      subject: this.post.subject,
      author: this.post.author,
      authorName: this.post.authorName,
      old:this.dateOld
    };

    var message =
    {
      post:newPost,
      old:this.dateOld
    }

    this.service.updatePostSubject(message).subscribe(data =>{
      console.log(data);
      alert("Post updated successfully!");
      this.router.navigate(['/subjects']);
      localStorage.removeItem("UpdatePost");
    });

  }

}
