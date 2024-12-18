import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http:HttpClient) { }
  list(): Observable<Contract[]> { 
    return this.http.get<Contract[]>(`${environment.url_ms_logic}/contracts`); 
  }
  delete(id:number) {
    return this.http.delete<Contract>(`${environment.url_ms_logic}/contracts/${id}`);
  }
  view(id:number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.url_ms_logic}/contracts/${id}`);
  }
  create(newContract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${environment.url_ms_logic}/contracts`,newContract);
  }
  update(theContract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.url_ms_logic}/contracts/${theContract.id}`,theContract);
  }
}
