import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/classes/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLogged = false;
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  roles: string[] = []
  errMsj: string;

constructor (private tokenService: TokenService,
  private authService: AuthService,
  private router: Router){}

  ngOnInit(): void {
      if (this.tokenService.getToken()){
        this.isLogged = true;
      }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
      this.router.navigate(["/register"])
    },
    err => {
      this.isRegisterFail = true;
      this.errMsj = err.error.mensaje;
      console.log(this.errMsj)
    })
  }
}
