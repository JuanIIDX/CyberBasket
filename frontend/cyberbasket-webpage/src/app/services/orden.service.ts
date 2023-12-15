import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable, map, pluck } from 'rxjs';
import { Carrito_Compra_Carga_Model } from 'src/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient) { }


  post_carrito_compra(modelo: Carrito_Compra_Carga_Model): Observable<Carrito_Compra_Carga_Model> {
    const url = `${environment.URL_ORDEN}orden/carrito_compras`;
    console.log(url)
    console.log(modelo)

    return this.http.post<Carrito_Compra_Carga_Model>(url, {
      id_producto: modelo.id_producto,
      id_user: modelo.id_user,
      cantidad: modelo.cantidad,
      precio_unitario: modelo.precio_unitario,
      estado: modelo.estado
    });
  }

  carga_ordednes(id_producto: number) {
    const url = `${environment.URL_ORDEN}imagenes_producto/decorativas?producto_id=${id_producto}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  carga_datos_ordenes(id_user: number) {
    const url = `${environment.URL_ORDEN}orden/orden_by_user/${id_user}`;
    console.log(url);
    return this.http.get<any>(url);
  }


  loadData(): Promise<any> {
    /* const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Bearer ${authToken},
    }); */
    return new Promise((resolve) => {
      this.http.get<any>(`${environment.URL_TEST_ORDEN}anuncios`, {}).subscribe(
        (resp) => {
          return resolve(resp);
        },
        (err) => {
          return resolve(null);
        }
      );
    });
  }



  loadDataId(id: number): Observable<any> {
    /* const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: Bearer ${authToken},
    }); */


    
    return this.http
      .get<any>(`${environment.URL_ORDEN}orden/carrito_compras/user/${id}`, {})
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return {};
          }
        })
      );
  }


  


}



