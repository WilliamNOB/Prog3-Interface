import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) {}
  list(): Observable<Operation[]> { 
    return this.http.get<Operation[]>(`${environment.url_ms_logic}/operations`); 
  }
  delete(id:number) {
    return this.http.delete<Operation>(`${environment.url_ms_logic}/operations/${id}`);
  }
  view(id:number): Observable<Operation> {
    return this.http.get<Operation>(`${environment.url_ms_logic}/operations/${id}`);
  }
  create(newoperations: Operation): Observable<Operation> {
    return this.http.post<Operation>(`${environment.url_ms_logic}/operations`,newoperations);
  }
  update(theoperations: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${environment.url_ms_logic}/operations/${theoperations.id}`,theoperations);
  }
 }

