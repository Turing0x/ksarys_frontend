import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../interfaces/product.interface';
import { ServerRespProducts } from '../../../assets/globals/server-resp.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  
export class ProductsService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/products`

  getAllProducts(): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(this.url)
      .pipe(map(response => response.data));
  }

  getProductsById( Products_id: string ): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(`${this.url}/${Products_id}`)
      .pipe( map(response => response.data) );
  }

  saveProducts(Products: object): Observable<boolean> {
    return this.http.post<ServerRespProducts>(this.url, Products)
      .pipe( map(response => response.success === true) );
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespProducts>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
