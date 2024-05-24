import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, timeout } from 'rxjs';

import { ServerRespConcept, ServerRespStore } from '../../../assets/globals/server-resp.interface';
import { Concept } from '../interfaces/concepts.interface';
import { environment } from '../../../environments/environment.development';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/conClasifAlmacen/almacen`

  getAllStore(): Observable<Store[]>{
    return this.http.get<ServerRespStore>(this.url).pipe(
      timeout(7000),
      map(response => response.data)
    );
  }
}
