import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http:HttpClient) { }
  list(): Observable<Route[]> { 
    return this.http.get<Route[]>(`${environment.url_ms_logic}/routes`); 
  }
  delete(id:number) {
    return this.http.delete<Route>(`${environment.url_ms_logic}/routes/${id}`);
  }
  view(id:number): Observable<Route> {
    return this.http.get<Route>(`${environment.url_ms_logic}/routes/${id}`);
  }
  create(newRoute: Route): Observable<Route> {
    return this.http.post<Route>(`${environment.url_ms_logic}/routes`,newRoute);
  }
  update(theRoute: Route): Observable<Route> {
    return this.http.put<Route>(`${environment.url_ms_logic}/routes/${theRoute.id}`,theRoute);
  }
}
