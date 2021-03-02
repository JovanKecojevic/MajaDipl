import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { RegistrationEmployeeComponent } from './components/registration-employee/registration-employee.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationStudentComponent } from './components/registration-student/registration-student.component';
import { BachelorComponent } from './components/bachelor/bachelor.component';
import { ContactComponent } from './components/contact/contact.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { MasterComponent } from './components/master/master.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ScienceComponent } from './components/science/science.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PasswordComponent } from './components/password/password.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SubjectComponent } from './components/subject/subject.component';
import { LabComponent } from './components/lab/lab.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SubInfoComponent} from './components/sub-info/sub-info.component';
import { ProfileComponent} from './components/profile/profile.component';
import { AdminSubjectComponent} from './components/admin-subject/admin-subject.component';
import { SubPostsComponent} from './components/sub-posts/sub-posts.component';
import { UpdatePostComponent} from './components/update-post/update-post.component';
import { AdminGroupsComponent} from './components/admin-groups/admin-groups.component';
import { HomeComponent} from './components/home/home.component';
import { RaceCreateComponent} from './components/race-create/race-create.component';
import { RaceComponent} from './components/race/race.component';



const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'registration-employee', component:RegistrationEmployeeComponent},
  {path:'registration-student', component:RegistrationStudentComponent},
  {path:'bachelor', component:BachelorComponent},
  {path:'contact', component:ContactComponent},
  {path:'employees', component:EmployeesComponent},
  {path:'employee/:username', component:EmployeeComponent},
  {path:'master', component:MasterComponent},
  {path:'posts', component:PostsComponent},
  {path:'projects', component:ProjectsComponent},
  {path:'science', component:ScienceComponent},
  {path:'subjects/:username', component:SubjectsComponent},
  {path:'subject/:id', component:SubjectComponent},
  {path:'admin', component:AdminComponent},
  {path:'admin-subject', component:AdminSubjectComponent},
  {path:'password', component:PasswordComponent},
  {path:'lab/:id', component:LabComponent},
  {path:'questions/:id', component:QuestionsComponent},
  {path:'lectures/:id', component:LecturesComponent},
  {path:'exercises/:id', component:ExercisesComponent},
  {path:'sub-info/:id', component:SubInfoComponent},
  {path:'profile/:username', component:ProfileComponent},
  {path:'sub-posts/:username', component:SubPostsComponent},
  {path:'update-post', component:UpdatePostComponent},
  {path:'admin-groups', component:AdminGroupsComponent},
  {path:'home', component:HomeComponent},
  {path:'race-create', component:RaceCreateComponent},
  {path:'race/:id', component:RaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
