import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product, Select } from '../interfaces/product.interface';
import { ServerRespProducts, ServerRespProductsSelect } from '../../../assets/globals/server-resp.interface';
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

  getAllProductsTable(): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(`${this.url}/table`)
      .pipe(map(response => response.data));
  }
  getAllProductsSelect(): Observable<Select[]>{
    return this.http.get<ServerRespProductsSelect>(`${this.url}/select`)
      .pipe(map(response => response.data));
  }

  saveProducts(Products: object): Observable<ServerRespProducts> {
    return this.http.post<ServerRespProducts>(this.url, Products)
  }

  updateProducts(product: Product ): Observable<ServerRespProducts> {
    return this.http.put<ServerRespProducts>(`${this.url}/${product. Id!}`, product)
  }

  deleteProductById(Id: string): Observable<boolean> {
    return this.http.delete<ServerRespProducts>(`${this.url}/${Id}`)
      .pipe(map(response => response.success === true));
  }

}
