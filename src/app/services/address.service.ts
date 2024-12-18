import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}
  list(): Observable<Address[]> { 
    return this.http.get<Address[]>(`${environment.url_ms_logic}/addresses`); 
  }
  delete(id:number) {
    return this.http.delete<Address>(`${environment.url_ms_logic}/addresses/${id}`);
  }
  view(id:number): Observable<Address> {
    return this.http.get<Address>(`${environment.url_ms_logic}/addresses/${id}`);
  }
  create(newaddresses: Address): Observable<Address> {
    return this.http.post<Address>(`${environment.url_ms_logic}/addresses`,newaddresses);
  }
  update(theaddresses: Address): Observable<Address> {
    return this.http.put<Address>(`${environment.url_ms_logic}/addresses/${theaddresses.id}`,theaddresses);
  }
 }




