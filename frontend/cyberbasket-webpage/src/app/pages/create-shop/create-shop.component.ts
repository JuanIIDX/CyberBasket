import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';

import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss']
})
export class CreateShopComponent {

  /* Variables de muestra*/
  id_usuario: number = 1;
  nombre_tienda: string = "";
  descripcion: string = "";
  id_direccion:number=1;
  estado:boolean=true;
  storedUserString = sessionStorage.getItem('user');
  activeUser: UserModel;


  /* Variables de imagenes*/
  imagen_base64:string;
  imageError: string;

  constructor(public tiendaService:TiendaService, public http:HttpClient) {}

  ngOnInit(): void {
    if (this.storedUserString) {
      const storedUser = JSON.parse(this.storedUserString);

      this.activeUser = new UserModel();
      this.activeUser.id = storedUser.id;
      this.id_usuario = storedUser.id;
      console.log(this.id_usuario);


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
    const payload = {
      id_usuario:this.id_usuario,
      id_direccion: this.id_direccion,
      nombre: this.nombre_tienda,
      descripcion: this.descripcion,
      estado: this.estado,
    };

    this.http.post('https://micro-tienda.victoriouspebble-f396dfa4.westus2.azurecontainerapps.io/tienda', payload)
      .subscribe(
        response => {
          console.log('Post successful:', response);
          alert("Se creo la tienda");
          // Handle the response here
        },
        error => {
          alert("No se pueden crear mas tiendas");
          // Handle the error here
        }
      );
  }
}





