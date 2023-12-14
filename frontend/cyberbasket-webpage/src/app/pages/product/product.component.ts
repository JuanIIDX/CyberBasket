import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  //Datos 
  id_producto: string="";

  //Datos a mostrar
  nombre_producto: string="";
  descripcion_producto: string="";
  stock: number=0;
  precio_producto: number=0;
  precio_envio: number=0;

  
  //marca_producto: string="";

  //imagenes producto
  lista_imagenes: string [];

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.id_producto = this.route.snapshot.queryParams['id'];
    this.obtiene_info_producto();
  }

  obtiene_info_producto(){
    this.carga_datos_producto();
    
    this.lista_imagenes=["","","","",""];
    this.carga_imagen_principal();
    this.carga_imagenes_secundarias();




    }

    //OBTIENE LAS IMAGENES DEL PRODUCTO


    ///ORGANIZA LUEGO COMO OBTIENE DATOS DE PRODUCTO
    carga_datos_producto(): Promise<any> {

      return new Promise((resolve) => {
        this.http
          .get<any>(`http://127.0.0.1/producto/?producto_id=`+this.id_producto)
          .subscribe(
            (resp) => {
              this.stock=resp.cantidad;
              this.descripcion_producto=resp.descripcion;
              this.id_producto=resp.id_producto;
              this.nombre_producto=resp.nombre;
              this.precio_producto=resp.precio;
              console.log(resp);
              return resolve(resp);
            },
            (err) => {
              return resolve(null);
            }
          );
      });
    }

      ///ORGANIZA LUEGO COMO OBTIENE IMAGEN PRINCIPAL
      carga_imagen_principal(): Promise<any> {

        return new Promise((resolve) => {
          this.http
            .get<any>(`http://127.0.0.1/imagenes_producto/principal?producto_id=`+this.id_producto)
            .subscribe(
              (resp) => {
                this.lista_imagenes[0]=resp.base64content;

                //console.log(resp);
                return resolve(resp);
              },
              (err) => {
                return resolve(null);
              }
            );
        });
      }

        ///ORGANIZA LUEGO COMO OBTIENE IMAGEN PRINCIPAL
        carga_imagenes_secundarias(): Promise<any> {

          return new Promise((resolve) => {
            this.http
              .get<any>(`http://127.0.0.1/imagenes_producto/decorativas?producto_id=`+this.id_producto)
              .subscribe(
                (resp) => {

                  for (let index = 0; index < resp.length; index++) {
                    this.lista_imagenes[index+1]=resp[index].base64content;
                  }

                  return resolve(resp);
                },
                (err) => {
                  return resolve(null);
                }
              );
          });
        }




  
}
