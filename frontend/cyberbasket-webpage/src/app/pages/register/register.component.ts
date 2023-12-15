import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  password: string = "";

  loginSchema: any = {
    "name": "",
    "last_name": "",
    "email": "",
    "yourPassword": ""
  }

  registerForm: FormGroup;
  cargando_servidor: boolean = false;

  constructor(
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

  }

  metodo_impresion() {
    console.log(this.nombre);
    console.log(this.apellido);
    console.log(this.email);
    console.log(this.password);



    const payload = {
      "name": this.nombre,
      "last_name": this.apellido,
      "email": this.email,
      "password": this.password,
      "creation_date": "2023-12-15T15:38:52.398940",
      "update_date": "2023-12-15T15:38:52.398961",
      "status": "created",
      "role_id": 1
    };

    this.client.post('https://test-users.victoriouspebble-f396dfa4.westus2.azurecontainerapps.io/users/', payload)
      .subscribe(
        (response) => {
          console.log('POST request successful', response);
          alert("Usuario creado con exito");
          this.router.navigateByUrl("/dashboard");

          // Handle the response here
        },
        (error: HttpErrorResponse) => {
          console.error('POST request failed', error);
          alert("Error al crear usuario");
          // Handle the error here
        }
      );

    
    
  }
}
