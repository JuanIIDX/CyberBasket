import { Component ,ViewChild } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
};




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  //Variables de venta
  ventas_rango: string = "Cargando...";
  ventas_numero: number = 0;
  ventas_porcentaje: number = 0;
  ventas_info: string = "Sin info";
  
  //Variables de ganancias
  ganancias_rango: string = "Cargando...";
  ganancias_numero: number = 0;
  ganancias_porcentaje: number = 0;
  ganacias_info: string = "Sin info";

  //Variables de clientes
  clientes_rango: string = "Cargando...";
  clientes_numero: number = 0;
  clientes_porcentaje: number = 0;
  clientes_info: string = "Sin info";

  //Variables de reportes
  //----------------AGREGAR JSON
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  datos_reportes:any ;
  reportes_json: any[] = [];

  //Variables de ventas recientes
  ventas_recientes: any;

  //Variables de mejores ventas
  mejores_ven_rango: string = "Cargando...";
  mejores_ven: any;
  



  listaProducto: any[] = [];

  constructor(private tiendaService: TiendaService) { 

  }

  ngOnInit(): void {

    this.actualiza_clientes("Hoy");
    this.actualiza_ganancias("Hoy");
    this.actualiza_num_ven("Hoy");

    this.genera_reportes("Hoy");

    this.genera_ventas_recientes("Hoy");
    this.genera_mejores_ventas("Hoy");

  }




  
  /*----------------------------Parte de ventas--------------------------------------*/
  


  actualiza_num_ven(rango: string) {
    this.obtener_num_ven(rango);
    this.obtener_porcentaje_ven(rango);
  }

  /*Obtiene el numero de ventas segun un rango, recibe un string con el rango de la forma "
  "Hoy", "Semana", "Mes", "Año"*/  
  obtener_num_ven(rango: string) {
    if(rango == "Hoy"){
      this.ventas_rango = "Hoy";
      this.ventas_numero = 10;
    }
    else if(rango == "Semana"){
      this.ventas_rango = "Semana";
      this.ventas_numero = 20;
    }
    else if(rango == "Mes"){
      this.ventas_rango = "Mes";
      this.ventas_numero = 30;
    }
    else if(rango == "Anio"){
      this.ventas_rango = "Año";
      this.ventas_numero = 40;
    }
    else{
      this.ventas_rango = "Error";
      this.ventas_numero = -1;
    }
  }

  obtener_porcentaje_ven(rango: string) {
    if(rango == "Hoy"){
      this.ventas_porcentaje = 10;
    }
    else if(rango == "Semana"){
      this.ventas_porcentaje = -10;
    }
    else if(rango == "Mes"){
      this.ventas_porcentaje = -20;
    }
    else if(rango == "Año"){
      this.ventas_porcentaje = 40;
    }
    else{
      this.ventas_porcentaje = -1;
    }

    if(this.ventas_porcentaje>0){
      this.ventas_info = "incremento";
    }
    else if(this.ventas_porcentaje<0){
      this.ventas_info = "decremento";
    }
    else{
      this.ventas_info = "no hay cambios";
    }


  }


  /*
  ----------------------------Parte de ganancias--------------------------------------
  */
  actualiza_ganancias(rango: string) {
    this.obtener_num_gan(rango);
    this.obtener_porcentaje_gan(rango);
    
  }

  obtener_num_gan(rango: string) {
    if(rango == "Hoy"){
      this.ganancias_rango = "Hoy";
      this.ganancias_numero = 10;
    }
    else if(rango == "Semana"){
      this.ganancias_rango = "Semana";
      this.ganancias_numero = 20;
    }   
    else if(rango == "Mes"){
      this.ganancias_rango = "Mes";
      this.ganancias_numero = 30;
    }
    else if(rango == "Anio"){
      this.ganancias_rango = "Año";
      this.ganancias_numero = 40;
    }
    else{
      this.ganancias_rango = "Error";
      this.ganancias_numero = -1;
    }

  }

  obtener_porcentaje_gan(rango: string) {
    if(rango == "Hoy"){
      this.ganancias_porcentaje = 10;
    }
    else if(rango == "Semana"){
      this.ganancias_porcentaje = -10;
    }
    else if(rango == "Mes"){
      this.ganancias_porcentaje = -20;
    }
    else if(rango == "Año"){
      this.ganancias_porcentaje = 40;
    }
    else{
      this.ganancias_porcentaje = -1;
    }

    if(this.ganancias_porcentaje>0){
      this.ganacias_info = "incremento";
    }
    else if(this.ganancias_porcentaje<0){
      this.ganacias_info = "decremento";
    } 
    else{
      this.ganacias_info = "no hay cambios";
    }



  }

  /*
  ----------------------------Parte de clientes--------------------------------------
  */

  actualiza_clientes(rango: string) {
    this.obtener_num_cli(rango);
    this.obtener_porcentaje_cli(rango);
    
  }

  obtener_num_cli(rango: string) {
    if(rango == "Hoy"){
      this.clientes_rango = "Hoy";
      this.clientes_numero = 10;
    }
    else if(rango == "Semana"){
      this.clientes_rango = "Semana";
      this.clientes_numero = 20;
    }   
    else if(rango == "Mes"){
      this.clientes_rango = "Mes";
      this.clientes_numero = 30;
    }
    else if(rango == "Anio"){
      this.clientes_rango = "Año";
      this.clientes_numero = 40;
    }
    else{
      this.clientes_rango = "Error";
      this.clientes_numero = -1;
    }

  }

  obtener_porcentaje_cli(rango: string) {
    if(rango == "Hoy"){
      this.clientes_porcentaje = 10;
    }
    else if(rango == "Semana"){
      this.clientes_porcentaje = -10;
    }
    else if(rango == "Mes"){
      this.clientes_porcentaje = -20;
    }
    else if(rango == "Año"){
      this.clientes_porcentaje = 40;
    }
    else{
      this.clientes_porcentaje = -1;
    }

    if(this.clientes_porcentaje>0){
      this.clientes_info = "incremento";
    }
    else if(this.clientes_porcentaje<0){
      this.clientes_info = "decremento";
    } 
    else{
      this.clientes_info = "no hay cambios";
    }



  }




  /*
  ----------------------------Parte de reportes--------------------------------------
  */

  genera_reportes(rango: string) {
    this.chartOptions={
      series: [
        {
          name: "Ventas",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        },
        {
          name: "Ganacias",
          type: "line",
          data: [20, 30, 30, 29, 52, 19, 25, 29, 25, 30, 15, 15]
        },
        {
          name: "Clientes",
          type: "line",
          data: [20, 30, 30, 29, 52, 19, 25, 29, 25, 30, 15, 15]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [4, 4,4]
      },
      title: {
        text: "Reporte"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1,1,1]
      },
      labels: [
        "01 July 2020",
        "02 July 2020",
        "03 July 2020",
        "04 July 2020",
        "05 July 2020",
        "06 July 2020",
        "07 July 2020",
        "08 July 2020",
        "09 July 2020",
        "10 July 2020",
        "11 July 2020",
        "12 July 2020"
      ],
      xaxis: {
        type: "category"
      },
      yaxis: [
        {
          title: {
            text: "-"
          }
        },
        {
          opposite: true,
          title: {
            text: "-"
          }
        }
      ]
    };


    



  }



  /*
  ----------------------------Parte de ventas recientes--------------------------------------
  */

  genera_ventas_recientes(rango: string) {

    this.ventas_recientes=[
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

  /*
  ----------------------------Parte de mejores ventas--------------------------------------
  */ 
  genera_mejores_ventas(rango: string) {

    const testimagen="";

    this.mejores_ven=[
      {
        "imagen": testimagen,
        "id_inventario":4,
        "producto": "Nombre1",
        "precio": 1000,
        "vendidos": 34567,
        "total": 1234566
      },
      {
        "imagen": testimagen,
        "id_inventario":4,
        "producto": "Nombre2",
        "precio": 2000,
        "vendidos": 34567,
        "total": 1234566
      },
      {
        "imagen": testimagen,
        "id_inventario":4,
        "producto": "Nombre3",
        "precio": 3000,
        "vendidos": 34567,
        "total": 1234566
      },
      {
        "imagen": testimagen,
        "id_inventario":4,
        "producto": "Nombre4",
        "precio": 4000,
        "vendidos": 34567,
        "total": 1234566
      }
    ]


  }


 







  get_productos() {
    this.tiendaService.test_productos().then((data) => {
      if (data) {
        this.listaProducto = data;
        console.log(this.listaProducto);
      }
    });
  }


}
