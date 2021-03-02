import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent} from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatExpansionModule} from "@angular/material/expansion"
import {MatRadioModule} from "@angular/material/radio"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';


import {HttpClientModule} from "@angular/common/http";
import { RegistrationEmployeeComponent } from './components/registration-employee/registration-employee.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationStudentComponent } from './components/registration-student/registration-student.component';
import { ClarityModule } from '@clr/angular';
import { EmployeesComponent } from './components/employees/employees.component';
import { PostsComponent } from './components/posts/posts.component';
import { BachelorComponent } from './components/bachelor/bachelor.component';
import { MasterComponent } from './components/master/master.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ScienceComponent } from './components/science/science.component';
import { ContactComponent } from './components/contact/contact.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PasswordComponent } from './components/password/password.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SubjectComponent } from './components/subject/subject.component';
import { LabComponent } from './components/lab/lab.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { SubInfoComponent } from './components/sub-info/sub-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminSubjectComponent } from './components/admin-subject/admin-subject.component';
import { SubPostsComponent } from './components/sub-posts/sub-posts.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HomeComponent } from './components/home/home.component';
import { RaceCreateComponent } from './components/race-create/race-create.component';
import { RaceComponent } from './components/race/race.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    RegistrationEmployeeComponent,
    LoginComponent,
    RegistrationStudentComponent,
    EmployeesComponent,
    PostsComponent,
    BachelorComponent,
    MasterComponent,
    ProjectsComponent,
    ScienceComponent,
    ContactComponent,
    SubjectsComponent,
    PasswordComponent,
    AdminComponent,
    EmployeeComponent,
    SubjectComponent,
    LabComponent,
    QuestionsComponent,
    ExercisesComponent,
    LecturesComponent,
    SubInfoComponent,
    ProfileComponent,
    AdminSubjectComponent,
    SubPostsComponent,
    UpdatePostComponent,
    AdminGroupsComponent,
    HomeComponent,
    RaceCreateComponent,
    RaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClarityModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
