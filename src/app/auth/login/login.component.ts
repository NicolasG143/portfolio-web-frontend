import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/classes/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = {"nombreUsuario": "", "password": ""};
  nickUsuario: string = "";
  passwordUsuario: string = "";
  roles: string[] = [];
  errMsj: string = "";

  constructor(    
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
    ){}

  loginForm = this.fb.group({
    "nombreUsuario": ['', Validators.required],
    "password": ['', Validators.required]
  })

  get nombreUsuario(){
    return this.loginForm.get('nombreUsuario') as FormControl
  }

  get password(){
    return this.loginForm.get('password') as FormControl
  }

  ngOnInit(): void {
      if(this.tokenService.getToken()){
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
      }
  }

  getUserName(): string {
    return this.tokenService.getUserName();
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nickUsuario, this.passwordUsuario);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;
      
      this.tokenService.setToken(data.token)
      this.tokenService.setUserName(data.nombreUsuario)
      this.tokenService.setAuthorities(data.authorities)
      this.roles = data.authorities;
      this.router.navigate([""])
    },
    err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err;
      console.log(this.errMsj)
    })
  }
}
