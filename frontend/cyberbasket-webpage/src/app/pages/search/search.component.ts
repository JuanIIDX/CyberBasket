import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventarioService } from 'src/app/services/inventario.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /*----------Datos que se van a mostrar en la portada-------------------*/
  datos_productos_home: any[] = [];
  imagenes_productos_home: {} = {};
  imagen_principal: string = "";

  /*----------Datos para la paginacion-------------------*/
  pagina_actual: number = 0;
  elementos_por_pagina: number = 50;
  numero_paginas: number = 0;
  pagina_siguiente: string = '';
  pagina_anterior: string = '';

  busqueda: string = '';
  categoria: string = '';



  ngOnInit() {
    this.pagina_actual = this.route.snapshot.queryParams['pagina'];
    this.busqueda = this.route.snapshot.queryParams['word'];
    this.categoria = this.route.snapshot.queryParams['category'];
    if (this.pagina_actual == null) {
      this.pagina_actual = 0;
    }
    if (this.busqueda == null) {
      this.busqueda = '';
    }
    if (this.categoria == null) {
      this.categoria = '';
    }

    console.log("Pagina actual: " + this.pagina_actual);
    console.log("Busqueda: " + this.busqueda);
    console.log("Categoria: " + this.categoria);



    this.pagina_siguiente="/?pagina="+(Number(this.pagina_actual)+1).toString();
    
    this.pagina_anterior="/?pagina="+(Number(this.pagina_actual)+-1).toString();

    if(this.categoria===""){
      console.log("Sin categoria");
      this.carga_datos_sincategoria();
    }
    else{
      console.log("Con categoria");
      this.carga_datos_concategoria();
    }
 
    
    

    
    
  }

  constructor(private http: HttpClient,private inventarioService:InventarioService,private route: ActivatedRoute) { }

  imprime_datos() {
    console.log(this.imagenes_productos_home);
  }

  //Carga datos dedsde el servicio de inventario
  carga_datos_sincategoria(): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_datos_search_sincat(this.pagina_actual, this.elementos_por_pagina,this.busqueda)
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

//carga datos con categoria
carga_datos_concategoria(): Promise<any> {
  return new Promise((resolve) => {
    this.inventarioService.carga_datos_search_concat(this.pagina_actual, this.elementos_por_pagina,this.busqueda,this.categoria)
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
