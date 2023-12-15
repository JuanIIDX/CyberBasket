import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';
import { OrdenService } from 'src/app/services/orden.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  listaProductoById: any[] = [];
  lista_imagenes = ['', '', '', '', ''];
  imagenes_productos_home: {} = {};
  dataCarrito: any;
  activeUser: UserModel;
  storedUserString = sessionStorage.getItem('user');

  constructor(
    private ordenService: OrdenService,
    private route: ActivatedRoute,
    private router: Router,
    private inventarioService: InventarioService
  ) {}

  ngOnInit() {
    console.log(this.storedUserString);
    if (this.storedUserString) {
      const storedUser = JSON.parse(this.storedUserString);

      this.activeUser = new UserModel();
      this.activeUser.id = storedUser.id;
      console.log(this.activeUser.id);
      this.getOrdenes(this.activeUser.id);
      //this.getComplex(5);
    }
  }

  getOrdenes(id: number) {
    const productosProcesados = new Set<number>();

    this.ordenService
      .loadDataId(id)
      .pipe(
        tap((data) => {
          this.dataCarrito = data;
          data.forEach((e) => {
            const idProducto = e.id_producto;
            this.carga_datos_producto(idProducto);
            this.carga_imagen_principal1(idProducto);
            // Verificar si el id_producto ya ha sido procesado
          });
        })
      )
      .subscribe();
  }

  carga_datos_producto(id): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_datos_producto(id).subscribe(
        (resp) => {
          this.listaProductoById.push(resp);
          console.log(this.listaProductoById);

          console.log('Se cargo correctamente la informacion del producto');
          resolve(resp);
        },
        (err) => {
          console.error('Error:', err);
          resolve(null);
        }
      );
    });
  }

  onClick() {
    this.listaProductoById.push('hola');
    console.log(this.listaProductoById);
  }

  carga_imagen_principal(id_producto): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_imagen_principal(id_producto).subscribe(
        (resp) => {
          console.log('Valid response:', resp);
          this.lista_imagenes[0] = resp.base64content;
          console.log('Se cargo correctamente la imagen primaria');
          resolve(resp);
        },
        (err) => {
          console.error('Error:', err);
          resolve(null);
        }
      );
    });
  }

  carga_imagen_principal1(producto_id: number): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_imagen_principal(producto_id).subscribe(
        (resp) => {
          console.log('Valid response:', resp);
          console.log(
            'Se cargo correctamente la imagen primaria ' + producto_id
          );
          this.imagenes_productos_home[producto_id] = resp.base64content;
          return resp;
          resolve(resp);
        },
        (err) => {
          this.imagenes_productos_home[producto_id] = '';
          console.log('Error cargando la imagen ' + producto_id);
          console.error('Error:', err);
          resolve(null);
        }
      );
    });
  }
}
