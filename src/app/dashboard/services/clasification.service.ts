import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Clasification } from '../interfaces/clasifications.interface';
import { Observable, map } from 'rxjs';

import { ServerRespClasification } from '../interfaces/server-resp.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  
export class ClasificationService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/clasifications`
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
    }).pipe( map(response => response.data) );
  }

  getClasificationById( Clasification_id: string ): Observable<Clasification[]>{
    return this.http.get<ServerRespClasification>(`${this.url}/${Clasification_id}`, {
      headers: this.httpHeaders
    }).pipe( map(response => response.data) );
  }

  saveClasification(Clasification: object): Observable<boolean> {
    return this.http.post<ServerRespClasification>(this.url, Clasification, {
      headers: this.httpHeaders
    }).pipe( map(response => response.success === true) );
  }

}
