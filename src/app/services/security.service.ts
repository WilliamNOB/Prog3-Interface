import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  theUser = new BehaviorSubject<User>(new User);//Variable global
  constructor(private http: HttpClient) { 
    this.verifyActualSession()
  }

  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/login`, user);
  }
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/resetPassword`, { email });
  }

  verify2FA(email: string, token2FA: string): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/login-2FA`, { email, token2FA });
  }

  
  /*
  Guardar la información de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    if (dataSesion.token) { // Token definitivo después del 2FA
      let data: User = {
        _id: dataSesion["user"]["_id"],
        name: dataSesion["user"]["name"],
        email: dataSesion["user"]["email"],
        password: "",
        token: dataSesion["token"]
      };
      localStorage.setItem('sesion', JSON.stringify(data));
      this.setUser(data);
    } else {
      console.warn('Sesión temporal almacenada. Falta completar el 2FA.');
    }
  }
  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    this.theUser.next(user);
  }
  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*/
  public get activeUserSession(): User {
    return this.theUser.value;
  }


  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }

}
/*
saveSession(dataSesion: any) {
    let data: User = {
      _id: dataSesion["user"]["_id"],
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password: "",
     // role:dataSesion["user"]["role"],
      token: dataSesion["token"]
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }
*/ 
