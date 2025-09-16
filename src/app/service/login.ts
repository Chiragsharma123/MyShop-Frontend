import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EncryptedDto } from '../model/EncryptedDto';
import { LoginResponseDto } from '../model/LoginResponsedto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Common/ResponseDto';


@Injectable({
  providedIn: 'root'
})
export class Login {
  private http = inject(HttpClient);
  private EncryptapiUrl= "http://localhost:8080/encrypt";


  encryptData(username:string , password:string):Observable<EncryptedDto>{
    const headers = new HttpHeaders().set('Request-id','1');
    return this.http.post<EncryptedDto>(this.EncryptapiUrl,{ username ,password} , {headers});
  }

}
