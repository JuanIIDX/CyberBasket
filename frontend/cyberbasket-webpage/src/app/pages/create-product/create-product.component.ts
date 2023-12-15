import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { Producto_Insertar_Model } from 'src/models/producto.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  /* Variables de muestra*/
  tienda_actual: string = "Tienda 1";
  storedUserString = sessionStorage.getItem('user');


  /* Variables de producto*/
  tienda_id: number = 1;
  titulo: string = "";
  descripcion: string = "";
  precio: number = 0;
  id_categoria: number = 1;
  stock: number = 0;

  /* Variables de json*/
  activeUser: UserModel;
  id_usuario: number = 0;
  id_tienda: number = 0;
  nombre_tienda: string = "";



  /* Variables de imagenes*/
  lista_imagenes: string[] = ["","","","",""];
  imageError: string;

  constructor(public tiendaService: TiendaService,private http: HttpClient) {}

  ngOnInit(): void {
    if (this.storedUserString) {
      const storedUser = JSON.parse(this.storedUserString);

      this.activeUser = new UserModel();
      this.activeUser.id = storedUser.id;
      this.id_usuario = storedUser.id;
      console.log(this.id_usuario);
      this.get_id_tienda();

    }

  }

  /**
   * Genera una imagen en base 64
   * 
   */
  fileChangeEvent(fileInput: any, index: number) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimensions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.lista_imagenes[index] = imgBase64Path;
            return true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true; // Add a return statement to ensure all code paths return a value
  }


  /**
   * Llama al metodo post
   * 
   */
  llamarMetodoPost() {
    const modelo:  Producto_Insertar_Model = new Producto_Insertar_Model();

    modelo.tienda_id= this.tienda_id;
    modelo.nombre_producto= this.titulo;
    modelo.descripcion_producto= this.descripcion;
    modelo.precio_producto= this.precio;
    modelo.id_categoria= this.id_categoria;
    modelo.stock=this.stock ;
    modelo.lista_imagenes = this.lista_imagenes;

    console.log(this.lista_imagenes);

    this.tiendaService.postProducto(modelo).subscribe(
      (datos) => {
/*      this.loadingService.loadingController.dismiss(); */
        console.log('Registro almacenado correctamente.');
        alert('Registro almacenado correctamente.');
        

      },
      (err) => {
/*         this.loadingService.loadingController.dismiss(); */
        console.log('Error al almacenar el registro.');
        alert('Error al almacenar el registro.');

      }
    );
  }



get_id_tienda() {
  const url = 'https://micro-tienda.victoriouspebble-f396dfa4.westus2.azurecontainerapps.io/tienda_de_user?usuario_id='+this.id_usuario; // Reemplaza con la URL de tu endpoint

  this.http.get(url).subscribe(
    (data) => {
      console.log(data); // Imprime el JSON en la consola
      this.id_tienda= data["id_tienda"];
      this.nombre_tienda= data["nombre"];
      alert('Su usuario si tiene tienda');

    },
    (error) => {
      console.log('Error al realizar la solicitud GET:', error);
      alert('El usuario no tiene tiendas');
    }
  );
}
  




}
