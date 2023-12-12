import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listaProducto: any[] = [];

  constructor(private tiendaService:TiendaService) { }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.get_productos();
  }

  get_productos(){
    this.tiendaService.test_productos().then((data) => {
      if (data) {
        this.listaProducto = data;
        console.log(this.listaProducto);
      }
    });
  }


}
