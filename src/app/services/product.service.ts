import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_ms_logic}/products`);
  }

  view(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.url_ms_logic}/products/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.url_ms_logic}/products`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete<Product>(
      `${environment.url_ms_logic}/products/${id}`
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${environment.url_ms_logic}/products/${product.id}`,
      product //hay que anexarle un body
    );
  }
}
