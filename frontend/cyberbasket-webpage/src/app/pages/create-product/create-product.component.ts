import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { Producto_Insertar_Model } from 'src/models/producto.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  /* Variables de muestra*/
  tienda_actual: string = "Tienda 1";


  /* Variables de producto*/
  tienda_id: number = 1;
  titulo: string = "";
  descripcion: string = "";
  precio: number = 0;
  id_categoria: number = 1;
  stock: number = 0;

  /* Variables de json*/
  tiendas: Map<number, string> = new Map<number, string>();


  /* Variables de imagenes*/
  lista_imagenes: string[] = ["","","","",""];
  imageError: string;

  constructor(public tiendaService: TiendaService) {}

  ngOnInit(): void {

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

    modelo.tienda_id= 1;
    modelo.nombre_producto= this.titulo;
    modelo.descripcion_producto= this.descripcion;
    modelo.precio_producto= 10000;
    modelo.id_categoria= 1;
    modelo.stock= 100;
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
  




}
