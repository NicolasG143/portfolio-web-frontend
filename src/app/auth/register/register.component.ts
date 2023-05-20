import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  private router: Router,
  private fb: FormBuilder){}

  ngOnInit(): void {
      if (this.tokenService.getToken()){
        this.isLogged = true;
      }
  }

  registerForm = this.fb.group({
    'nombre': ['', Validators.required],
    'nombreUsuario': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(8)]]
  }
  )

  get name(): FormControl{
    return this.registerForm.get('nombre') as FormControl
  }

  get nickName(): FormControl{
    return this.registerForm.get('nombreUsuario') as FormControl
  }

  get eMail(): FormControl{
    return this.registerForm.get('email') as FormControl
  }

  get passWord(): FormControl{
    return this.registerForm.get('password') as FormControl
  }

  getUserName(): string {
    return this.tokenService.getUserName();
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
