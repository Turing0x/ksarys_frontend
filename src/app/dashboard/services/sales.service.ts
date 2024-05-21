import { HttpClient} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Sale } from '../interfaces/sales.interface';
import { ServerRespSale } from '../../../assets/globals/server-resp.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/sales`

  getAllSales(): Observable<Sale[]>{
    return this.http.get<ServerRespSale>(this.url)
      .pipe(map(response => response.data));
  }

  getSaleById( id: string ): Observable<Sale[]>{
    return this.http.get<ServerRespSale>(`${this.url}/${id}`)
      .pipe(map(response => response.data));
  }

  saveSale(sale: object): Observable<ServerRespSale> {
    return this.http.post<ServerRespSale>(this.url, sale);
  }

  editSale(sale: object): Observable<ServerRespSale> {
    return this.http.put<ServerRespSale>(this.url, sale);
  }
  
  deleteSaleById(id: string): Observable<boolean> {
    return this.http.delete<ServerRespSale>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}
