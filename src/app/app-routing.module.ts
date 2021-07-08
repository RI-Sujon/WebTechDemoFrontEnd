import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginModuleComponent } from './admin-login/admin-login-module/admin-login-module.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './admin/homepage/homepage.component';
import { AddStudentComponent } from './admin/students-management/add-student/add-student.component';
import { EditStudentInfoComponent } from './admin/students-management/edit-student-info/edit-student-info.component';
import { StudentsManagementComponent } from './admin/students-management/students-management.component';
import { ViewStudentListComponent } from './admin/students-management/view-student-list/view-student-list.component';
import { AttendanceReportComponent } from './course/attendance-report/attendance-report.component';
import { CourseComponent } from './course/course.component';
import { StreamComponent } from './course/stream/stream.component';
import { LoginModuleComponent } from './student-login/login-module/login-module.component';
import { RegistrationComponent } from './student-login/registration/registration.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  //{path: '', redirectTo: '/student/registration', pathMatch: 'full'},
  {path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
  { path: 'welcome-page', component: WelcomePageComponent, },
  { path: 'more' , component: WelcomePageComponent } ,
  {
    path: 'student-login', component: StudentLoginComponent,
    children:[
      { path: 'registration', component: RegistrationComponent},
      { path: 'loginModule', component: LoginModuleComponent}
    ]
  },
  {
    path: 'admin-login', component: AdminLoginComponent,
    children:[
      { path: 'loginModule', component: AdminLoginModuleComponent},
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children:[
      { path: 'homepage', component: HomepageComponent },
      {
        path: 'students-management', component: StudentsManagementComponent,
        children:[
          { path: 'view-list', component: ViewStudentListComponent },
          { path: 'add-student', component: AddStudentComponent },
          { path: 'edit-info', component: EditStudentInfoComponent },
        ] 
      },
    ]
  },
  { path: 'course', component: CourseComponent,
    children:[
      { path: 'stream', component: StreamComponent },
      { path: 'attendance-report', component: AttendanceReportComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
