import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Environments } from '../../../environments/env';
import { Clasification } from '../interfaces/clasifications.interface';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ServerRespClasification } from '../interfaces/server-resp.interface';

@Injectable({
  providedIn: 'root'
})
  
export class ClasificationService {

  private http = inject(HttpClient)
  
  private url: string = `${Environments.baseUrl}/clasifications`
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

  getAllClasifications(): Observable<Clasification[]>{
    return this.http.get<ServerRespClasification>(this.url, {
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

  getClasificationById( Clasification_id: string ): Observable<Clasification[]>{
    return this.http.get<ServerRespClasification>(`${this.url}/${Clasification_id}`, {
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

  saveClasification(Clasification: object): Observable<boolean> {
    return this.http.post<ServerRespClasification>(this.url, Clasification, {
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

}
