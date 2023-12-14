import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventarioService } from 'src/app/services/inventario.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /*----------Datos que se van a mostrar en la portada-------------------*/
  datos_productos_home: any[] = [];
  imagenes_productos_home: {} = {};
  imagen_principal: string = "";

  /*----------Datos para la paginacion-------------------*/
  pagina_actual: number = 0;
  elementos_por_pagina: number = 8;
  numero_paginas: number = 0;
  pagina_siguiente: string = '';
  pagina_anterior: string = '';



  ngOnInit() {
    this.pagina_actual = this.route.snapshot.queryParams['pagina'];
    if (this.pagina_actual == null) {
      this.pagina_actual = 0;
    }


  

    this.pagina_siguiente="/?pagina="+(Number(this.pagina_actual)+1).toString();
    
    this.pagina_anterior="/?pagina="+(Number(this.pagina_actual)+-1).toString();
 
    this.carga_datos_home();
    

    
    
  }

  constructor(private http: HttpClient,private inventarioService:InventarioService,private route: ActivatedRoute) { }

  imprime_datos() {
    console.log(this.imagenes_productos_home);
  }

  //Carga datos dedsde el servicio de inventario
  carga_datos_home(): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_datos_home(this.pagina_actual, this.elementos_por_pagina)
        .subscribe(
          (resp) => {
            console.log('Valid response:', resp);
            this.datos_productos_home = resp.productos;

            this.numero_paginas = resp.numero_paginas;
            console.log("Se cargo correctamente la informacion del producto");

            for (let i = 0; i < this.datos_productos_home.length; i++) {
              this.carga_imagen_principal(resp.productos[i].id_producto);
            }



            resolve(resp);
          },
          (err) => {

            console.error('Error:', err);
            resolve(null);
          }
        );
    });
  }

  carga_imagen_principal(producto_id:number): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_imagen_principal(producto_id)
        .subscribe(
          (resp) => {
            console.log('Valid response:', resp);
            console.log("Se cargo correctamente la imagen primaria "+producto_id);
            this.imagenes_productos_home[producto_id]=resp.base64content;
            return resp;
            resolve(resp);
          },
          (err) => {
            this.imagenes_productos_home[producto_id]='';
            console.log("Error cargando la imagen "+producto_id);
            console.error('Error:', err);
            resolve(null);
          }
        );
    });
  }






}
