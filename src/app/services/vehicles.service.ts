import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http:HttpClient) { }
  list(): Observable<Vehicle[]> { 
    return this.http.get<Vehicle[]>(`${environment.url_ms_logic}/Vehicles`); 
  }
  delete(id:number) {
    return this.http.delete<Vehicle>(`${environment.url_ms_logic}/Vehicles/${id}`);
  }
  view(id:number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.url_ms_logic}/Vehicles/${id}`);
  }
  create(newVehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.url_ms_logic}/Vehicles`,newVehicle);
  }
  update(theVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.url_ms_logic}/Vehicles/${theVehicle.id}`,theVehicle);
  }
}
