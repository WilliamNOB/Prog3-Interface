import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Administrator } from "../models/administrator.model";
//import { Service } from "../models/service.model";

@Injectable({
  providedIn: "root",
})
export class AdministratorService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Administrator[]> { 
    return this.http.get<Administrator[]>(`${environment.url_ms_logic}/administrators`); 
  }
  delete(id:number) {
    return this.http.delete<Administrator>(`${environment.url_ms_logic}/administrators/${id}`);
  }
  view(id:number): Observable<Administrator> {
    return this.http.get<Administrator>(`${environment.url_ms_logic}/administrators/${id}`);
  }
  create(Administrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${environment.url_ms_logic}/administrators`,Administrator);
  }
  update(Administrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${environment.url_ms_logic}/administrators/${Administrator.id}`,Administrator);
  }
}
