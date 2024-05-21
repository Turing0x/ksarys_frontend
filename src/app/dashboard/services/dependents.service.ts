import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { ServerRespDepen } from '../../../assets/globals/server-resp.interface';
import { Dependent } from '../interfaces/dependents';

@Injectable({
  providedIn: 'root'
})
export class DependentsService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/dependents`

  getAllDependents(): Observable<Dependent[]>{
    return this.http.get<ServerRespDepen>(this.url)
      .pipe(map(response => response.data));
  }

  getDependentById( id: string ): Observable<Dependent[]>{
    return this.http.get<ServerRespDepen>(`${this.url}/${id}`)
      .pipe(map(response => response.data) );
  }

  saveDependent(user: object): Observable<ServerRespDepen> {
    return this.http.post<ServerRespDepen>(this.url, user);
  }

  changeActive(user: object): Observable<boolean> {
    return this.http.post<ServerRespDepen>(`${this.url}/changeActive`, user)
      .pipe( map(response => response.success === true) );
  }

  editDependent(userId: string, user: object): Observable<boolean> {
    return this.http.put<ServerRespDepen>(`${this.url}/${userId}`, user)
      .pipe(map(response => response.success === true));
  }
  
  deleteDependentById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespDepen>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
