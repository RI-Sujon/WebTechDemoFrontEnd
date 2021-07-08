import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(public router: Router) { }

  isAdmin = false ;

  ngOnInit(): void {
    if(localStorage.getItem("isLoggedIn")==null){
      this.router.navigate(["welcome-page"]) ;
    }

    if(localStorage.getItem("isLoggedIn")=="admin"){
      this.isAdmin = true ;
    }
  }
}
