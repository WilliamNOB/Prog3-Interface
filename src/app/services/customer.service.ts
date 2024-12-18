import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class customerService {
  constructor(private http: HttpClient) {}

  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.url_ms_logic}/customers`);
  }

  view(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${environment.url_ms_logic}/customers/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Customer>(
      `${environment.url_ms_logic}/customers/${id}`
    );
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.url_ms_logic}/customers`,
      customer
    );
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.url_ms_logic}/customers/${customer.id}`,
      customer
    );
  }
}
