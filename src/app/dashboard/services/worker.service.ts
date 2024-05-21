import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ServerRespWorker } from '../../../assets/globals/server-resp.interface';
import { SysWorker } from '../interfaces/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/workers`

  getAllUsers(): Observable<SysWorker[]>{
    return this.http.get<ServerRespWorker>(this.url)
      .pipe(map(response => response.data));
  }

  getUserById( user_id: string ): Observable<SysWorker[]>{
    return this.http.get<ServerRespWorker>(`${this.url}/${user_id}`)
      .pipe(map(response => response.data) );
  }

  saveUser(user: object): Observable<ServerRespWorker> {
    return this.http.post<ServerRespWorker>(this.url, user)
      ;
  }

  changeActive(user: object): Observable<boolean> {
    return this.http.post<ServerRespWorker>(`${this.url}/changeActive`, user)
      .pipe( map(response => response.success === true) );
  }

  editUser(userId: string, user: object): Observable<boolean> {
    return this.http.put<ServerRespWorker>(`${this.url}/${userId}`, user)
      .pipe(map(response => response.success === true));
  }
  
  deleteUserById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespWorker>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
