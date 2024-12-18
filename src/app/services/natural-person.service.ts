import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { NaturalPerson } from "../models/natural-person.model";

@Injectable({
  providedIn: "root",
})
export class NaturalpersonService {
  constructor(private http: HttpClient) {}

  list(): Observable<NaturalPerson[]> {
    return this.http.get<NaturalPerson[]>(
      `${environment.url_ms_logic}/naturalPeoples`
    );
  }

  view(id: number): Observable<NaturalPerson> {
    return this.http.get<NaturalPerson>(
      `${environment.url_ms_logic}/naturalPeoples/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<NaturalPerson>(
      `${environment.url_ms_logic}/naturalPeoples/${id}`
    );
  }

  create(naturalperson: NaturalPerson): Observable<NaturalPerson> {
    return this.http.post<NaturalPerson>(
      `${environment.url_ms_logic}/naturalPeoples`,
      naturalperson
    );
  }

  update(naturalperson: NaturalPerson): Observable<NaturalPerson> {
    return this.http.put<NaturalPerson>(
      `${environment.url_ms_logic}/naturalPeoples/${naturalperson.id}`,
      naturalperson
    );
  }
}
