import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';


import { AuthStatus } from '../interfaces/auth-status.interface';
import { ServerResponse } from '../interfaces/login-response.interface';
import { User } from '../../../dashboard/interfaces/system-user.interface';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private url: string = `${environment.baseUrl}/users`
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private _currentUser = signal<User | null>( null );
  private _authStatus = signal<AuthStatus>( AuthStatus.notAuthenticated );

  public currentUser = computed( () => this._currentUser() )
  public authStatus = computed(() => this._authStatus())

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('activeMenu')
    localStorage.removeItem('lastPath')
    localStorage.removeItem('lastMenuPath')

    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  login(user: { username: string, password: string , entity: string, area: string}): Observable<ServerResponse> {
    this._authStatus.set(AuthStatus.checking);
    return this.http.post<ServerResponse>(`${this.url}/signin`, user, {
      headers: this.httpHeaders
    }).pipe(
      tap(resp => {
        if (resp.success) {
          const { user, token } = resp.data;
          this.saveInfoAsLogin(user, token);
        }
      }),
      catchError(e => {
        Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => e)
        }),
      );
  }

  validateTokenToServer(token: string): Observable<boolean> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': token
    });

    return this.http.post<ServerResponse>(`${this.url}/tokenVerify`, '', { headers: httpHeaders })
      .pipe(
        map(resp => this.saveInfoAsLogin(resp.data.user, resp.data.token)),
        catchError((err) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        }),
      );
  }

  saveInfoAsLogin(user: User, token: string) {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

}
