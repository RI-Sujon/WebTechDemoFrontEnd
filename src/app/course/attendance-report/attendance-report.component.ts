import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/model/attendance';
import { Student } from 'src/app/model/student';
import { AttendanceAndPostService } from 'src/app/shared/attendance-and-post.service';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  selected = "All" ;
  selectedDate = "" ;
  selectedMonth = "" ;

  public attendances: Attendance [] = [] ;
  public studentsOfCourse: Student [] = [] ;
  public attendanceMapWithBSSEROLL_list: AttendanceMapWithBSSEROLL[] = [] ;

  totalAttendancePostCounter: number = 0;
  allDateAndTime: Date [] = [] ;
  allMonth: Date [] = [] ;
  
  user: string | any ;
  student: Student | any;


  isTeacher = false ;
  isAdmin = false ;
  isStudent = false ;

  isFullReport = true ;
  isDailyReport = false ;
  isMonthlyReport = false ;

  toppings = new FormControl();

  constructor(public router: Router, public service: StudentService, public service2: AttendanceAndPostService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("isLoggedIn") ;
  
    if(this.user==null){
      this.router.navigate(["welcome-page"]) ;
    }
    else if(localStorage.getItem("isLoggedIn")=="teacher"){
      this.isTeacher = true ;
    }
    else if(localStorage.getItem("isLoggedIn")=="student"){
      this.isStudent = true ;
      this.student = localStorage.getItem("user")
      this.student = JSON.parse(this.student);
    }
    else if(localStorage.getItem("isLoggedIn")=="admin"){
      this.isAdmin = true ;
    }

    this.loadAllAttendanceOfCourse();  
    
  }

  loadAllAttendanceOfCourse(){
    this.service.getAllStudents().subscribe(
      response => {
        this.studentsOfCourse = response ;
        this.service2.getAllAttendance().subscribe(
          response=>{
            this.attendances = response ;
            this.xyz();

            if(this.fullReport){
              this.totalAttendancePostCounter = this.attendances.length ;
              this.fullReport();
            }

          }
        );
      }
    );
  }

  clearAttMap(){
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      attMap.attendanceCount = 0 ;
      attMap.percentage = "0" ;
      attMap.status = "" ;
    }
  }

  choiceReportOption(obj: any){
    if(obj.value=="Daily"){
      this.isDailyReport = true ;
      this.isFullReport = false ;
      this.isMonthlyReport = false ;
      this.selectedDate = this.allDateAndTime[0]  + "";
      this.dailyReport(null, this.allDateAndTime[0]);
    }
    else if(obj.value=="Monthly"){
      this.isDailyReport = false ;
      this.isFullReport = false ;
      this.isMonthlyReport = true ;
      this.selectedMonth = this.allMonth[0] + "";
      this.monthlyReport(null, this.allMonth[0]);
    }
    else{
      this.selected = "All" ;
      this.isDailyReport = false ;
      this.isFullReport = true ;
      this.isMonthlyReport = false ;
      this.fullReport() ;
    }
  }

  date: Date = new Date() ;
  xyz(){
    for(var att of this.attendances){
      var flag = 0;
      for(var dateAndTime of this.allDateAndTime){
        if(att.dateAndTime==dateAndTime){
          flag = 1 ;
          break ;
        }
      }
      if(flag==0){
        this.allDateAndTime.push(att.dateAndTime) ;
      }

      flag = 0 ;
      for(var i=0 ; i<this.allMonth.length ; i++){
        if(att.dateAndTime.getMonth==this.allMonth[i].getMonth && att.dateAndTime.getFullYear==this.allMonth[i].getFullYear){
          flag = 1 ;
          break ;
        }
      }
      if(flag==0){
        this.allMonth.push(att.dateAndTime) ;
      }
    }

    for(var std of this.studentsOfCourse){
      var temp = new AttendanceMapWithBSSEROLL() ;
      temp.bsseRoll = std.bsseroll ;
      temp.studentName = std.studentName ;
      this.attendanceMapWithBSSEROLL_list.push(temp) ;
    }
  }

  dailyReport(ob: any, dateAndTime2: Date|any){
    if(ob!=null){
      var dateAndTime = ob.value ;
    }
    else if(ob==null){
      var dateAndTime = dateAndTime2 ;
    }

    this.clearAttMap();
    
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        if(att.dateAndTime==dateAndTime){
          if(att.bsseroll==attMap.bsseRoll){
            count++ ;
            break ;
          }
        }
      }

      if(count==1){
        attMap.status = "present" ;
        attMap.attendanceCount = count ;
      }
      else{
        attMap.status = "absent" ;
      }
    }
  }

  fullReport(){
    this.clearAttMap();

    this.totalAttendancePostCounter = this.allDateAndTime.length ;
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        if(att.bsseroll==attMap.bsseRoll){
          count++ ;
        }
      }
      attMap.attendanceCount = count ;
      attMap.percentage = parseFloat(count*100/this.totalAttendancePostCounter + "").toFixed(2)
      attMap.percentage = attMap.percentage + "%" ;
    }
  }

  monthlyReport(ob: any, dateAndTime2: Date | any){
    if(ob!=null){
      var dateAndTime = ob.value ;
    }
    else if(ob==null){
      var dateAndTime = dateAndTime2 ;
    }

    this.clearAttMap();
    
    var totalClassInMonth = 0 ;
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        if(att.dateAndTime.getMonth==dateAndTime.getMonth && att.dateAndTime.getFullYear==dateAndTime.getFullYear){
          if(att.bsseroll==attMap.bsseRoll){
            count++ ;
          }
        }
      }

      attMap.attendanceCount = count ;
    }

    for(var date of this.allDateAndTime){
      if(date.getMonth==dateAndTime.getMonth && date.getFullYear==dateAndTime.getFullYear){
        totalClassInMonth++ ;
      }
    }

    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      attMap.percentage = parseFloat(attMap.attendanceCount*100/totalClassInMonth + "").toFixed(2)
      attMap.percentage = attMap.percentage + "%" ;
    }

    this.totalAttendancePostCounter = totalClassInMonth ;
  }
}

class AttendanceMapWithBSSEROLL{
  bsseRoll: number | any ;
  status: string | any ;
  attendanceCount: number = 0 ;
  percentage : string = "0%" ;
  studentName: string | any ;

  AttendanceMapWithBSSEROLL(bsseRoll:number, status: string, attendanceCount: number, percentage: string){
    this.bsseRoll = bsseRoll ;
    this.status = status ;
    this.attendanceCount = attendanceCount ;
    this.percentage = percentage ;
  }
}
