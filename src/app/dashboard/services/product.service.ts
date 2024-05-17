import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../interfaces/product.interface';
import { ServerRespProducts } from '../interfaces/server-resp.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  
export class ProductsService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/products`
  private token!: string;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.token
    });
  }

  constructor() {
    const data = localStorage.getItem('token')
    if (data) this.token = data
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(this.url, {
      headers: this.httpHeaders
    }).pipe( map(response => response.data) );
  }

  getProductsById( Products_id: string ): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(`${this.url}/${Products_id}`, {
      headers: this.httpHeaders
    }).pipe( map(response => response.data) );
  }

  saveProducts(Products: object): Observable<boolean> {
    return this.http.post<ServerRespProducts>(this.url, Products, {
      headers: this.httpHeaders
    }).pipe( map(response => response.success === true) );
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespProducts>(`${this.url}/${id}`, {
      headers: this.httpHeaders,
    }).pipe( map(response => response.success === true ) );
  }

}
