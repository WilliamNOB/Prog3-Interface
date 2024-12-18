import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  
  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_ms_security}/Users`);
  }

  findByEmail(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/Users/email`, user);
  }

  view(id: String): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/Users/${id}`);
  }

  create(theUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/Users`, theUser)
  }

  update(theUser: User): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/Users/${theUser._id}`, theUser);
  }
  delete(id: String) {
    return this.http.delete<User>(`${environment.url_ms_security}/Users/${id}`);
  }
  getProfile(id:String): Observable<Profile> {
    return this.http.get<Profile>(`${environment.url_ms_security}/profiles/${id}`);
  }
  
  createProfile(id:String, theProfile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.url_ms_security}/profiles/Users/${id}`, theProfile);
  }


  updateProfile(id:String, theProfile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.url_ms_security}/profiles/Users/${id}`, theProfile);
  }
  
  deleteProfile(id: String) {
    return this.http.delete<Profile>(`${environment.url_ms_security}/profiles/${id}`);
  }


}