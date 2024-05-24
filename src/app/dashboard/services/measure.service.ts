import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map, timeout } from 'rxjs';

import { ServerRespClasification, ServerRespMeasure } from '../../../assets/globals/server-resp.interface';
import { environment } from '../../../environments/environment.development';
import { Measure } from '../interfaces/measure.interface';

@Injectable({
  providedIn: 'root'
})

export class MeasureService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/measures`

  getAllMeansures(): Observable<Measure[]>{
    return this.http.get<ServerRespMeasure>(this.url).pipe(
      timeout(7000),
      map(response => response.data)
    );
  }
}
