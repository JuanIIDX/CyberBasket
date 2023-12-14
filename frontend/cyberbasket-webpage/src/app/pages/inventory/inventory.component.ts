import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  inventario_json: any;

  constructor() { }

  ngOnInit(): void {

    this.genera_ventas_recientes("Hoy");
  }


  genera_ventas_recientes(rango: string) {

    this.inventario_json=[
      {
        "id": 1,
        "id_inventario":4,
        "customer": "Juan Pérez",
        "product": "Televisor",
        "price": 1000,
        "status": "Pendiente"
      },
      {
        "id": 2,
        "id_inventario":8,
        "customer": "María García",
        "product": "Lavadora",
        "price": 500,
        "status": "Aprovado"
      },
      {
        "id": 3,
        "id_inventario":9,
        "customer": "Pedro Sánchez",
        "product": "Nevera",
        "price": 2000,
        "status": "Rechazado"
      },
      {
        "id": 3,
        "id_inventario":5,
        "customer": "Pedro Sánchez",
        "product": "Nevera",
        "price": 2000,
        "status": "Desconocido"
      }
    ]


  }

}





