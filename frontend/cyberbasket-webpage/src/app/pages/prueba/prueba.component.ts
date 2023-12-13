import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from 'src/app/services/tienda.service';
import { ProductoModel, Producto_Insertar_Model } from 'src/models/producto.model';


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

    const modelo:  Producto_Insertar_Model = new Producto_Insertar_Model();

    modelo.tienda_id= 1,
    modelo.nombre_producto= this.obtenerFgValidador['nombre'].value; 
    modelo.descripcion_producto= this.obtenerFgValidador['descripcion'].value; 
    modelo.precio_producto= 100,
    modelo.id_categoria= 1,
    modelo.stock= 10

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
