import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tranches } from '../models/tranches.model';

@Injectable({
  providedIn: 'root'
})
export class TrancheService {

  constructor(private http:HttpClient) { }
  list(): Observable<Tranches[]> { 
    return this.http.get<Tranches[]>(`${environment.url_ms_logic}/tranches`); 
  }
  delete(id:number) {
    return this.http.delete<Tranches>(`${environment.url_ms_logic}/tranches/${id}`);
  }
  view(id:number): Observable<Tranches> {
    return this.http.get<Tranches>(`${environment.url_ms_logic}/tranches/${id}`);
  }
  create(newTranches: Tranches): Observable<Tranches> {
    return this.http.post<Tranches>(`${environment.url_ms_logic}/tranches`,newTranches);
  }
  update(theTranches: Tranches): Observable<Tranches> {
    return this.http.put<Tranches>(`${environment.url_ms_logic}/tranches/${theTranches.id}`,theTranches);
  }
}
