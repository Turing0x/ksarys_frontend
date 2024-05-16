import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { User } from '../interfaces/system-user.interface';
import { ServerRespUser } from '../interfaces/server-resp.interface';
import { Environments } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
  
export class UserService {
  
  private http = inject(HttpClient)
  
  private url: string = `${Environments.baseUrl}/users`
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

  getAllUsers(): Observable<User[]>{
    return this.http.get<ServerRespUser>(this.url, {
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

  getUserById( user_id: string ): Observable<User[]>{
    return this.http.get<ServerRespUser>(`${this.url}/${user_id}`, {
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

  saveUser(user: object): Observable<ServerRespUser> {
    return this.http.post<ServerRespUser>(this.url, user, {
      headers: this.httpHeaders
    }).pipe(
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

  changeActive(user: object): Observable<boolean> {
    return this.http.post<ServerRespUser>(`${this.url}/changeActive`, user, {
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

  editUser(userId: string, user: object): Observable<boolean> {
    return this.http.put<ServerRespUser>(`${this.url}/${userId}`, user,{
      headers: this.httpHeaders,
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
  
  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete<ServerRespUser>(`${this.url}/${id}`, {
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
