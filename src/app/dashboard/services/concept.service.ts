import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ServerRespConcept } from '../interfaces/server-resp.interface';
import { Concept } from '../interfaces/concepts.interface';
import { Environments } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
  
export class ConceptService {

  private http = inject(HttpClient)
  
  private url: string = `${Environments.baseUrl}/concepts`
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

  getAllConcepts(): Observable<Concept[]>{
    return this.http.get<ServerRespConcept>(this.url, {
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

  getConceptById( concept_id: string ): Observable<Concept[]>{
    return this.http.get<ServerRespConcept>(`${this.url}/${concept_id}`, {
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

  saveConcept(concept: object): Observable<boolean> {
    return this.http.post<ServerRespConcept>(this.url, concept, {
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

  deleteConceptById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespConcept>(`${this.url}/${id}`, {
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
