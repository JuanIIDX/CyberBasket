import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { ProductoModel } from 'src/models/producto.model';
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


  postProducto(modelo: ProductoModel): Observable<ProductoModel> {
    return this.http.post<ProductoModel>(`${environment.URL_TIENDA}producto`, {
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      precio: modelo.precio
    });
  }
  


}