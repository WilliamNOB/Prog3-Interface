import { Injectable } from '@angular/core';
import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  list(): Observable<Bill[]> { 
    return this.http.get<Bill[]>(`${environment.url_ms_logic}/bills`); 
  }
  delete(id:number) {
    return this.http.delete<Bill>(`${environment.url_ms_logic}/bills/${id}`);
  }
  view(id:number): Observable<Bill> {
    return this.http.get<Bill>(`${environment.url_ms_logic}/bills/${id}`);
  }
  create(newBill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${environment.url_ms_logic}/bills`,newBill);
  }
  update(theBill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${environment.url_ms_logic}/bills/${theBill.id}`,theBill);
  }
}
