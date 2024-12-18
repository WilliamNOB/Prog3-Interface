import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }
  list(): Observable<Driver[]> { 
    return this.http.get<Driver[]>(`${environment.url_ms_logic}/drivers`); 
  }
  delete(id:number) {
    return this.http.delete<Driver>(`${environment.url_ms_logic}/drivers/${id}`);
  }
  view(id:number): Observable<Driver> {
    return this.http.get<Driver>(`${environment.url_ms_logic}/drivers/${id}`);
  }
  create(Driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${environment.url_ms_logic}/drivers`,Driver);
  }
  update(Driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${environment.url_ms_logic}/drivers/${Driver.id}`,Driver);
  }
}
