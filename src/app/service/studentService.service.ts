import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { HeaderComponent} from '../header/header.component';


@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private router: Router, private http: HttpClient) { }

  baseUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
  loginUrl = '/login';
  registerEmployeeUrl = '/registration_employee';
  registerStudentUrl = '/registration_student';
  bachelorUrl = '/bachelor';
  masterUrl = '/master';
  scienceUrl = '/science';
  employeeUrl = '/employee';
  employeesUrl = '/employees';
  postsUrl = '/posts';
  contactUrl = '/contact';
  subjectsUrl = '/subjects';
  passwordUrl = '/password';
  adminUrl = '/admin';
  subjectUrl = '/subject';
  adminSubjectUrl = '/admin-subject';
  subInfoUrl = '/sub-info';
  subPostsUrl = '/sub-posts';
  updatePostUrl = '/update-post';
  subscriptionsUrl = '/subscription';
  groupsUrl = '/groups';
  filesUrl = '/files';
  fileUrl = '/fileOne';
  homeUrl = '/home';
  createRaceUrl = '/race-create';
  raceUrl = '/race';



  setCredentials(username: string, userType: any) {
    console.log("Hello ", username, ", nice to see you! you're an",userType);
    localStorage.setItem('username', username);
    localStorage.setItem('type', userType);

    HeaderComponent.loggedIn = true;

    if(userType === "Admin")
      HeaderComponent.adminLogged = true;
    if(userType === "Employee")
      HeaderComponent.employeeLogged = true;
    if(userType === "Student")
      HeaderComponent.studentLogged = true;

  }

  nextPage(data: any)
  {
    const type = localStorage.getItem("type");
    if(type === "Admin")
    {
      this.router.navigate(['/admin']);
    }
    else
    {

      if(data.firstlog)
      {
        this.router.navigate(['/password']);
        HeaderComponent.firstLog = true;
      }
      else
      {
        if(type == "Employee")
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.router.navigate(['/login']);
        }
      }
    }
  }

  registerStudentRequest(userInfo: any): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.registerStudentUrl}`, userInfo);
  }


  // SPORTVENT
  registerUserRequest(file: any): Observable<any>
  {
    console.log(file);

    const userData = new FormData();

    userData.append("username",file.username);
    userData.append("file", file.file, file.title);
    userData.append("firstname", file.firstname)
    userData.append("lastname",file.lastname);
    userData.append("mail",file.mail);
    userData.append("birthday",file.birthday);
    userData.append("password",file.password);
    userData.append("userType",file.userType);

    return this.http.post<any>(`${this.baseUrl}${this.registerEmployeeUrl}`, userData);
  }

  registerStudentRequestAdmin(userInfo: any): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.adminUrl}`, userInfo);
  }

  registerEmployeeRequestAdmin(userInfo: any): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.adminUrl}`, userInfo);
  }

  // SPORTVENT
  login(user:any):Observable<any>
  {
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}${this.loginUrl}`, user);
  }

 // SPORTVENT
  createRace(file:any):Observable<any>
  {
    console.log(file);
    const userData = new FormData();

    userData.append("name",file.name);
    userData.append("file", file.file, file.title);
    userData.append("date", file.date)
    userData.append("location",file.location);
    userData.append("address",file.address);
    userData.append("organizer",file.organizer);
    userData.append("description",file.description);
    userData.append("price",file.price);

    return this.http.post<any>(`${this.baseUrl}${this.createRaceUrl}`, userData);
  }

  // SPORTVENT
  getRaces(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.homeUrl}`);
  }

  // SPORTVENT
  getUsers(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.raceUrl}`);
  }

  logout(): void
  {
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("user");
    HeaderComponent.loggedIn = false;
    HeaderComponent.adminLogged = false;
    HeaderComponent.employeeLogged = false;
    HeaderComponent.studentLogged = false;
    HeaderComponent.firstLog = false;
    this.router.navigate(['/login']);
  }


  changePassword(userInfo: any): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.passwordUrl}`, userInfo);
  }

  deleteUser(userInfo: any): Observable<any>
  {
    console.log(userInfo);
    return this.http.delete<any>(`${this.baseUrl}${this.adminUrl}/${userInfo.userType}/${userInfo.username}`);
  }

  updateUser(userInfo: any): Observable<any>
  {
    console.log(userInfo);
    return this.http.get<any>(`${this.baseUrl}${this.adminUrl}/${userInfo.userType}/${userInfo.username}`);
  }

  putUser(userInfo: any): Observable<any>
  {
    console.log(userInfo);
    return this.http.put<any>(`${this.baseUrl}${this.adminUrl}`,userInfo);
  }

  getEmployees(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.employeesUrl}`);
  }

  getStudents(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.adminSubjectUrl}`);
  }

  getPosts() : Observable<any>
  {
    console.log("U servisu sam");
    return this.http.get<any>(`${this.baseUrl}${this.postsUrl}`);
  }

  createPost(post: any) : Observable<any>
  {
    console.log("U servisu sam");
    return this.http.post<any>(`${this.baseUrl}${this.postsUrl}`,post);
  }

  subjectCreate(subject)
  {
    console.log("U servisu sam");
    return this.http.post<any>(`${this.baseUrl}${this.adminSubjectUrl}`,subject);
  }

  getSubjects() : Observable<any>
  {
    console.log("U servisu sam");
    return this.http.get<any>(`${this.baseUrl}${this.bachelorUrl}`);
  }

  getSubjectsInfo() : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.subInfoUrl}`);
  }

  getSubjectsInfoPosts() : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.subjectUrl}`);
  }

  getSubjectsMaster() : Observable<any>
  {
    console.log("U servisu sam");
    return this.http.get<any>(`${this.baseUrl}${this.masterUrl}`);
  }

  deleteSubject(name: any): Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}${this.adminSubjectUrl}/${name.code}`);
    //uklonio sam userinfo iz req
  }

  updateSubject(subject:any): Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}${this.subjectsUrl}`,subject);
  }

  updatePostSubject(subject:any): Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}${this.updatePostUrl}`,subject);
  }

  createPostSubject(post: any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.subPostsUrl}`,post);
  }

  deletePost(post) : Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}${this.subjectUrl}/${post.date}`);
  }

  subjectSubscribe(message) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}${this.subjectUrl}`, message);
  }

  getStudentSubject(name) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.subscriptionsUrl}`, name);
  }

  getStudentSubjectAll() : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.subscriptionsUrl+'s'}`);
  }

  getGroups(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}${this.groupsUrl}`);
  }

  createGroup(group): Observable<any>
  {
    console.log(group);
    return this.http.post<any>(`${this.baseUrl}${this.groupsUrl}`,group);
  }

  deleteGroup(group) : Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}${this.groupsUrl}/${group.group}/${group.username}/${group.code}`);
  }

  uploadFile(file) : Observable<any>
  {

    const userData = new FormData();

    userData.append("date",file.date);
    userData.append("file", file.file, file.title);
    userData.append("title", file.title)
    userData.append("subjectName",file.subjectName);
    userData.append("authorName",file.authorName);
    userData.append("author",file.author);
    userData.append("id",file.id);
    userData.append("type",file.type);


    return this.http.post<any>(`${this.baseUrl}${this.filesUrl}`, userData);
  }

  getFiles()
  {
    return this.http.get<any>(`${this.baseUrl}${this.filesUrl}`);
  }

  private _url:string = "../backend/filesFolder/novi.pdf";

  downloadFile(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}${this.fileUrl}`);
		//return this.http.get('http://localhost:3000/files/novi.pdf', {responseType: 'blob'});
  }

  deleteFile(tp)
  {
    return this.http.delete<any>(`${this.baseUrl}${this.filesUrl}/${tp.id}`);
  }

}
