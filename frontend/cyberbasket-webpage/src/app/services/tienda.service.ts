import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { ProductoModel,Producto_Insertar_Model } from 'src/models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getTiendas() {
    alert('getTiendas');
  }

  test_productos(): Promise<any> {
    /*     const authToken = this.getToken();
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        }); */


    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.URL_TIENDA}producto`)
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          });
    })

  };


  /**
   * Posts a new product to the server.
   * 
   * @param modelo - Un modelo del producto
   * @returns El id que necesita
   */
  postProducto(modelo: Producto_Insertar_Model): Observable<Producto_Insertar_Model> {

    console.log(`${environment.URL_TEST}prueba_para_insertar`);
    return this.http.post<Producto_Insertar_Model>(`${environment.URL_TEST}prueba_para_insertar`, {
      tienda_id: modelo.tienda_id,
      nombre_producto: modelo.nombre_producto,
      descripcion_producto: modelo.descripcion_producto,
      precio_producto: modelo.precio_producto,
      id_categoria: modelo.id_categoria,
      stock: modelo.stock,
      lista_imagenes: modelo.lista_imagenes
    });
  }


  


  


}