import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseDto } from '../Common/ResponseDto';
import { userDto } from '../model/userDto';
import { Observable } from 'rxjs';
import { SellerDto } from '../model/SellerDto';

@Injectable({
  providedIn: 'root'
})
export class Register {
  private http = inject(HttpClient);
  registerUserApi = "http://localhost:8080/user/register";
  registerSellerApi ='http://localhost:8080/seller/register';

  registerUser(user : userDto):Observable<ResponseDto<any>>{
    const headers = new HttpHeaders().set('Request-id','1');
    const username = user.username;
    const password = user.password;
    const role = user.role;
    const address =  user.address;
    const phoneNumber = user.phoneNumber;
    return this.http.post<ResponseDto<any>>(this.registerUserApi,{username,password , role , address , phoneNumber},{headers});
  }

  registerSeller(seller : SellerDto):Observable<ResponseDto<any>>{
       const headers = new HttpHeaders().set('Request-id','1');
       const id = seller.id;
       const name = seller.name;
       const roleId = seller.roleId;
       const brandName = seller.brandName;
       const address = seller.address;
       const password = seller.password;
       const email = seller.email;
       const delivery_pinCodes = seller.delivery_pinCodes;
       const phoneNumber = seller.phoneNumber;
       const imageData = seller.imageData;

       return this.http.post<ResponseDto<any>>(this.registerSellerApi,{id , name , roleId,brandName,address,password,email,delivery_pinCodes,phoneNumber,imageData},{headers});
  }
}
