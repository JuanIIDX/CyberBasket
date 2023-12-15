import { HttpClient } from '@angular/common/http';
import { Component , Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';
import { DOCUMENT } from '@angular/common'
import { UserModel } from 'src/models/user.model';
import { Carrito_Compra_Carga_Model } from 'src/models/producto.model';
import { OrdenService } from 'src/app/services/orden.service';

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

  //Datos del usuario
  activeUser: UserModel = new UserModel();







  //imagenes producto
  lista_imagenes: string [];
  imagen_principal: string="";

  constructor(private router: Router,private route: ActivatedRoute,private http: HttpClient,private inventarioServicio:InventarioService,@Inject(DOCUMENT) private document: Document,private ordenServicio:OrdenService) { }

  ngOnInit() {

    const storedUserString = sessionStorage.getItem("user")

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString)

      this.activeUser = new UserModel();
      this.activeUser.id = storedUser.id
      this.activeUser.email = storedUser.email
      this.activeUser.name = storedUser.name
      this.activeUser.last_name = storedUser.last_name
      this.activeUser.role_id = storedUser.role_id
    }

    console.log(this.activeUser.id);


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

    //Crea un objeto en el carrito de compras

    crear_objeto_carrito_compra() {
      const modelo:  Carrito_Compra_Carga_Model = new Carrito_Compra_Carga_Model();
  
      modelo.id_producto = this.id_producto_pagina;
      modelo.id_user = this.activeUser.id;  
      modelo.cantidad = 1;
      modelo.precio_unitario = this.precio_producto;
      modelo.estado = "pendiente";

  
      console.log(this.lista_imagenes);
  
      this.ordenServicio.post_carrito_compra(modelo).subscribe(
        (datos) => {
  /*      this.loadingService.loadingController.dismiss(); */
          console.log('Registro almacenado correctamente.');
          alert('Se almaceno en el carrito de compras');
          this.router.navigate(['/']);
        },
        (err) => {
  /*         this.loadingService.loadingController.dismiss(); */
          console.log('Error al almacenar el registro.');
          alert('Error al almacenar el registro.');
  
        }
      );
    }













  
}
