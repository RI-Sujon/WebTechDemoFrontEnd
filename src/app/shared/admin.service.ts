import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private fb: FormBuilder, private http: HttpClient) { } 

  public surjiUrl = "http://localhost:5004/surji/admin/" ;

  public adminSignInOperation(){
    var body = {
      "username": this.adminSignInformModel.value.usernameOrEmail,
      "password": this.adminSignInformModel.value.password,
    }

    return this.http.post<any>(this.surjiUrl + "signIn2", body);
  }

  adminSignInformModel = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  });
}
