import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  
    constructor() { }
  
    ngOnInit(): void {
    }

/*     carga_datos_ordenes(): Promise<any> {
      return new Promise((resolve) => {
        this.inventarioServicio.carga_datos_producto(this.id_producto_pagina)
          .subscribe(
            (resp) => {
              console.log('Valid response:', resp);
              this.nombre_producto=resp.nombre_producto;
              this.nombre_tienda=resp.nombre_tienda;
              this.descripcion_producto=resp.descripcion;
              this.stock=resp.cantidad;
              this.precio_producto=resp.precio;

              console.log("Se cargo correctamente la informacion del producto");
              resolve(resp);
            },
            (err) => {
              console.error('Error:', err);
              resolve(null);
            }
          );
      });
    } */

}
