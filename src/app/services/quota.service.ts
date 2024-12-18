import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quota } from "../models/quota.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class QuotaService {
  constructor(private http: HttpClient) {}

  list(): Observable<Quota[]> {
    return this.http.get<Quota[]>(`${environment.url_ms_logic}/quotas`);
  }

  view(id: number): Observable<Quota> {
    return this.http.get<Quota>(`${environment.url_ms_logic}/quotas/${id}`);
  }

  create(quota: Quota): Observable<Quota> {
    return this.http.post<Quota>(`${environment.url_ms_logic}/quotas`, quota);
  }

  delete(id: number) {
    return this.http.delete<Quota>(`${environment.url_ms_logic}/quotas/${id}`);
  }

  update(quota: Quota): Observable<Quota> {
    return this.http.put<Quota>(
      `${environment.url_ms_logic}/quotas/${quota.id}`,
      quota //hay que anexarle un body
    );
  }
}
