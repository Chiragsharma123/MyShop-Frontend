import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Register {
  private http = inject(HttpClient);
  registerApi = "http://localhost:8080/user/register";

  

}
