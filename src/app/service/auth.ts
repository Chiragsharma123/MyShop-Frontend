import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDto } from '../Common/ResponseDto';
import { LoginResponseDto } from '../model/LoginResponsedto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private userData = new BehaviorSubject<any>("");
  userData$ = this.userData.asObservable();

  private http = inject(HttpClient);
  private checkApi = "http://localhost:8080/user/checkUser";
  private logoutApi = "http://localhost:8080/user/signout";
   private loginApiUrl = "http://localhost:8080/user/login";

  constructor(private router : Router){
    this.CheckUserExists();
  }

   Login(payload: string){
     const headers = new HttpHeaders().set('Request-id','1');
     return this.http.post<ResponseDto<LoginResponseDto>>(this.loginApiUrl , {payload}, {headers , withCredentials:true}).subscribe({
                next: (response) =>{
                  console.log(response , "api response");
                  if(response.statusCode===200){
                    console.log(this.userData.value, 'initial value')
                  this.userData.next(response.data.username);
                  console.log(this.userData.value, "after login")
                  this.isLoggedIn.next(true);
                  console.log(this.isLoggedIn.value);
                  this.router.navigate(['/home']);
                  }
                  else{
                    alert(response.message || 'Login Failed');
                  }
                },
              }); 
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
         this.userData.next(response.data);
          this.isLoggedIn.next(true);
        }
        else{
          this.isLoggedIn.next(false);
        }
      },
    })
  }
}
  