import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { ComandaDetalles } from '../interfaces/comanda-detalle.interface';
import { CDetallesResponse } from '../interfaces/utils.response';

@Injectable({
  providedIn: 'root'
})
export class ComandasDetallesService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/cdetalles`

  getAllCDetalles(): Observable<ComandaDetalles[]>{
    return this.http.get<CDetallesResponse>(this.url)
      .pipe(map(response => response.data));
  }

  getComandaDetalleByComanda(id: string): Observable<ComandaDetalles[]>{
    return this.http.get<CDetallesResponse>(`${this.url}/cdetalle/${id}`)
      .pipe(map(response => response.data));
  }

  getCDetalleById( id: string ): Observable<ComandaDetalles[]>{
    return this.http.get<CDetallesResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.data));
  }

  saveCDetalle(cdetalle: object): Observable<boolean> {
    return this.http.post<CDetallesResponse>(this.url, cdetalle)
      .pipe(map(response => response.success));
  }

  editCDetalle(cdetalle: object): Observable<boolean> {
    return this.http.put<CDetallesResponse>(this.url, cdetalle)
      .pipe(map(response => response.success));
  }

  deleteCDetalleById(id: string): Observable<boolean> {
    return this.http.delete<CDetallesResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.success));
  }

}
