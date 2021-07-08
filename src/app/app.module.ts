import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './student-login/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginModuleComponent } from './student-login/login-module/login-module.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AdminLoginModuleComponent } from './admin-login/admin-login-module/admin-login-module.component';
import { StudentService } from './shared/student.service';
import { AdminService } from './shared/admin.service';
import { HomepageComponent } from './admin/homepage/homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarModule } from "ng-sidebar";
import { StudentsManagementComponent } from './admin/students-management/students-management.component';
import { ViewStudentListComponent } from './admin/students-management/view-student-list/view-student-list.component';
import { AddStudentComponent } from './admin/students-management/add-student/add-student.component';
import { EditStudentInfoComponent } from './admin/students-management/edit-student-info/edit-student-info.component';
import { CourseComponent } from './course/course.component';
import { StreamComponent } from './course/stream/stream.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AttendanceReportComponent } from './course/attendance-report/attendance-report.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginModuleComponent,
    WelcomePageComponent,
    TopBarComponent,
    AdminComponent,
    AdminLoginModuleComponent,
    HomepageComponent,
    AdminLoginComponent,
    StudentsManagementComponent,
    ViewStudentListComponent,
    AddStudentComponent,
    EditStudentInfoComponent,
    CourseComponent,
    StreamComponent,
    StudentLoginComponent,
    AttendanceReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    SidebarModule.forRoot()
  ],
  providers: [StudentService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
