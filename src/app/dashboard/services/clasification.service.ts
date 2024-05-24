import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Clasification } from '../interfaces/clasifications.interface';
import { Observable, map, timeout } from 'rxjs';

import { ServerRespClasification } from '../../../assets/globals/server-resp.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ClasificationService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/conClasifAlmacen/clasificacion`

  getAllClasifications(): Observable<Clasification[]>{
    return this.http.get<ServerRespClasification>(this.url).pipe(
      timeout(7000),
      map(response => response.data)
    );
  }

  getClasificationById( Clasification_id: string ): Observable<Clasification[]>{
    return this.http.get<ServerRespClasification>(`${this.url}/${Clasification_id}`, {
    }).pipe( map(response => response.data) );
  }

  saveClasification(Clasification: object): Observable<boolean> {
    return this.http.post<ServerRespClasification>(this.url, Clasification, {
    }).pipe( map(response => response.success === true) );
  }
}
