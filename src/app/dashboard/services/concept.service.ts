import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ServerRespConcept } from '../interfaces/server-resp.interface';
import { Concept } from '../interfaces/concepts.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  
export class ConceptService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/concepts`
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
    }).pipe( map(response => response.data) );
  }

  getConceptById( concept_id: string ): Observable<Concept[]>{
    return this.http.get<ServerRespConcept>(`${this.url}/${concept_id}`, {
      headers: this.httpHeaders
    }).pipe( map(response => response.data) );
  }

  saveConcept(concept: object): Observable<boolean> {
    return this.http.post<ServerRespConcept>(this.url, concept, {
      headers: this.httpHeaders
    }).pipe( map(response => response.success === true) );
  }

  deleteConceptById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespConcept>(`${this.url}/${id}`, {
      headers: this.httpHeaders,
    }).pipe( map(response => response.success === true ) );
  }

}
