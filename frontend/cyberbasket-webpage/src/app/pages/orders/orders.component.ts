import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';
import { OrdenService } from 'src/app/services/orden.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  dataOrdenes: any;
  activeUser: UserModel;
  storedUserString = sessionStorage.getItem('user');
  listaProductoById: any[] = [];
  lista_imagenes = ['', '', '', '', ''];
  imagenes_productos_home: {} = {};

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
      .carga_datos_ordenes(id)
      .pipe(
        tap((data) => {
          this.dataOrdenes = data;
          console.log('------------------');
          console.log(this.dataOrdenes);
          data.forEach((e) => {
            const idProducto = e.producto_id;
            this.carga_datos_producto(idProducto, e.cantidad,e.estado);
            this.carga_imagen_principal1(idProducto);
            
            console.log('---------dato---------');
            console.log(e);
            // Verificar si el id_producto ya ha sido procesado
          });
          console.log('------------------');
        })
      )
      .subscribe();
  }

  carga_datos_producto(id,cantidad,estado): Promise<any> {
    return new Promise((resolve) => {
      this.inventarioService.carga_datos_producto(id).subscribe(
        (resp) => {
          resp.cantidad = cantidad;
          resp.descripcion = estado; 

          this.listaProductoById.push(resp);

          console.log('termina dato');

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
