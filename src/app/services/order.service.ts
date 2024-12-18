import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  list(): Observable<Order[]> { 
    return this.http.get<Order[]>(`${environment.url_ms_logic}/orders`); 
  }
  delete(id:number) {
    return this.http.delete<Order>(`${environment.url_ms_logic}/orders/${id}`);
  }
  view(id:number): Observable<Order> {
    return this.http.get<Order>(`${environment.url_ms_logic}/orders/${id}`);
  }
  create(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.url_ms_logic}/orders`,newOrder);
  }
  update(theOrder: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.url_ms_logic}/orders/${theOrder.id}`,theOrder);
  }
}
