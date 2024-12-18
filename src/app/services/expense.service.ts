import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {}
  list(): Observable<Expense[]> { 
    return this.http.get<Expense[]>(`${environment.url_ms_logic}/travelExpenses`); 
  }
  delete(id:number) {
    return this.http.delete<Expense>(`${environment.url_ms_logic}/travelExpenses/${id}`);
  }
  view(id:number): Observable<Expense> {
    return this.http.get<Expense>(`${environment.url_ms_logic}/travelExpenses/${id}`);
  }
  create(newtravelExpenses: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.url_ms_logic}/travelExpenses`,newtravelExpenses);
  }
  update(thetravelExpenses: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${environment.url_ms_logic}/travelExpenses/${thetravelExpenses.id}`,thetravelExpenses);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.url_ms_logic}/travelExpenses`);
  }
}

 

 
 


