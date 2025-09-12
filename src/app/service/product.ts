import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Common/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class Product {

  private http = inject(HttpClient);
  private apiurl = 'http://localhost:8080/products';

  getProducts(page: number , size: number):Observable<ResponseDto<Product[]>> {
    const headers = new HttpHeaders().set('Request-id', '1')
      return this.http.get<ResponseDto<Product[]>>(`${this.apiurl}/products?page=${page}&size=${size}`,{headers});
  }

  getProductById(p_id: number):Observable<ResponseDto<Product>> {
    const headers = new HttpHeaders().set('Request-id', '1')
    return this.http.get<ResponseDto<Product>>(`${this.apiurl}/${p_id}`,{headers});
  }
}
