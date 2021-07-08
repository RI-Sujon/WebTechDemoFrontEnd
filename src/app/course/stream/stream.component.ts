import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/model/attendance';
import { Post } from 'src/app/model/post';
import { Student } from 'src/app/model/student';
import { AttendanceAndPostService } from 'src/app/shared/attendance-and-post.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  
  posts:Post[] = [] ;
  attendances:Attendance[] = [] ;
  attendanceTrack:string[] = [] ;
  
  textAreaPost: string | any ;

  isAdmin = false ;
  isStudent = false ;

  user: string | any ;
  userFullName: string | any ;
  bsseRoll: number | any ;

  student: Student | any;
  
  constructor(public service2: AttendanceAndPostService, public router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("isLoggedIn") ;
  
    if(this.user==null){
      this.router.navigate(["welcome-page"]) ;
    }
    else if(localStorage.getItem("isLoggedIn")=="student"){
      this.isStudent = true ;
      this.student = localStorage.getItem("user")
      this.student = JSON.parse(this.student);
      this.userFullName = this.student.studentName ;
      this.bsseRoll = this.student.bsseroll ;
    }
    else if(localStorage.getItem("isLoggedIn")=="admin"){
      this.isAdmin = true ;
    }

    this.loadPosts();
  }

  loadPosts(){
    this.service2.getAllPosts().subscribe(
      response=>{
        this.posts = response ;
        if(this.isStudent){
          this.service2.getMyAttendance(this.bsseRoll).subscribe(
            response=>{
              this.attendances = response ;
              for(var post of this.posts){
                var flag = 0; 
                if(post.postType=="attendance"){
                  for(var att of this.attendances){
                    if(post.dateAndTime==att.dateAndTime){
                      var flag = 1;
                      break ;
                    }
                  }
                  if(flag==0 && post.post=="on"){
                    this.attendanceTrack.push("open") ;
                  }
                  else if(flag==1){
                    this.attendanceTrack.push("done") ;
                  }
                  else{
                    this.attendanceTrack.push("miss") ;
                  }
                  continue ;
                }

                this.attendanceTrack.push("invalid");
              }
            }
          );
        }
      }
    );
  }

  createAttendancePost(){
    this.service2.createNewPost("attendance", "on").subscribe(
      response=>{
        if(response==true){
          this.attendanceTrack = [];
          this.loadPosts();
        }
      }
    );
  }

  deletePost(id: number){
      this.service2.deletePost(id).subscribe(
        response=>{
          this.loadPosts() ;
        }
      );
  }

  giveAttendance(dateAndTime: Date){
    this.service2.giveAttendance(this.bsseRoll, dateAndTime).subscribe(
      response=>{
        this.attendanceTrack = [];
        this.loadPosts();
      }
    );
  }

  startAttendancePost(postId: number){
    if(this.isAdmin){
      this.service2.openAttendancePost(postId).subscribe(
        response=>{
          if(response==true){
            this.attendanceTrack = [];
            this.loadPosts();
          }
        }
      );
    }
  }

  stopAttendancePost(postId: number){
    if(this.isAdmin){
      this.service2.closeAttendancePost(postId).subscribe(
        response=>{
          if(response==true){
            this.attendanceTrack = [];
            this.loadPosts();
          }
        }
      );
    }
  }
}
