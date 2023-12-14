import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import {  Producto_Json_Solo_Model } from 'src/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  inventario_json: any;

  constructor(private http: HttpClient) { }


  /*
  *Metodo que carga los productos del home
  */
  carga_datos_home(pagina: number,elementos:number) {
    const url = `${environment.URL_INVENTARIO}productos/home?pagina=${pagina}&elementos=${elementos}`;
    console.log(url);
    return this.http.get<any>(url);
  }



  /*
  *Metodo que carga los datos del producto
  */
  carga_datos_producto(id_producto: number) {
    const url = `${environment.URL_INVENTARIO}producto?id_producto=${id_producto}`;
    console.log(url);
    return this.http.get<Producto_Json_Solo_Model>(url);
  }

  /*
  *Metodo que carga por paginacion los datos de los productos para el home
  */
  carga_imagen_principal(id_producto: number) {
    const url = `${environment.URL_INVENTARIO}imagenes_producto/principal?producto_id=${id_producto}`;
    console.log(url);
    
    return this.http.get<any>(url);
  }


  /*
  *Metodo que carga la imagen principal de un producto
  */
  carga_imagenes_secundarias(id_producto: number) {
    const url = `${environment.URL_INVENTARIO}imagenes_producto/decorativas?producto_id=${id_producto}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  /*
  *Metodo que carga las imagenes secundarias de un producto
  */

}
