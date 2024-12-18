import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiclesDriver } from '../models/vehicles-driver.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDriverService {

  constructor(private http:HttpClient) { }
  list(): Observable<VehiclesDriver[]> { 
    return this.http.get<VehiclesDriver[]>(`${environment.url_ms_logic}/VehiclesDriver`); 
  }
  delete(id:number) {
    return this.http.delete<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver/${id}`);
  }
  view(id:number): Observable<VehiclesDriver> {
    return this.http.get<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver/${id}`);
  }
  create(newVehiclesDriver: VehiclesDriver): Observable<VehiclesDriver> {
    return this.http.post<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver`,newVehiclesDriver);
  }
  update(theVehiclesDriver: VehiclesDriver): Observable<VehiclesDriver> {
    return this.http.put<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver/${theVehiclesDriver.id}`,theVehiclesDriver);
  }
}
