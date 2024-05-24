import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { ServerRespDPA } from '../../../assets/globals/server-resp.interface';
import { DPA } from '../interfaces/dpa';

@Injectable({
  providedIn: 'root'
})
export class DpaService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/dpa`

  getAllDPAS(): Observable<ServerRespDPA>{
    return this.http.get<ServerRespDPA>(this.url).pipe(
      tap(dpas => dpas.data.
        sort((a, b) =>
          a.Nombre.localeCompare(b.Nombre)))
    );
  }

}
