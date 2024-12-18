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

  login(){
    this.theSecurityService.login(this.theUser).subscribe({
      next:(data)=>{
        this.theSecurityService.saveSession(data)
        this.router.navigate(['dashboard'])
  },
  error:(error)=>{
    Swal.fire("Autenticaicon invalida", "Usuario o contraseña incorrecta", "error")
}
    })
  }
}
