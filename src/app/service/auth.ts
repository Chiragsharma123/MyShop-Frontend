import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDto } from '../Common/ResponseDto';
import { LoginResponseDto } from '../model/LoginResponsedto';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  private http = inject(HttpClient);
  private checkApi = "http://localhost:8080/user/checkUser";
  private logoutApi = "http://localhost:8080/user/signout";

  constructor(``){
    this.CheckUserExists();
  }

  login(){
    this.isLoggedIn.next(true);
  }

  logout(){
    const headers = new HttpHeaders().set('Request-id','1');
    this.http.post<ResponseDto<any>>(this.logoutApi,{}, {headers ,withCredentials:true}).subscribe({
      next:(response=>{
        if(response.statusCode === 200){
           this.isLoggedIn.next(false);
        }
        else{
          alert(response.message);
        }
      })
    })
  }

  CheckUserExists(){
    const headers = new HttpHeaders().set('Request-id', '1');
    return this.http.get<ResponseDto<any>>(this.checkApi , {headers , withCredentials:true}).subscribe({
      next:(response)=>{
        if(response.statusCode=== 200 ){
          this.isLoggedIn.next(true);
          this.userData.next(response.data);
        }
        else{
          this.isLoggedIn.next(false);
        }
      },
    })
  }
}
  