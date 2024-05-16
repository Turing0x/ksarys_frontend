import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Environments } from '../../../environments/env';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Product } from '../interfaces/product.interface';
import { ServerRespProducts } from '../interfaces/server-resp.interface';

@Injectable({
  providedIn: 'root'
})
  
export class ProductsService {

  private http = inject(HttpClient)
  
  private url: string = `${Environments.baseUrl}/products`
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
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  getProductsById( Products_id: string ): Observable<Product[]>{
    return this.http.get<ServerRespProducts>(`${this.url}/${Products_id}`, {
      headers: this.httpHeaders
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  saveProducts(Products: object): Observable<boolean> {
    return this.http.post<ServerRespProducts>(this.url, Products, {
      headers: this.httpHeaders
    }).pipe(
      map(response => response.success === true),
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    );
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespProducts>(`${this.url}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      map(response => response.success === true ),
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    );
  }

}
