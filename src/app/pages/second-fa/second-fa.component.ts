import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-second-fa',
  templateUrl: './second-fa.component.html',
  styleUrls: ['./second-fa.component.css']
})
export class SecondFAComponent implements OnInit {
  email: string = '';
  token2FA: string = '';
  constructor(private securityService: SecurityService, private router: Router) {
    const sessionData = localStorage.getItem('sesion');
    if (sessionData) {
      const user = JSON.parse(sessionData);
      this.email = user.email; // Obtener el correo del usuario logueado previamente
    }
  }

  ngOnInit(): void {
  }

  verify2FA() {
    this.securityService.verify2FA(this.email, this.token2FA).subscribe({
      next: (response) => {
        this.securityService.saveSession(response); // Guardar el token definitivo
        Swal.fire('Inicio de sesión exitoso', 'Bienvenido', 'success');
        this.router.navigate(['dashboard']); // Redirigir al dashboard o página principal
      },
      error: () => {
        Swal.fire('Error', 'El código 2FA es incorrecto o ha expirado', 'error');
      },
    });
  }
}
