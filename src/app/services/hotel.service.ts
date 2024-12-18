import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) {}
    list(): Observable<Hotel[]> { 
      return this.http.get<Hotel[]>(`${environment.url_ms_logic}/hotels`); 
    }
    delete(id:number) {
      return this.http.delete<Hotel>(`${environment.url_ms_logic}/hotels/${id}`);
    }
    view(id:number): Observable<Hotel> {
      return this.http.get<Hotel>(`${environment.url_ms_logic}/hotels/${id}`);
    }
    create(newhotel: Hotel): Observable<Hotel> {
      return this.http.post<Hotel>(`${environment.url_ms_logic}/hotels`,newhotel);
    }
    update(thehotel: Hotel): Observable<Hotel> {
      return this.http.put<Hotel>(`${environment.url_ms_logic}/hotels/${thehotel.id}`,thehotel);
    }
   }

