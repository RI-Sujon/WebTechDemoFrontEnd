import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-admin-login-module',
  templateUrl: './admin-login-module.component.html',
  styleUrls: ['./admin-login-module.component.css']
})
export class AdminLoginModuleComponent implements OnInit {

  constructor(public service: AdminService, public service2: CommonService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!=null){
      this.router.navigate(["welcome-page"]);
    }
  }

  signIn(): void{

    this.service.adminSignInOperation().subscribe(
      (response: any)=>{
        if(response == true){
          localStorage.setItem('isLoggedIn', "admin");
          this.sendMessage() ;
          this.router.navigate(["admin/homepage"]) ;
          this.service.adminSignInformModel.reset() ;
        }
        else{
          console.log("not succeed");
        }
      }
    ) ;
  }

  sendMessage(): void {
    this.service2.sendUpdate('loggedIn');
  }
}
