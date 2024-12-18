import { Injectable } from '@angular/core'; 
import { Lot } from '../models/lot.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient) { }

  list(): Observable<Lot[]> { 
    return this.http.get<Lot[]>(`${environment.url_ms_logic}/lots`); 
  }
  delete(id:number) {
    return this.http.delete<Lot>(`${environment.url_ms_logic}/lots/${id}`);
  }
  view(id:number): Observable<Lot> {
    return this.http.get<Lot>(`${environment.url_ms_logic}/lots/${id}`);
  }
  create(newLot: Lot): Observable<Lot> {
    return this.http.post<Lot>(`${environment.url_ms_logic}/lots`,newLot);
  }
  update(theLot: Lot): Observable<Lot> {
    return this.http.put<Lot>(`${environment.url_ms_logic}/lots/${theLot.id}`,theLot);
  }
}
