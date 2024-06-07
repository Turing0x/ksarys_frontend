import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Oferta } from '../interfaces/oferta.interface';
import { OfertaResponse } from '../interfaces/utils.response';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/ofertas`

  getAllOfertas(): Observable<Oferta[]>{
    return this.http.get<OfertaResponse>(this.url)
      .pipe(map(response => response.data));
  }

  getOfertaById( id: string ): Observable<Oferta[]>{
    return this.http.get<OfertaResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.data));
  }

  saveOferta(Oferta: object): Observable<OfertaResponse> {
    return this.http.post<OfertaResponse>(this.url, Oferta);
  }

  editOferta(Oferta: object): Observable<OfertaResponse> {
    return this.http.put<OfertaResponse>(this.url, Oferta);
  }

  deleteOfertaById(id: string): Observable<boolean> {
    return this.http.delete<OfertaResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
