import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from 'src/app/services/tienda.service';
import { ProductoModel } from 'src/models/producto.model';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {


  even: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private tiendaService:TiendaService) {
    this.even = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  get obtenerFgValidador() {
    return this.even.controls;
  }

  async test_post() {

    console.log('test_post');
/*     this.loadingService.presentLoading(); */
/*     let user_id = JSON.parse(localStorage.getItem('usuario')).id; */
    const modelo: ProductoModel = new ProductoModel();


    modelo.nombre = this.obtenerFgValidador['nombre'].value; 
    modelo.descripcion = this.obtenerFgValidador['descripcion'].value; 
    modelo.precio = this.obtenerFgValidador['precio'].value;


    this.tiendaService.postProducto(modelo).subscribe(
      (datos) => {
/*         this.loadingService.loadingController.dismiss(); */
        console.log('Registro almacenado correctamente.');

      },
      (err) => {
/*         this.loadingService.loadingController.dismiss(); */
        console.log('Error al almacenar el registro.');

      }
    );

}
}
