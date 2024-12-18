import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser:User
  constructor(private theSecurityService: SecurityService, private router: Router) {
    this.theUser = {
      email: "",
      password: ""
  }
}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    this.theSecurityService.login(this.theUser).subscribe({
      next: (data) => {
        console.log("RESPUESTA" + JSON.stringify(data));
        // Redirigir al flujo de 2FA
        Swal.fire(
          'Código 2FA enviado',
          'Por favor verifica el código en tu correo electrónico.',
          'info'
        );
        localStorage.setItem('sesionTemporal', JSON.stringify(data)); // Almacenar sesión temporal
        this.router.navigate(['login-2FA']);
      },
      error: (error) => {
        Swal.fire('Autenticación inválida', 'Usuario o contraseña incorrecta', 'error');
      },
    });
  }
  

  register(){
    this.router.navigate(["register"])
  }
  resetPassword(){
    this.router.navigate(['resetPassword'])
  }

}
/*
login(){
    this.theSecurityService.login(this.theUser).subscribe({
      next:(data)=>{
        console.log("RESPUESTA"+JSON.stringify(data))
        this.theSecurityService.saveSession(data)
        this.router.navigate(['login-2FA'])
  },
  error:(error)=>{
    Swal.fire("Autenticaicon invalida", "Usuario o contraseña incorrecta", "error")
}
    })
  }
*/
