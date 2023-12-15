import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss']
})
export class CreateShopComponent {

  /* Variables de muestra*/
  nombre_tienda: string = "";
  descripcion: string = "";
  id_direccion:number=1;
  estado:boolean=true;


  /* Variables de imagenes*/
  imagen_base64:string;
  imageError: string;

  constructor(public tiendaService:TiendaService) {}

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
            this.imagen_base64 = imgBase64Path;
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
  post_nueva_tienda() {
    console.log('info')
    console.log(this.id_direccion);
    console.log(this.nombre_tienda);
    console.log(this.descripcion);
    console.log(this.estado);
    console.log(this.imagen_base64);  }
  




}
