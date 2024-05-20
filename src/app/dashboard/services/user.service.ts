import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';


import { User } from '../interfaces/system-user.interface';
import { ServerRespUser } from '../interfaces/server-resp.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  
export class UserService {
  
  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/users`

  getAllUsers(): Observable<User[]>{
    return this.http.get<ServerRespUser>(this.url)
      .pipe(map(response => response.data));
  }

  getUserById( user_id: string ): Observable<User[]>{
    return this.http.get<ServerRespUser>(`${this.url}/${user_id}`)
      .pipe(map(response => response.data) );
  }

  saveUser(user: object): Observable<ServerRespUser> {
    return this.http.post<ServerRespUser>(this.url, user);
  }

  changeActive(user: object): Observable<boolean> {
    return this.http.post<ServerRespUser>(`${this.url}/changeActive`, user)
      .pipe( map(response => response.success === true) );
  }

  editUser(userId: string, user: object): Observable<boolean> {
    return this.http.put<ServerRespUser>(`${this.url}/${userId}`, user)
      .pipe(map(response => response.success === true));
  }
  
  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete<ServerRespUser>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
