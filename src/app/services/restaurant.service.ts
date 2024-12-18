import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {} 
    list(): Observable<Restaurant[]> { 
      return this.http.get<Restaurant[]>(`${environment.url_ms_logic}/restaurants`); 
    }
    delete(id:number) {
      return this.http.delete<Restaurant>(`${environment.url_ms_logic}/restaurants/${id}`);
    }
    view(id:number): Observable<Restaurant> {
      return this.http.get<Restaurant>(`${environment.url_ms_logic}/restaurants/${id}`);
    }
    create(newrestaurant: Restaurant): Observable<Restaurant> {
      return this.http.post<Restaurant>(`${environment.url_ms_logic}/restaurants`,newrestaurant);
    }
    update(therestaurant: Restaurant): Observable<Restaurant> {
      return this.http.put<Restaurant>(`${environment.url_ms_logic}/restaurants/${therestaurant.id}`,therestaurant);
    }
   }
  

