import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, timeout } from 'rxjs';

import { ServerRespConcept } from '../../../assets/globals/server-resp.interface';
import { Concept } from '../interfaces/concepts.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ConceptService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/conClasifAlmacen/conceptos`

  getAllConcepts(): Observable<Concept[]>{
    return this.http.get<ServerRespConcept>(this.url, ).pipe(
      timeout(7000),
      map(response => response.data)
    );
  }

  getConceptById( concept_id: string ): Observable<Concept[]>{
    return this.http.get<ServerRespConcept>(`${this.url}/${concept_id}`).pipe( map(response => response.data) );
  }

  saveConcept(concept: object): Observable<boolean> {
    return this.http.post<ServerRespConcept>(this.url, concept).pipe( map(response => response.success === true) );
  }

  deleteConceptById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespConcept>(`${this.url}/${id}`).pipe( map(response => response.success === true ) );
  }

}
