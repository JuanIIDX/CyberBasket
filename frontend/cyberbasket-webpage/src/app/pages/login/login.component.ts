import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginSchema: any = {
    "email": "",
    "password": ""
  }

  loginForm: FormGroup;
  cargando_servidor: boolean = false;

  constructor(
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.cargando_servidor = true;
    this.client.post(`${environment.URL_USERS}users/login`, this.loginForm.value).subscribe(
      (data: any) => {
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        this.router.navigateByUrl("/dashboard");
      },
      (err: HttpErrorResponse) => {
        this.cargando_servidor = false;
        alert(err.error.detail);
      }
    )
  }
}
