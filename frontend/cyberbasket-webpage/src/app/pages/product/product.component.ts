import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  //Datos 
  id_producto_pagina: number=0;

  //Datos a mostrar
  nombre_producto: string="";
  nombre_tienda: string="";
  descripcion_producto: string="";
  stock: number=0;
  precio_producto: number=0;
  precio_envio: number=8000;
  id_tienda: number = 0;

  
  //marca_producto: string="";

  //imagenes producto
  lista_imagenes: string [];

  constructor(private route: ActivatedRoute,private http: HttpClient,private inventarioServicio:InventarioService) { }

  ngOnInit() {
    this.id_producto_pagina = this.route.snapshot.queryParams['id'];
    this.obtiene_info_producto();
  }

  obtiene_info_producto(){
    console.log("datos del producto");
    this.carga_datos_producto();
    console.log("datos del producto");
    
    this.lista_imagenes=["","","","",""];
    this.carga_imagen_principal();
    this.carga_imagenes_secundarias();
    }


    /**
     * 
     * -----------------Metodos para obtener datos del servidor-----------------------
     * 
     */

    /*
    *Metodo que carga los datos del producto
    *
    */
    carga_datos_producto(): Promise<any> {
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
    }
      

    //OBTIENE LAS IMAGENES DEL PRODUCTO


      carga_imagen_principal(): Promise<any> {
        return new Promise((resolve) => {
          this.inventarioServicio.carga_imagen_principal(this.id_producto_pagina)
            .subscribe(
              (resp) => {
                console.log('Valid response:', resp);
                this.lista_imagenes[0]=resp.base64content;
                console.log("Se cargo correctamente la imagen primaria");
                resolve(resp);
              },
              (err) => {
                console.error('Error:', err);
                resolve(null);
              }
            );
        });
      }

      carga_imagenes_secundarias(): Promise<any> {
        return new Promise((resolve) => {
          this.inventarioServicio.carga_imagenes_secundarias(this.id_producto_pagina)
            .subscribe(
              (resp) => {
                for (let index = 0; index < resp.length; index++) {
                  this.lista_imagenes[index+1]=resp[index].base64content;
                  
                }
                console.log("Se cargaron correctamente las imagenes secundarias");
                return resolve(resp);
              },
              (err) => {
                console.error('Error:', err);
                resolve(null);
              }
            );
        });
      }













  
}
