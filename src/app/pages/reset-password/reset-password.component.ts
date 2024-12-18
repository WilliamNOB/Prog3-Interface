import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  constructor(private securityService: SecurityService, private router:Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    if (!this.email) {
      Swal.fire("Error", "Por favor, ingresa tu correo electrónico", "error");
      return;
    }

    this.securityService.resetPassword(this.email).subscribe({
      next: (data) => {
        Swal.fire(
          "Correo enviado",
          `Se ha enviado una nueva contraseña al correo: ${this.email}`,
          "success"
        );
        this.router.navigate(['login'])
      },
      error: (err) => {
        Swal.fire("Error", "No se encontró un usuario con ese correo", "error");
      }
    });
  }

}
