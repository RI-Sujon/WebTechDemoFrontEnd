import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceAndPostService {
  constructor(public http: HttpClient) { }

  public surjiUrl = "http://localhost:5004/surji/course/" ;

  public createNewPost(postType: string, post: string){
    var body = {
      "PostType": postType,
      "Post" : post
    }

    return this.http.post<any>(this.surjiUrl + "post/create", body);
  }

  public getAllPosts(){
    return this.http.get<any>(this.surjiUrl + "post/getAll") ;
  }

  public deletePost(postId: any){
    return this.http.delete<any>(this.surjiUrl + "post/delete", {params: {"postId": postId }}) ;
  }

  public openAttendancePost(id: any){
    return this.http.get<any>(this.surjiUrl + "post/openAttendance", {params: {"postId": id}}) ;
  }

  public closeAttendancePost(id: any){
    return this.http.get<any>(this.surjiUrl + "post/closeAttendance", {params: {"postId": id}}) ;
  }

  public giveAttendance(bsseroll: number, dateAndTime: Date){
    var body = {
      "BSSEROLL": bsseroll,
      "DateAndTime": dateAndTime
    }

    return this.http.post<any>(this.surjiUrl + "attendance/add", body);
  }

  public getAllAttendance(){
    return this.http.get<any>(this.surjiUrl + "attendance/getAll") ;
  }

  public getMyAttendance(bsseRoll:string){
    return this.http.get<any>(this.surjiUrl + "attendance/getAllByRoll", {params: { "bsseroll": bsseRoll}}) ;
  }

  public deleteAttendance(postId: any){
    return this.http.delete<any>(this.surjiUrl + "attendance/delete", {params: {"postId": postId}}) ;
  }
}


