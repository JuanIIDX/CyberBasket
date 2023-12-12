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

    const testimagen= "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBKRXhpZgAASUkqAAgAAAABAGmHBAABAAAAGgAAAAAAAAABAIaSBwAVAAAALAAAAAAAAAAAAAAAAAAAAFZlcnNpb24gMS4wLjAA/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgB5AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9fY0zJJqVk4poHNeXqfW3EFLxS4pDxSAazYpyOc00KT1pVGDVATK+aUtzUWaUnIoTJsPDU4MMdahGaXNMLBIaEPFGc0oU0gFJOKI2waPwpVQk9KLASdRUbR1MiEUpWqsRexGqDFL5dSAUuaLBcj8v0pjRn0qcYzTjiiwrsqBTml21OwFRnJosVcFHFKPcU5AQKeoz1poQzOORUTsSasNGKiEDscKpNTKSirtgNVqXdzRdtZ2EZkv7oR4H3VPJrkNc8f2NirfZIoogOkkp5rgqZhCOi1NqdCdT4UdkFbGcED1PSq095Zw5M11Ep9AcmvGNX+JbXUpQ6iz5/hQ8VUj8QT3ONrsQ3fNc1TMKnRWOuOXS+0z2ePXdOkZ1heSQp1OOBWl29K4TwsDFpxkjw0jfNn1NdvYBzZQtK252QFj7104HETq35mctekqbsh9NJ5qTbmk8vmu8wGNkjikRWJ5qdU5xUqoKdg5rEIQgdKhYc1eKjFVpl5460xJkYNNcmjGDmlJB45qSxmc0DrShaXBoAQZpRR3pwGeKAAUh608LikKmqJGClxinBT6UMOKkCM5oPSlxQRxQURNmm4NPbikU80DE2E01121MKa4z0FAXIg1GSaNhzUqJjrQUMUHFSr0ppIFCvQQ9QkOBxUZyambkUwLjigERbSTUiJjmnYpRQDYZHrRTMGincVibqKQipSoFIQMUh3IOppSKftHalGOhpWKuRdAabnmpH56UzbS2GIeactAU0qjmmJjxzQUpwGDTxzTJbIlXBqTbSHtSq3FAn3FVBTxhaaHoLZ+lAh+c0YNMGKeH9aoQHrUeaeWyeKYOtFxjlHNPpgal3ZoAcRmm4ApwoxSuIQdacOOlG2rNtCD8zEce9cmKxkKMe77Ds2NjjJXLkAVgeKvE9vpNu6xsgZRksTwKteJtUW3gZEOBivDms734jeJ5rYySxaBZylJnU7ftTjqoP8AdHQmvIjOrip6v/gHfh8OvinsSSa74j8a6pJb+G4DNCrYlv5yVgT/AHe7H6VvWXwm0yUC78T6jd6rMOWTzDFEP+Arzj8a9B0XS7TTLGK0s4EhgjUKqIMACp9Rt2uoPLB2g9celepSwtOmtEbSrv4Y6I86vbXw9pi/Z9G0HT4lQY8z7OpP5kZrjWtjcalPOoC5bGFGB+VeypodoB86A/XNZt34a0JGeTaLdm5LK5GTWeLw86sLRNKdaEd2UPBRS4sRbzMyrjkjriu90/YLOJI87EXaM+1cDavpOjzHZqiyL/cI5/Sux8P3tve6Yk9tJvj3EZxjkdazy6jUoyamuhy420nzR2NZfSnYqKNqk3Z6V65wCr1p4pgIzS7qCR9RS8GnF8VG7ZoBIYQDUbLinnihWz1qS0MGRRnHWpSAaaUFOwiMmnx0wqaVcikBYGKDioA5zzTi9O4Ds0hGaZup8fJouAm2kZeKlIpnNMCu680gXnmrBFMxSsO4AYFNPSn9qYelILiYpTwKXFG3NOwXIiuTRsPapelPGMdKQXIAG6UVYKg9qYRxTsFyJT60/A9aQrg8Uj5xxSDcXIoqHJooK5S07Zpq9aUKaeqHrQidhpB9KTafSpgtKVwKdguQbaUKKcetKSAKQXDaMU3ZzQHyamTGKBjAvApSuKeMUpHFUSQjHemtjtSv1poFSUJTSxAzUjLxTGQkcUrAmIr5604tzUlpZmQ5bgVoxRx2/WD8R1rhrY+FPRasqxnLFM33Y2/Kn+RN3jNbMLRONy4IqcIp7CuR5hVeyRLZgLGAcNx+FTJDEe5P41oXFqrAlQM1RZChxjFc1TG13u/uKSiyVYo/7oqQRR+gqGNucZqwFNYOtKW7BqwGBMcAUxoO4NPJZee1J5uetRYVzO1PTLW9t3gvbRJo3Uq3Y4PuOR+BFZGkeGdN0a1S00iPyYE4WNjnb+PU/jmuoJBqGSJXHPX2qqdWdJ3gzWNWS0MSQSRtiRSvpnpUbyn0xitaaNgpDKHT3rKvbOQoXsyCQP8AVn+lerh8wjLSen5FbmNq1xqDoVs1GfU1x+qaXr8xLy75Ae26ukvNdjsCVuFZWHBBXkVQfxvpnRhIf+A13OUX1N6aklsedandva63b6L5bC+uMEDGAq+te4eGofs2iW9uP+WYx0xXC6hqHhjWr20upDHFd2z7opWG0rnqCe4Neg6W8b2aPE6uhA2lTkdK5oc/1hfy2HiXF04pLXqXV6Zp2/FRhsUh5r0bnn2LAYMOtBbtVdGp4ancViWmt9BTS4oBz0ouIeBkZppGDShuOKY75pADHBo3H1pmc0ZoKsPV/WnZU9Kjxmm5waAsTiMUhjGetNElLuzzQKw/yhtoEZHIoDkU5pBiqIEGR1oyPWk3g0xjzQUOYikFIpzUgBxQA3ANMYU45zS4yaAI/wAKN1S7PpSNHxUgQ+9PHSlC4PSnAfhTQDGbAqMufSrBTIpjxjaaGCK5lwaa0mRT3hzTBEQaReg3n3oqULgdBRQFywGFOD8VGEOalEZxQToCuM9KVnzTSm2lQDvVCYbOKYyHFSyNgYFRZyeakEJGmTUwUgUIMVICMcmqBsjHFOxkUEClyAKCSFl5603oalYUwrQUJ1pRwRTWIQZaqZuvn615mY4l0qfLHdm1Gnzu5rQylTxWhGyyJzisSCUNjmrtvKVPWvnoSaeppUpk0sUkT+ZDwe49amguSeG4PpT43VhyaZJCGO4dfWuhLsY36MspIGqG6jDAkU2LcpwamPK05K61I2ZkSEo9XLeYMPeo72MHnFZYuWt5drHiua7izZLnRvghqhnj/iU1Vtr5G71aEysODVc5Dg0yv5hQ804SqaWdA4rMuHa3bJ5X19KvdFJXNNmyKrzRKfmU4b1qvBdo44bNTiQEdaybsVZow9f0e01eMpPGq3AHyvjr7GvKPFHh6fTpZCFOFPQ9q9tuU3jI+8OlYHiKzjvbJ2MYaaMfMCPvL6V6GEr2fJPb8jopVWmeDaXcDU9SNhZ5lkU4cgfKte7+DtPTTdBht03ZyWfc2fmPX6VxHwz8LQ2OoajOFBUznbn0616VaD9yCOAea3wdadSvJPZaG+McFaMSUmnjoKTApC2OK9g80Vge1Cg96FYZqZcEVSZLGbacq7RT8UHimTcjYHtTQpNSDrQw9KAuMK4pnepCc03ApNFIUECmtyaKKdgEGKkQU0U5SAaBMcaQjPenHGKaTQSAGO9IeTQTSA80DsOQYNPLYpmaQnigQu4E08EVXbIPFAc07jsTl8GlL571XLGlBOaLhykuaCTTQeKQnmi4iUNxSE5pqnig9KYAelKoBppozigB+1faimbxRRcksqB6VJxjtUDPtNKsgJoG0K3LYxTsYHSnLih+elArkQXLUuwZ6U/AA5owPSgdxCvy1ExIqU7unao2Bz60CEG7Hek3EHmpFxTJMZpORQhk6VIrAjgZPtRbQiU5J+UfrWjDHEowqCvPxOOVJuMVdlcq6mRdwSyRfKCKzjayISWzXWtGhGMVVntVYHArxak5VHeR0U6ijoc9EXRs1etpSetSzWu0/dqLySnIFZ8iZo5Jl+GT3q3HIGrHjkKnBq5DJ0OaNYmMoXNDI74p3GOKqq+e9PEmO9XzGPKwmXIOaxNVt9yHH4Vts27rVO6TK1lJXLg7M5BryS3k5JGDg1rWGpLIBhqzPENoeZUH1rnbe/e2uPLLcg1g4tao7YpTR6THc7h1ouAskZBAPHSuY0/VAwHzc1sQXe4cmrjIwnTszI1DztPnypPlMfy9qt2epK4ALc/WrOoRRXdu8b4+YdfQ+tcI91PZXj28p5jbHX9atq5pD3lY9AWcMOuaq3bbW81e3X6VhWGplgMmtNrgPH65FELkuNmS2ttFFbTy2icufnUdm9var20RxKg/hGKyNDu9t4Yicq/B+oredA3Ir0sBUhTqS5vtE1uZ7lVWJp2M1J5fpTSjV7phcQLk1KgwKYAR3zT1NCJZIrcc0p5pFGRS7femSNIOacOnNOAoYU7AROB260zB9Km2ZpwQYpBcqYIIGDTiGxwKnKgHNIdvrQ0VzFbDilXPepcCmOR0pWGmIHPrTgcnrUORTlbmi4NExHHNMPBpd+RUecmm2CQ7JoJwKMHGaDigBu4GlGKMCnBcCgBMfSjHtS4NLQGwnPvTDn3qYUMvtQTciB4pBuzUojPpTjHigLoizSOTinsuBUZzQJDMn1op22igrQv+UCOTzR5OOlOdsU0P71RnqPC4HWlyKiZ8DNICdhkkdIox1eQ4FRUqxpq8nYai2SNnmiOKZj8q1i6l4r0mwBWAm7kH8XRa4nxF8TAhKSXsNupP3ENeVVzDpSVzspYGpU6WPVH8mEZnuY09s1A19pY480ufavFovE1/fsHtNP1K7z0ZITg/icVo2d94nJ3Hw1fhfVpEB/nXm1auLnqkzuhl8I/FL8j1pbuxP3UB/GpFe1kPCCvPtP1qaFc32nXtsR1LIGH6V0ui6ja30Za2nSXHXb2rzp4jExqKMrpv1QVMHGEXJam9DhU+UYGaniao4l+Qe1SIuDXfFtq7PMlYsqc07HtTI6lxUp3IuQyxKRVWW34yBV1jmmnkYNHMNNowL7923Si2nBPWrmqwgqcCuanuTaS8/dNJys7M6oLmjodPFJkcVIWrK0+8SRQQa0C/y5FSmZyhYk3+9NdtwqDzB60eYKd7kuJTv4RJGy46ivMPFStZ6mV6BuRXq0xBU1xXj7TDd2YljXMkTbvqKm3Q3ov3tTmbDVDGwBauj07WFYD5v1rh3s5kHKsCPanQvNCRkkYqlBrc6JRTPS49SUgHNc340MR8q+XAIOxz7dv61k2+oSAAEmr1hIuoXkNjNzHO4jP41caTbsjFJQd2VtPu8YIfI9q3LbUEEYDyBc9Mmprb4XLDqdtPq3iCHRLG6nWCCJiPNuZCeFUHgE1614c8H+HNAxJY6cr3AGDcXP7yX8z0/CvSoZXVnrLRHHiszo0/gfM/66nlOmQX8lyJrezupEDA7lhYj88V2YSRFBljdM/3lIrv3c+p/CoJdrLtdQ6nqGGQa7JZVFrSWvoea81besfxOIOM+1IxFa+taWIVNzaL8g5eP0HqKxc56VFGpUoT9lV+TO2E41o88AYDFIgzTyDQi4FehYd9BwOBSg5pAuaU8dqoQ6kPFIGyaGPFSAFwKY0lMbJNNNDkNIGkOKZ5mTigjIqJuDU3NEiVnNMLE0hbikOTSHYcRmlRaQU/OKBCEEUA4OTS5z2pCO9ADg4IwKazU04UbiQAOpJqn9onupDHp0YZQcGd+EH09apXJbS3L8eT0BqTnOMVnyadAsRbVdSmlXv+88qP8gRmqsa+CUkCpNpyyZwMXXzZ/wC+qZPN5G2BzjmnhAaILaIRL9nlbZjjLbxj6075lOGGCKdiea45U5p5UVGHxR5hpiaZKFUCopTTTIaa/rQwSGP0qIkg9KlJ4pAoNSWh0f3BRSggDFFOwiZuaYykKXLqiL1djgClk3YOzG7HGRxmuQ8UQateWrS3EmxVJCqGwCfpXFjcTKivdW5rSpqbs3Yva14v03T8x2m28mH/AC0Yfu1PsO9eZ+LviAxkxdXck8znEUEYySfQKK5TxxfahZJOvzKycVP8LdDtbeP+2NVkWW8m+bc5yUX0HpXl0aU8U+ao9D2KdKnSV0rs2tE8O+J/FREl/O2k2rf8sYTulI/2m6D8K9J8LfD3w9o6CSOwiknPWaYeZIffc2SPwqhaeJbW3UR28bNj+6K6DSdTvr3BS0cJ6nivWo0adNWijOtOrJb2Rtx2tvEMIi/lTZQmDhQPwqI3AX5XIz7Go5pwR1rWTOWMZXK18UCHKg/hVPwfZRQ3OoXkaBRNIqDAxyo5P6iodXugo27hWr4ZXy/D9qx6yr5x+rHP+FeLmDWiOyTcKL8zpLcfLU4UelQQfdFWl6Vw3sjyGx0a806U4jJoSob6TahGeaIvS5O7sRxSbiwz0p24+lZ1rN/pGM9auk1CdzWUbMjvBla5DxBFkN2zXXXHKcVy2vNgGlVN8O9TnvD+rNFfG0mbkHj6V3NrOskYwc5rxLxJeyWXiGKaLOCMsBXoXhzWUnt42L9RQt0zpq07q5sanfCzvVSQkROuVb39KnhvFkHBBqnrsMepaU8f8Q+ZT3FebWHie40rUjpl+TwcKx70nGXNoTCEZx8z1ky5FUdRxJCy+1ZVlrUMqA7xyPWppr1Hj+VhVRuZypNM2LHRrHU9OjuBCgJGHG0cMOtZWqeDIWBaJdp+lWfAmswwas+nXLhI7o/uyTwHHT8+n5V3U8G4BVUkngCvoqEYVqSbWp5NWpUo1Gkzw+58NaqL9LSztZLmSQ4VU/mT2FdF4jsNG+Ffh+DxN4jibVtWdwunWKZWHzwCcs3oOuT+AJr2bRdHt7CMzuitM/3m/oK5P48eGH8X/DbVLGCPffWyfa7IDqZY+do+oyPxrtwuAp05c7Rx4rMZ1FyLRHyB438W6/4w11tY1vUJZboH/R1RiqWozkCJf4cHuOSRk19h/CLxcfGngDTtblZfteDBeAdp0wG/Phvxr4bDlgCQQSOQex9K9r/ZI8Ty2Hi++8MTy/6HqsJngUnhbiMc4/3kP/jgr0Tzpan1IxqNqdmmPUslDWPBGMj09a4vW4v7P1JoxxE/zx+mPT8DXZmud8d2pl0gXSD57dsn3U8H9cV52YUOek2t1r/md+X1eSqovZ6GbFIHAxzTyTWBpd9hgrHpW8jLKgdTmuTBYn2keWW6Paqw5WOQ05uaQDFDc9K7jIYeBxSZPepMU1koAjJ5pp57VKE4pAuDSsVcrndnpTHUnmrZUCkIHpRYpSKRBFPQcc1Y2KecYppFKw+YYAKOKDRtpALUcrqiM7kKqjJJqQKegrNbGpXy24Ym1jPzY/jYe/pVJXIlKw1UfVGZ5CYrFT0JwX9yfSuW8XeO4rVGt9InhtrSMFPtRXJYjtEp6/7xrJ+K/jq3gEujWDZt4T5dyyH/AFrD/lmv+yP4j36V4/dXl1q1350+TniOJQcAdgBUSnbRCjFvVnQat4mvdVcqJJ3XvJcOZHb354H4Cs6NIgPmUOc9TXongL4QarqttHf69K2kWjDMcIXNw49SDwg+vNd5N8IPBptTDGNSSXHE32kls/Q8fpSVNvUzlXhF2TPJfBvi7UfDt6strK0lueJbZ2JRh7DsfcV75Y6la6xosOq6dKJISu9h3H95COxFeB/EDwbqPg+/VZm+0WMxP2e6QYDf7LDs3t+VdP8AAXXjBrEuhTsPJvAWTPaQD+o4qovldmO6kro9bU5AIOQRkH2ozTLYGPzIGz+6faD6qeR+hx+FPqyk7ocDxTW6U4UbaoCMAmnBCPWpY1qUgYpWFcpk80VMyAnNFIdwlOKy9TtrZmN1PbzTdiqN+uK1FAbrSlByMZHcVlWpKrDlZUZcrPJfiL4cN9YSXQtXiJBUqRyV/wDrV45Deap4dvRb3StPbbsK4647V9R6hA8k/kXEjSKRmJm7j0rzPxp4Xgt9Qt2lUfZZrhFUkfdYn7ufrXhwlOhV5D18PVUlZnReBtIjnto7mdMk4I3Cun13XLfRrZYEKmdx8qDsPU1k6nrFr4a0hFwrXLr+6iB6e59q5Lw3Fca/qr3d1IxjVtzsf4j6CvavZWW4P33d7I7XQzc3im8uWO08qKWbUFe6EEXJzz7Uut3sWnaSzrhQF2qKyPCCNPHNfy/xZCk1EtHYcUmnIg8SXRSOXB5Cn+Vd7aJ5Gl28X/POGNfyUV5hrDtdakltHyZpljH4sBXql1xFMB2OPyArw8bK9RIrE6QijStm+RTVpXBrNsZN1up9qnWXBxXKzynE0FbArN1GbrzVgS5XisjU5cE+lDegoR1Kv2oJeJz3rcRwwzmuC1XUFt5PMJAwa6HSdViuII2DA5HrUQ0OqpTbimbknKEVyfiJgua6QzAoT2rjPFVyBnHrWzjexnRVmeea3byXWryMgyoAUVs+H9OuUUBCVrR0bTxcTb2XO45rvNK0VBEp2V6eHwcZR1HiMY4OyOVW7urPCXCsoPc9DXLa/plhqmorJPHu5wpBwQfXNevXGnRbDHJErp3DDIrl9T8JRzEvYXHlnqI5On4GieBcXeJFLGRe+hx9jpM9r+6SVyoPAft+NbMWl6o8eYYvN46Kwz+VdZZaPK9jD9ujRLlVw4Rsg46HNWYbM2/3egrVYGLIlj3seeXGk6yZQRYXqyKcgiFv8K9p+Gk9/qemiXVbKa2ubfCM0qFfMGPvDNZtjezI6oSeSAK7u3XybNV/ibljmvQwWFUJXTPLx+Kco2tqOmfJz27Cq7Eghh1ByPrT2bNRt1r1Txj4q/aB8JN4S+Jl5DDGV0/Uwb6yOMLhm+dB/ut+hFch4T1h/D3irSdcjODYXkc7Ef3Qw3D/AL5Jr68/aC8DyeN/BDpp8Qk1nTWNzYjoZDj54s/7Q/UCvi75JUIYEI4wQwwRnggjsaouLufoeskciLLEwaORQ6EHgqRkUjGuO+CWqPq/wm8NXkrFpRYrDIT1LRkof5V2JqGA01R1xBJpN3GehiJ/LmrxrO8RTCDRL2VsYWIgfU8D+dY1rezlfszSjf2kbd0eSalI1nPuzgZrY8PaypdVdsq3B9qyvEUfn2XmDqB2rmdNvzbzYLYGa+PpTcJKSPsHDnieybc4IPB6Gk21k+ENUW+smgdh5kWNvup/wrc219NSmqkFJHmyTi7EDAilxxUuABTCpJ4qxXI8UYp5WmHIOKChrrkVXmkhgXdNNHEPV2A/nVO+1Cea4aw0oK8yj97M33Iv8TVdxo2hQ/btavRLOeRJP8zfREH+FSLm7F9byNxmOO5kU9GWB8H8cU8SA43JImem9CtcNq/xg0W2nMdrpl/dMO7ERj8uTUmlfFjQ7t1F9YXVkCcb/wDWKPr3qeePcr3t7HbHFBzU8Elrf2cd1aSxyRyDdHLGcqwqPGOKdgUrlPUZ2gtGZMmR/kQDrk1ynxK1s+E/BghtJFjv73MUTjqvGXf8AfzNdVGgutUJ/wCWVsP/AB8/4V4H8atWl1LX7i4ZyYImFpbIemBy7fif5ClLSIl70zg7mY3Fxu3N5acLk5496+ivgV8PrbStNtvE+r25fUp03WkUg4t4z0fH989fYV5d8DvCi+I/F8P2mISWVmBc3W4cEA/Kp/3iPyBr6mkbLHp+HYelKlDqzLFVfsIHY55/nUTGhjTCa2ZxJGf4n0iDX9AvNHuEVluIyELfwOOVYehB/Svmzw5NPoXi61mdds9ldASKexVsMK+os4r53+Jdott8V9SjXpLcJLx/tgE1nNdTpoO2h71OFF+23o8YYfmaNvFNnGLqPH8MQFLuq2bw2F6Uq8mlHSlRBkUFEkeOKc2BSAYpknHSgncG60VCx560UXKFGV4px6UgGak4C81I2V7iBbmPY5wQco3dT61l31ut9azafdRxidQCA4ypIOVb8wDW4vtUF/aJdIOdkq/cf0/+tXJi8L7Vc0d0XTqOLPnb4pf8JH4evDqGs2Ut1bzPg3MJzGuegP8Ad9q9J8ICNdLg8lNitGrgeuRnNdjJHDcQS6dqdukiSKUdHGVdSMH6iuYXQ28Mnybe4M2kls2of71sO8Zb+Je6k8jpXFQxbU/Z1NJHpqqpxsjn/iBqPmXkVijcIAWHua6TTQLPQo0HG2LJ+pFeYQ6lb6r41+zCdHkDmRkB5AFei6tc+Xo80nYrgV2Rd25Gso8sYxMXw2ReeM9MQ8g3Af8AIE16uw3rNnnLGvLPhZF9p8cRyfw28DP+JIUfzNeqwDPmg/3jXz2JlesyMU9UvIj05sW+3+6cVK74fGapwv5V1LET1+YVFfXIijDE45ppXRyW1NeKTisnXH2xls0+zu1lTIIJqtrZ3WjY7CsU+jGoWkec+M73ZbSkHoKg8Date+WIHBbHQg81T8aZZQn99wK2/hxp++cOR3rrw9BVJWZ1VJqnRudfZ6vuiKueRXMa/dmW4CburYr0t/BsmsQ+bar9nlx/ryPlP1Hep7P4W2VpYXUzznUNZaFxbSzriGGQqdpCDrg45NejTyurKVunc8meZUKav17HG6JJZ2Fqt5qN3a2NsP8AltcyrGh+hJ5/CrFn8Xfh8dbtdHh1t5nnnWDz4rdjCjE4GXOOM/zr5V8QXWs3OozLr1zcz30MjRTee2SrKcEY7DIrMPI25K+47Hsa92jg1TjZs8evjHVldI/Rg6BZtxNNMxHXaQKb/wAIzpOc+XOT/wBda4v9nfxu3jX4dW09zJu1LTyLO9JPLMo+V/8AgS8/UV6Tmt/Yw7HE61RdTMPh/StuFWdf+2lVLvw3GVJtrk59JB/Wt6jPFDowfQFXqLqcNcWM1jf263EZAMgwRyD+NdpvDRqfakuoY7iIxSjcp9ex9apW7tG5t3OSv3c9xWdOn7OTKq1vapX6Fo01qM0hrYxI2PP0PFfKf7Tvw5fQdZfxho8H/Eov5P8ATEQf8e1w38Xsj/o2fUV9WsRVHVrKz1PT7jTr+3iubO5jaKaGQfK6HqDQNaHmH7LE5m+ENvGST9nv7mL8Nwb+tepsa5f4a+DrPwJoNzomn3c1zZvfS3MHnffjR8YQnvjHXvXSsaQ+opPNcL8VdZFvbW2kxsPMuH8yX2Reg/E/yra8Z+J9P8MaQ9/esWJbZFEv3pHPQew968Jutbu9X1WbUr6QNNM2446KOyj2A4rxM3xqpU/Zx+KX4I9vK8DKrP2kl7q/F/8AAOyikE1qUPQiuAuz5VzIo/hcj9a6fT7v5AQRxWDqcSNfzkkjc278+a+bdTkimz6SjTvJo2fA2sGy1m3Lt8jNsb6NxXsGCOM9K8x8MeCbPUbaz1S31iURCQGaExDcGU5Kg/lXp5OSTX0mXxnGn72z2PKxnK5+6MZc0cAdKMkUoIIxXccwwnNYutXcss/9mWLbZWGZpf8Anmv+NXNbvPsNruRd88p8uFO5Y/4Vw3jrxBF4S0YWiz7tVuwzySDkp6t+HYUpNJXBauyDxR4qtfDsMml6U6RyQjNzcvz5ZPbH8Tn07V5Brvia81i6fyHnWNj80kjFpJPcnsPasG/v5tWvCdzeWG4BOc+pJ7mvQ/hX8PrjxQftk7SWukRtgygfNOR1VPYetY3c9i5KNNXZyFjayPJ5VujSSt/CoLMfwHNW72x1KwCi8tLi2D9PNiZA3519Q6Louk6HbLb6VZQ2qgclVyze5bqTUmq2VnqNo9pf20dzBJwySDI/+sfer9loc31nXY8K+D3iptJ19NFvHIsb99i5PEcp+6R9en417VdYiWSUjG0FiPpXz98VPC8nhfXzFbM32SX9/ZSHquDnH1U17Z4P1FfEng7TdSmJLXVuBNtP8YOG/UfrThpobXuuZFbV74aH4NvdUcbpFiabGM7mb7o/UV8zeMLqW81pIGJYwqA5J6yNyx/XFe7fHO9NroFhp0Tbft16seP9hBk/zFfPMZkutWldQd7zHbznknipm+hdNW1Ppb9nvSV03wE16UxNqE5csepRflUfTgn8a9DNUtBsF0nQ7HTI+BawJF9SBg/rmrjGtVojz5u8mxrdaYaVjTc0EhyeK8J8S41X46vFCA4+3xQ+x2BQa9xuLhLaCS5kI2Qo0jZ9FBJ/lXh/wehn1r4jz63IoKW/m3cp9GfIUfmRUy6I6KK3Z7RdNm8kI7cVGWxzSrgb2bksxOf0qK4ngt+Z5Y4h/ttihs6obE4k4qSNqz47+xkP7u6Vvop/wq3DNHIuUYOPY0A7FktgZqJpM00ZJp6pg0BaxE3WipCi5ooHzICfSk571YEajtTXwKBJjVbA5pGkGOKZIwHQ0zOaLlWEniS4Ta+ePusOq/Ss+4UpGba9jWWCQY5+63+BrWiXA5psypIChUMDwQe9ceKwcKq8+5cKjizl9U8GeGdWiTNilrcR8xXNviOaI9irD+RyDXL+LIr6zsE06ZWmuN+NyJxIP71egzafNH89qd4H/LNjyPoaqPP+8VLiPDL0DryPpXhTWJw90lp+B6dCupNczuvxMP4NaPd2v2zUr23eF5iqRqw5CLnn8Sa7qIYllB/vGpNJObNT0PpTRxcP9a44uUrSluzHEVfaTbMvWUaIi4j+8v8ALvWPqc4vLBjEecZrqruESxkdRXIX9jPbTM0IOw9RXQiabTMXR9baG4a3lbDpwRXRy38c1sRkciuJ1nQ72e8S7sRiYHlfUelXY2nhjCSq0cgHzI3BFJx1udDSexh+KV8yZQAWIkAAAyTngV7b8J/AcmmafHf63HidwGS1J4Uer+/tUHwp8FxmePxPq0GZD81jFIPu/wDTQj19PSvUCefrX02WYHkj7SfXY+dzTMub9zT2W7Bj8oRQAo6AcAVG3Q46089abXtHgnyL+1r4Ik0TxeniuyjH9n6wds4A/wBVcgc/99KM/UGvDmHOO1foT8QvCun+M/Cl74e1L5YrlP3cgHMUg+449wa+C/FGhaj4b8QXmhavEIr20kKSADhvR19VPUVSLiz0D9lrxU/hz4owWEs2yw1qM2kyE/L5nWJvrnK/8Cr7UBr824J57SeK6tXKT28iyxN6MpyD+dfoZ4O1uDxH4V0rXrYgxahaRzgD+EsuSPwORSYSRs5pCaTNITSIAnmud8Wagum3NnctwrsUY9uPWugJrifiNKJZba3Xkopc/jWVZ2jc3oR5ppM6ayvIbq3WWJ1ZSOxqbePUV5XYS3VpJm3mkiz2B4/KtmPW9VC8zK31UVnGuuqNp4Vp+6zuWYVA7qOrCuNk1zUyP9bGPogrkNb8S60/jrRtIj1OZYZbW6uLqJCAGVfLVCe/VjT9vElYWR6td31tbqTNKqexPNYOo+IlwVs0z/tMK5skk7mJZvU8mkOTWE68nsdNPCxT11ON+N13L/wisMzsZJHv4+p7YOa890298xQyk+49K6/443A+x6RZA8tNJM30C4H6mvO7XMb74+PUV83j7Squ59fl8LYdfM7vTLs4GWrptN8NJrlibq2vBBdg4dZBlGXseOQa4LTZt6DHDelekeCrv7Jd21u5wJYwrfU5xWNCFOclGorpkVXOGsXqb/gLRr/Rbe9hvniZZZQ8QjbIxtAJ9q6Qkg1GgIUZz+Na+kaQ9yBJPlY+y92r6WlTjTgoR2R41erduUjMJJPAJ+lLtfuGH1FdrBYQQptjiCj6Vm+LJ003QLy8wMpGQmR/EeB/OtGjjWJTdkjzmW5jl1K71e4fFlpyMqE9C3Un8q+bPHuuz65rc95IWHntlV/uoPuj8q9x+KTz6D4Dt7GYiJ7xcuO5Ujc5/kK+cXlFxfPO/Azk/SsKh3UHdXOy+Evg+fxZri2QDx2kQEl5N/cTPCj3PSvqq2gt7O0itLSFYbeBBHFGgwFUVyPwa8ON4c8DWyXEey+vsXNyO6kj5VP0HFde7VtThyo4MRU55eQjNUbnNDtUZJqmZJHn3x8sBc+DY74D57O5Unj+FuD/AEqH9nmV5fAMsL8C2v5UQ+xANb3xXG74c6yODiFT/wCPrWF+zzGV8DXTkcSajIR/3yKi3vHXSfuNHNftL+ZC/h24RiEWWcFffC8/lXkfghUPifTPMG5TeRBh6/OK9w/aUshP4WsbwD5re7GD6Bhg14NpMjWt/FMpwYZVkB+hzUS3N4vQ+15DukY+pNRmq+nX0Opadb6hbsGiuYllUj0Iz/n6VMzVtc8+1hGNMJoY1V1C9t9PsJ767lWK3gQvK7dAKQ0cT8cPEX9keFDp9vJtutRPlkg8rCOXP44C/iab8JtGbw14Ie/1FPJudQYSspB3Kn8Ax75zj3Fcj4at7n4mfEeTWL+Iro9gwJj7YB/dxe5J+Zq9q1K5tbGzlubuSKKGFd8kkhwsYHc1K1dzrjHlVjNhgv73JldrC27YAMz/ANFqG4v/AAzoUhE09stx38xvMl/H0/SvNvGXxThnkljsJJbe0X5UfGJpvcD+BemK80udbur6SQx5t4pDlsN87/7zdTUOaWxooN7n0JL8UfCVtP5D6s6tnB2xMQPyrT0bxJ4Z8R3Hk6ffwz3O3cAFKOR3PPX6V8ywSxRrjI3Dr6/U1dsr+W2uY7m0nMc0LB0eNuVI6GpVSQ3GJ9RPC0XzZ3qf4sYpN9YPw58WQ+KNJPmlUv7fC3UQ4Bz0dR6H9D9a3mTDMp7Gtk7olPoxc55xRTcUUyrDml5qKR885qR1FRuR0qWNEXLHpUqrSxjFTrikkNsavSjaBQzgcCnJ60yRuccetQX0aS2ziVA+FO3Pb6VZkxxUU3MTfTFY1kuV3HHR6D9FVltlVj2p0oAumHrzU9mu1AKivRiZD6ivlJLU6b3bH4yMVBNbLJ1AqdDlakXpVpk3sZ8WnxochADU9h4attX1aL7TGGgiPmScdQOg/E1a6LXQeElH2aeQd32/gK78BSVavGEtt/uOfF1506TaepuKFVQqqFUDAA6AelFJSivsT5cKDRQelADWAI5ryT9of4WR+OdHGq6TGqeIrGIrDzgXUY58pj69dp9a9cprDNAH5vXEE1vdTW1xBJBNC5SSKRcMjA8qR619h/smX7Xnwcs7djk2N1Pb/QBtw/RqX42/BjTvG5k1jSHj07xCFx5hGIbkDosg9ewYfjUX7Lfh/XfDPhXWdK8QadNYXMeqEqj8q6lB8ykcEZ707lN3R6/mg0VHNIqIXZgqqMknoKRJFe3CW0DzythEGSa89v5nvryS4kzlzwPQdq0df1X+0phDCW+zRnuPvH1rE1y/tdF0O81W7kVILSFpnJPoM4+pPFclSfO7I78PT5VdmJ4e8UeH9e1C90/Tb5Hu7GZoZ4GG1wVOCQD1X3FbpUDoa+TFhFwq38plhvJJXuPOicpIjOxbgjnvW3H4y8bWsQhj8W3rIBgGWKORsf7xGa53Uhex7P8AZtaykle/9dT6H13VLDR9Plv9Suo7W2jGXlkOAPb3PtXM+DLSfUtVvvGF9bywSX0a29lDIu1orVCSpI7M7Et9NtfP2rXWsahcpqV5rF9f6hbMJbd7iUsqMpyML0A4r6f8L6pHrfhyw1eMBVu4ElKjsxHI/A5H4VSaa0OevhqmHaVTqXCuKQ9KkPSqeqXqafp89654iTcPc9h+dZTdldkwXM7I4H4kLHqepSwnn7MoRG9G7/zrgDBLbTeXMhVuCMjqOxrs4UaaGZ5Dl3O5j6k16B4k8HW2veHLCNCsGoWtoiwS9AflHyN7E/ka8X2Eq/NJbn0dOuqEYwex5LpRwyn3rrra5Md5E4blVBH51zRtLjT7t7W8gaC4iOGRhz/9ce9akq3MUqTSQSJG6Ao5U4YexrCEZJ7Fzakz3fw+F1D7PLwUdBIa7a2UKAAOMVwfwzEiaDa+cpV/LHB6gdq7mNwBX0dJ8yTZ8rjNJuJbLDBrlfHjC6fStJ5Iu7tS4HdE5P8ASugeWuWvpftHxCsEY/Lb2jyfQscf0raTOWEdbniv7Ul/5mrywo/yWkUcCj0LZY15V8K9GTXfG+lWEyFopJw8oHdE+Y/yH511Px/1A3euammQQ2puDj/ZAFW/2ZLLzfGt1dkcWtgxH1ZgK52rzPVg/Z0dD6JkaoWOacxyKjauhs89IRulMY0p60xutSUjjvjTd/Zfh1fLkAzvFEPxbP8ASpPgnZG0+GmnOww1y8s5+hbA/lXKftCaiXi0rQYctNNJ5xUdyTsQfnk16noViNM0Sx00AAWtukX4gc/rmktWdFNWgZvjjRI9e8NXWnOOXXKH/aHSvlS7sprO7nhkQiSFyki9wRX2QwGCD0PWvIfi/wDDm8vrt/EfhuNXvNu26tScCZR3Hv8AzpTRtBlf4HeObS3s18NapIIgHzaTOeBnrGfTnkH3Ir2NyABnjI496+M7pprW5eK7gltZEOGjlUqVPpzW5p3jHxDb2621nrN/HFnhY524PtipUyJ0Lu6Pp3XNY03RbU3WqXkVrEM43n5m9lXqT7V4z4h8Qa78Tddj8OaFbSQWAcOyt/CgP+umPQY7L61meF/A/i7xdci6mjmtbNz+8vbwncR6qp5Y/XAr3nwZ4X0nwnpf2HSYSN5DTzOcyTP/AHmPf6dqrWQlBQ16ieFdAsfCXh2DS7EArECzyt1lkIyzn+ftXz98ZfiE+v6tJpelyhtItJNoOf8Aj5lHVyO6g8Ae2fSvUPj14qk0bw0dOs3xd34MWe6RfxH8a+YFAZwB92s6kuiOmjH7TLkJkuJWlmkZ2bqWOa9i+Gfwkvdahi1XxFJJp2nMA0Nug/fzDrk5+4p9ep9Kg+AHgCPWrk+ItZtxJptrIBBC4+W4lBzk+qocfU/SvopjkknrThDqzCvXs+WJnaL4f0DRbT7Lpmj2NvGRhv3IZn/3mbJNY/irwF4Z8Q2TQPYW+n3Az5V1awqjIfdRww9utdOaaTz1x71pZHHzSve585aHJf8AgH4grb6j8gikEVwVORJEx+8PUYwR9PavfLmQCeDkMJVJBHQ4wf5V5p+0bpcTW2l61GoWfc9pKf7y43Jn6Yb867jTZjeeGtAvMfMyRH/vqPB/lUxVm0dkZ8yTNJutFRhWxRTNrE0q56VWkBB5FW42BpHVWNDQJ2KqMe9SeZ9aSVcHApqocUtitGPGM5JqZTxx0quRT4s00xNDnORTSDg+lWNnGaY4+Q1nW/hy9GJPUtQcKKj1AfIr+lSx8LTLr5oCPTmvk2jZPUjiPy1KDVWBsrU4NNDaHO2BWz4NuA0dxBn7rBh9K526k2oaTQr97O5W4XJGSHHqK68HiFQxEZPbqY4mg6tCSW56Mppx61UtLmK4hWaBg6MM8dvrVgHIr7VNTV0fLtNOzH0p6UwGnUyQpDQTimk0AI3Wmt1oZsDJwKytQ1eGDKRDzpPQdB+NKTUdyoxcnZFjV9TsNKsZb7UryCztYhmSWaQIqjPcmuR1jWn1chLdttmfmUg/6wdj9KZrVsNbjlg1SKO6t5BtaCRA0ZHoQeDXFQfDq80dmXwn4u1XR7VjkWciLdQJ7IsgJUewOK5p1ObRHZToqGr3Ople3tLZ7i4ljiijXc7uwCqPUk9K8E+LXjpPF840XSi50G2mDzT9BeyLyoXv5YPOTjJq38d9D1zTLfRptZ8U6hrVrdXTQSwyIsECttJT5EAB5H8Wa4B9qrtGABxgdvauarP2ast2e7lWEjVbqT2T2/roMkPr1qBY5JZBHEjSSHoqjJP4V3PhjwHd38K3erM9lbtgpEP9a49T/dH613+naXpulQ+Tp9nFAv8AeAy5+rHk1zRpt6nv1sZCGkdWeKnw7rqxGZtIvBGOp8o/yr274PxPb/DXRVkBBaDeB/ssxK/oRWdrYuNRkTw9YTNHe6ghEki8m2t+jyn0PVVHdj7V3FrbwWltFa20Yit4UWOJB0VFGAPwArojHlR4GPxPt5JNbD2IrhPHmqG6vF0qF/3MLbpsfxSdh+H8zWx418Rw6LbC3ikH2+cfu16+Wv8AfP8ASuEswGBcknuSTkmvOxldX5F8zTBYdpe0l8jV0+PcgXHLOo/WvZVQKipxhVC/lXlHhuIzX9tGozmUE/hzXp6szE5NVgF7rZritWkUfEXh/TNbiRb1GWSM/JNGcOo/u57itOCGJYobSCFWRFCRx7QcAdOtKseRya2PDdnmR5iOdpVTXoRppybS1ZxVavs4XbG6Yot5mTerN/FjoD6VtpNx1rDv5ksIUUpyXAPrkmrKTjb96mmk7HnzTmuZmhLP71yrT/8AFds7HANooB/4Ea1bifg81zd8zDxJDKP44Cv4g5qmxQgfOHxhmeXxZq6sMEajK34ZrtP2YZEXXdajz872cZX6B+f6VzPxvs2h8a3zHGJgk4/Ef4ik+CWrJpHjqzllO2G6U2rkngbiME/iBWCfvXPRmr07I+myaYTTmypIIPFRMa6DzxCajlkSOJ5pW2xxqWZj2AGSf0p/U15b8bPF629qfDWmTBrifC3ZjblQT8sX1Pf2qW7FRjzOyMnwWH8d/GCbXblWex04i4VSOBt+WFP03fhXrGteJ9H0hwt3eIZ2B2wp8zt+ArxPT9eg8K+H30HT7mNLqRzNqV328wjoSOcKMAKP61x+qa1dX8skdvJJFA335ScS3HuT1A9hU3sjr5eiPTvEPxivkleLSNLgDB9oE0m5yPXC5AH1Nc43xP8AHkjFv7RsLfn7q2wbH51xEC4UKoVV/Kus0D4f+K9cjE1jpjJEwyJrlhEhHtnk/lUXbLbjHcvp8T/EUhWPXNK0LXYP4llg8t/zwRXo/wAOvFHgfWpPJttFs9G1Rj/x7TQpmT3Rhw306+1eb6h8KfHNnAZl062vQOSttdKzfkcZrj9QsryynNve289tMhyUkUo6H155B9xTTa3JupbH1yWLck/h6UyRsJnp2ry/4N+P5NX2+HNduS+qxR7ra4c83aDqCf8AnoBj6jJruvFd/wDYPD9/esdogt3kz744P5mtU7rQjladmfOHxu1t9U8RXEqsTEJGgiPYqhwSPxrk/BmjT694lsNItiFlup1iVjnC56k/QZNT+O0MOq22n7gzW1nDvYHq7qJG/wDQ8fhXpP7L2hi48SXmvTIcafBshPbzZAV/RNx/GsGryN3Llp3Pf9LsbXS9NttNsoxHbWsSxRKBxgDr+PX8asMaTNITW55m4U0nigmkoA4D497f+ECUt1F9FjjrkNmtbwlkeB/Danrsg/8AQTXMftE3W3QNJ01DmW4unlCjrhF2/wA3FdhbW5sbHQ9LyN1vCC+P9lAP5mp+0zqpL3EauAeaKi3MOM0U7nQPhiyvJxStGQeDVhQMUECixPMyowAPPWjB9KmdRvpSABRYq5W8ti3FSINp5qSo2BLUWsO9ybPFRSHg0oBzSyDCE1nV1g15MS0ZYQ/LTS25GFNVwsZJ7DNVrWXfCj9iM/nXy9jdLqNhO0lfQ1Iz4qtK2y4bnryKaz5PWoSs7GlriX8vyGoNMkDRn61X1KTCkVBo02Sy0qitK5vFXidDaaheafJ5lq+AfvIwyrfWti28caWMJqCS2jd3C7k/TkVz2dwrC1uH5W44IzXVQzCvQ0i9OzOOpgqNd++te6PW7DWtKvl3WWo2twP9iQEj8OtXPtEX/PRfzr550K+Ol69uBASUgn+Rr2DTbtLiBHUjkZ619JhMw9vDmtqeTi8tVCVk7o6KS9gUcuT9BVSfUm6QxZ92NU8g+lIa6XVkzkVCKI7mW4uD+8kO3+6OBVYwqOgqy1RtWbb6mq02ICmKYw9qlY1A5pXGkcl8VPC6eLvB15pClUuSBLayH/lnMh3Ifpng+xNeKfCrS4LjWrs6yiQ6jpj+WbCYgOsnd9p5ZR2PSvpKXpXO+IvC3h7XXSTV9HtLyRBhJHUh1HoGBBFTJRludmGxNShdR2e5zt1MkKGSeWOJByWkYKMepJrKtbu81qR4fDtutyiHD6hOpW0Q/wCyesxHonHqRXS2vgjwjYuskGhWZdejS7pSP++ycVp3l3b2sJeWWOKJB/E2FH+fSk2kW8TOWiRm+H9EtdFtpVSR7m7uG8y6u5QPMnbtnsqjso4H51leNfFdr4fttiBZ7+QHyoRyAP7ze386p+IfE2oyW8h0ewnMS4Bu5Ewv1VTy316Vxk9neXdy0pt5bmduS2wsze/FcGIrtK0NzswtHmlzVPuOfuLm81C9ku7l3lnlbc7sO/8AQVr2MzBEiznB+Yiobu3uEbbJG8TDqrqVP5GlslKSAHivHlzcx7b5XHQ9L+HVkZbh7tvuQjAP+0a7gcHiue+H0Jj8Po2MmaQsB7dBXWQWM8vSNue5r3cJTapI8TE1YqbbYyLLkKOpOAK6zTIxDboo4wKwv7NuLZROpyynOMZBrdsp0lgDpx6g9RXo0o23PGxlVVLcr0Idd05L+2dQNr9ffPYiuKudUvNLbyb2Bio4EijINd9K/HWsfVI4ZgRIgb3qa1Dm96LsyKGJ5Pdkro5ePxDHPIEWJyfUdKg1Gcny7oKR9nfcfXB4P6VeuLKGI5QgegxUcNsGO5xle4PesVCcfiZ1qcJv3Eef/G/w59s06HXrVDI1uuJgOS0R5z+BrxQJ9mdWRjtzlWB6fjX1jYxqiNYXKCSBsiMsMgqf4DXkfjz4SalBdTXvhZUubSQlmsy2Hj9Queo/WpcLO6OqL0szrfhl8RNO1qwh0zVbuO31SJQu6QgLcAdwex9RXbz3VpDEZZrqCNAMlmkAGK+Ubnw34mtZSkvh/VAy9has38hV/R/B3jLV5AkWj3ltAOWmvB5Maj3Lc/lTU2ZSw6vdM9R8c/FaztYZrLw4RcTn5fthHyL7oOrH68V5PczT6Y73Eksf9rSxmXMr7vsqN1kb1lIPAPTPrWlrtvp3gizLtcpqetyArbNsPlQsOrqD1A9T1PSuHg826laWZnkLNvdnOWkbux/w7UNjpwtsWFHmsGEeyMHKrnJb/aYnqTXWeAvBuseLr8waeqxW8XNxdSA+XEPT3b/ZFXPhd4Du/GOotuZ7bSbZx9puQPvc5Madt2O/b619L6Vp9hpOnRadpltHa2sIwkaDge5Pc+pojG+4qtbk91HM+C/h14b8MhZkthqF/jm6ulDY/wB1fur/ADrrn5bJ5NGeaaTzWqSWxxtuTuxRWB448L6f4r0prS7UR3CDNvcgfNG3pnuvqK3CeaQnIo3Em07o+S9Ut9W8MeINrxiDVNMuBImDkbl5GD3Uj9DXtHxF8RQ6v8FZvEFiu2O/t4ty/wDPMs4DqfTBzVX4/wDhgXOmReKbOI+fa4ivFAzuiP3X/wCAnj6EVwvh+ea8+CPjPRYzuNm6XMS9f3bEFhj6rWaXK7HdGfPG55nrsnn69euHL5mfDHqQCQP0xX0j+zXYiD4fTX3e8vnx9IwEH9a+a2Hm3TuDxIgbOfXn+tfUn7P3l/8ACp9MKEZaa4ZwDnB8w8H0PtUwXvFYh2hY70000GmHNanAKTSZ/H8KQnFY/jDX4PDPh661eYb2iXbBGTjzJT91fz5PsKBpXPOfE7f8JP8AG3T7CNvNtdLKKwHIBQ+Y/wCuB+FemRKbrWryc/dgAt1+ucsf1Fed/BbTZbPS9Q8ZaifNuLotHCCOWO7LN/wJyAP9016dpVtJbaeiS8zNl5T6ueTSida0suw7yvaipcUUzS5G7/LxQpJFP2rszTc8cUAN780pI7UhyT6UAGpKEJpvIOaGyDR2oAVQx6UPkRsD6UkcnJAp7ZZH/wB00paxaDqQ3MmyxlbPRD/Kqelyb9NhOe2Ki1WfGkSEHquKo+GrpZtLwGyVYgj0r5eatJI7YR/dtmhfvtZH98GomlweTSXh32zDuOlZ0U3mRqScnoac46plLVDtSm3dKq6NL+/YZpuoNjPNUNKnAvWGaxq6G1NXTOyRsD2qvqUYlgPHQUqPmIEc8VGbhCpBPtUR1M2mcLqiFLwHoVJxXZ+DNYZEWGVunQ1yXi1lt2M+CUHzHaMnGaTw9q1ndOFt7qNpB1TOHH/ATzXq4GahpcnEU3Uhex7Tb3CyKCDxU26uN0fUyFCO3681vxXyMv3v1r21NNHhzpNM0Waomaq32pD/ABfrUb3SYPzD86fMT7Nk8jVA7VBLdxgZLVkX/iDT7d1ja4QyO21UU5JPpUSqxjuzSFCctka8jgdTVG5ukT+Lk9AOSarxNeXZyIJI4/1P+FaFrYSjmONUJ/iPzN+Zqo3kKUVDcy5lvZlyoEKnozjn8qzG0eJ5fMlD3UoPBk5A+g6Cuzj0pmOZCzH3q5DpqL0X9K1VJPoc7xFtmcM2jT3BAk4T+6B2q1b+H4o8EJhh3xXbfY0XjaKQ2q+lV7FGf1uVrI5O4sI0tmW4s1vYgPuSKCR9Ca5y/wDD2myRfabHw4sc0Thz+8JVlGc8evSvTWtl9Kp3EAhH3fl7Gsp4eMt0b08dOKsmJ4fgtGs4JIY1VCgIAGMe1b8PlIOgrkYLwWshgUkAfdq0mp+pP51vTaSOSblJ3OonkRoyuBg1jOzQSEoSOaq/2lnv+tRvd+YcDkmtNCEmjRN2WHI59qp3cjkZCsfoKrmbYcD5vXBqUS5jDA8Gi5SVjOcM8mWyKmAGBiluMdqYDgVzTbvqerh4rkUkOKqV2sMg9RREZ4eI3Eidg3UfjSKd1OBwKlG7SJHu9sTO6siqMsc9q4Hx74qiS0nlaRktbdNxbPLf/r6CtnxbqGCumw53bd8+P4V6AfUmvA/i1rX2i9GkQPuSFt0pB4aT0/D+f0pSdkZqPNKyOQ1a+udc1iW8umOWb5UHSNR0Qew/nXU/Dvwrd+LPEEOlWo8uIDzLqcjiGMdW+p6D3Nc1p1szBIo0Z5GIVVA5YnoB9TX1h8LvCMPg/wALpath9RucTXsn+2eifRRx9cn2qILmepVaoqcdDoNI02y0fSrfS9Nt1t7S3XbHGO3ufUnuas5pSe1NNbnnJ3ENNY80pNNbrQUgzSUUmakCDUbSLUbC40+ZA8dzE0TKehDDH/1/wr5z+HsE9p42v/DE7FTfW11psuehYAlT9cqPzr6RYkEEdua8D8cx/wDCPfGyHUFAEcl7Bdj6MQG/kaUtrm1B+813PJZbaawu3trhds1tK0EinsVP+Fe+fs06xEdLv/DryKrxP9rgXP3lbh8fQ4Ncv+0D4ROl6w3iGCFvsV64juWUZWKcDCsfQMBj6iuG8Navf+H9YttRspBFdWzbo2IyDxggjupBwazWjOqa542PsAkYphrhfDvxV8JarAhu73+y7kqN8dwp2A99rjII+uKdrPxR8Iach8i/bUpB0S0QkZ/3jgCtW0cKhK9rHX6hd2thZT3t9cR29tAm+SWQ4VB7/wCFeHa7qupfE/xrbaZp++30yBj5Kt/Co+9M/wDtEdPTgVT1bXPFPxN1tNNsbfy7VG3JbRtiOEf35X7n3P4CvWfBvhe18H6QtpZlZ9UuR++uSOp749EH61PxbG8YKGr3NaxsrdJLfT7JBHp2mKFQY++4HGfXHU+5rULkcVDbIlvbrDGSQvJY/wARPJP4miRiKo1iu5JuNFRBziii5ViYj5ajUgHnpUkivj5elRsjbeetA1sPJU9OKAyg4HNRbGx3qWKLbzUg7Eb8npik24HNWvLUrnHNNZBjFOwuZFaMAseKsoF288U3ywDwKcQAMmmD1OS15zFpk8bHBjYr+tZvhGwvrfS01RpA1tdOT5WPmQdA2e4ODWp40s55x9mtgS146qp7KTwT+A5ro47aG2sorKNR5EUQiUewGK8b6l7SrK+y2O1V+Smkupz8snykHvxWLDMI714j/EcitPVUa0uTESSB90+orndYkMUiXC8FTn8K5JwaXK+hrCz2NDU2whJPauPn1tLDWoYX+6w+dv7uema6HUrxDYCUt8pXOc9q8w1Wdrm6lnIP708ey9BXLOHPJHVQtFO57lpVwk1uCGB47VjeILmXT7h2CF0bkAHvXK/DrxEbZk02/kwh4hkY9D/dP9K7bX4lurJiACygkVEoOLIvaVzlNZvYNRsD5bhZCMeW3XmuUnh8sgOgO37rY5H41sou26Ax36U3UYI5ITjCsPWtOVSWprCVnoUbPWtVt5AtvfTKB0UncP1rbtvFevoozdI31jFcq0bJJk8Y71p2EiTjBX8RW1OckrKTFUhF62RtXHjLXlHy3Man/riKyrvxd4kkYAak6j/YQD+lR30A8v5Dk1TK7egBPvSbqX1m/vKhGnb4UbNhLqd9LGrXN3dTSsFVDIxLE9ABXrXgzwMunKt5qSpLesM4xkRew9T71zfwc0i5Fy2u3FrvjWMraFhgFzwXHsBnn3r1ES32NzSqG91yK9fA4RfxJ6voeHj8ZJP2dNpLqTQ2EYxwM1bS2UYwoqpbajscR3kYjJ+7IOVP19K1kIIyCDkZ4r2oqPQ+enKV9SFYB6U/yvap1FPCg1djO5UMXtTGi9qvFPamNHRYVyiYvaori2DxFSOD+laJSmsnHSk0UpHnupWE1pqSmRy+QSGPpUWSK7nVNPivLcxsNr/wtjkGuUlsRDI0cu4OvBFc8o8p20V7VW6ooeYR60ecw5BNXkt4f7hNJ5CK3+rB/ClznSsKymk244PyjvVoXOQBGDgcfWpkjjP/ACyQf8BqTyl6jijnH9UXVkQDMoyME0/yfl60vP8AeoZmxgGobu7nVCPJHlRGybO9Q3V1HaWstxMcJGpY5qyMkfNXN+LJxPeWukxjIb97OP8AZHb8aSWo5Ssjk/FGrtpOh3muXJBupz+7RuvmMPlH/ARzXz8Ga6vZJmYuCxJY9WJ5J/GvQPjlq5n1W30yOXclqpLAHgyt94/gOK4vQrCe7ureytU33FxKsca+rE4H86zm7uwUlyx5n1PV/wBnbwtHqGsy+I72EvBp3y2wI+Vpz3/4COfqa+gCcmsrwjoVr4a8NWWiWgBS2jw74wZJDyzn3J5rTY9ea2irI86rPnlcQmmk0Gmk1RKQtI3WkoqWUB6U0049KaaAE614l+0RCI/E+jXA4Mtocn/dkBH869t5zXjn7SCf6ZoEh6GGZP8Ax5KT2ZpS+NHr93b219ZyQXcMc9vcJiSNxlXU9jXjHjT4JzCZ7zwneIYc7hZXDYKeyP0I9jivYutpaxgnHkp0/wBwUKZ05WTcBxhxn9aJJPc6YOS2Pm5fhj4+Viv9iy4/vb12/nmus8IfBjUZ5RceJ79bO3BB8i3w8rj/AHuij869qjmfrIo/4DTjPzlIgD6sdxH9P0qVFDcpPoU9D0XS9CsBZaTZxWdv95sctIfVj1Y+5qVlAdnx8zDBPt6VMXJYs5yx6k0zIzV3CMerG7scmkLBhSSe1R9DUmg+im596KALwYg8DilLAnkVXMpJwKAxBzTuKxK2S3AqaJc4zVcMT0FPDMFxTJaJJG2nAqJmNBzjmlDhetAJWAKzDI4pjRvnBNTLIDn0pskmKB6kSx4PPbpxUmPlpgYvTi2BgmpAzPEVgbnT2kjXMsWWGOpHcV5/q+HtyRyMV6gXIHBrhvGGlvbeZPAhNs/PA+4fT6Vw4yhf30dNCdtGecXNzdyp/ZUZyryfL6/T6VJe6IIlVcZ2jrWz4e0qVJDq9xCVjkZkt2I4OOp/z71q3EKuh6GvJcGtzv510OEjtBGSSMV0eg+InULYXsox0hkb/wBBY/yNVL+1mmuvs1rE0j4LMFH3VHVj7VVi019/71eajkvqaKzRr3EAXVAQMBjuAqnqgxwKkgkNq6Gcl40GATyyCp9SiWS3WaMh1IyGHQ0px0CD5WcxdcA/nSaQ7LKQQRk12Xw68O22u3l/Nfo/2aBAiEHB8xvT6AH8xV7WPh7c2jmbTSLmPrtHDj8O9dFHCTcOdIiriIqXIcw4Vlz3p3hvS01jxPp2mP8A6u4nCyY/u9W/QVJPayQFo5VZHXgqwII/CvXPhX4Gi0+3j1nVLbOoyjdEr/8ALup6cf3iOv5V0YbDOrUSttuceKxapU276vY7qzsoYLaOKGJI40G1FUYCgcAfyqG/ABCLgZ61feBEX5cr9DWRqDtG6sxBHQHpX0lklY+TbcmVZgpQq3IPrU/h67YO9o7bgnKZ9PSqc8o78AjvVPRZM635gOcgqKi9mVa8WdshzU6VRgfIFXIjWyMWS7T6UhT2qReRSlaYiuyU1lqwV4qNlpNBcrstZ2r2C3Ue5RiVR8p9fatZhULjNRKN9DSE3B3RxYidZCjKVZeop7JzyK6HULNZ8uvyyYxnHWsCTzY5THKuGXrXPKDiezRxCqrzDZx0pjAipQw6U2TNSbplYnHWkVvmwalKDFM8rnNSULuQZZjhVGT9BXBXl+ILDVPEUoznPlf7q8AD6n+VdP4rne10WYR582bEUf1bivN/i5fR6T4etdIjJB2GR/8AdQAf+hMKpaK5hVd2oo8V1y5lvtZkkmbe24ljnqTya9X/AGbvD6X3iO51y5j3xadFiHI485+/4Lu/EivILBC7l3ycnJNfWXwf0H+wPAVjHIu24uwbub1y/IH4LisKcbs0xE+SFjru1MNOY0w10nnJATxTKUmkPSlcoKKTNFIBe1NNLmgigBDXi/7Rbk6roSdcQSkD/gS17OwrxL46sLjxtpFkOqW6D8Xep6G1H4j2WEZW37YiH/oIqUemOKaTtnKf3R/WpgBtzVHRHQVVXFQSffqTdhsYpsg7igpbiMm4cU0QnNPUkU9jxQAzywBzUbRAnNPZ8naaNpxnNSBH5QopSDnvRTsUSAKE6U1mUDmgyqBtqGR1IxSbBIlSUYyCKeku/gCqSAqcdqmCkcrQmNxLLDOATzT/AC1xknNVcMDuJNShjincmw5to6VE5yKeFpGAFDGNiYKOaeWUiopEA5p6eWFzSHoR4JJxTwAByAfqOtDuq9Ki8056UXCwt/a297ZNbTIAhwRtHKEdCK5aLwrfsJQ95aqAf3ZGTuHqfSurWQuNuKl8usqlCFRpyRUajhojH8OaDBo8MhDefczEedKy9R/dH+z/ADrD8TaAsBa6tY/3BPzAf8sz/hXcoOMU112qcDII6djSqYaE4cuwRryjK541cWE17dxWNom+adtijsPc+wHNeojwjZahptvpSRkeREI1mTggd8/U5NS6ZpNlb6g01nZIk8p27x2z1x6D6V3+mWiW0CqoGepOOprPD4RQTUtbk4zGNW5TC8M+DNO0XTUsovMdFJY5P3mPUnH0FbB0mzC48hfr3rUGMU2TGOldqgoqyPHlXnJ3bObvfDumT3MdxNaRytEwZd6gkEdOa2oWQrx170TkYqlJIY33r+PvTjLkZM26q1ZZuX4NYOrkPbOmeo4+talxMGTcDwRWDqDl2EY6scVu3oc8Ituxyt1qD+c0PzB14bNa/hlD5vmmsnW7cDXiF6SqG/TFdNokHlxqAKxjds660VBWOgtScCtCCs+2GAK0YeldMTgZZXpUmOKbH0FS1RBGRTGFTEcU1hQBWcVC4FWXHNQS0rFJld8Z5rL1Oz+0urKQrDjPrWnJUEhqXG+hrTqOEro5uZXhlKOuGFRs5JrX1O3E6bgPnXp7+1Y5BBwRg+lc04uLPZw9ZVY36kqgGlKgHrUQYjmkMmWA71JtZmB4jkF14jsNPXlYVNw/pnoteFfGzVTda5cxK25fMEKYPRUGW/NiPyr2p7iNbnW9Zc8RDykJ9EGT+tfM/im4e81kM+chS7Z9WO7+tKo7RMKPvVLmh8P9IGr+IdN0s5zdXKo2OoUHLH8hX2AQqgKgAVRtUDsBwP0FfPP7OOl/aPG0uoMuU02zJB/6aSHA/TNfQpPapprQnFSvJIQmmsaKRq1OcQ0h6UUhqRhRRRQAoFB6UlBoAa/3TXiPjUf2p8eLWxAyIp7eE/8AARuNe3qN0iL6sBXifgtl1n486hqBG5YpriUHrjaCoqZdDaju2e0ZBkdj60/fharQSZVieckn/P5U9Dk+1UdMVoKzA0+I9jTCnOakGBzipKew8gYpm0mkd6fG4IqidSIp82TTs/LjNOkBIJqEGpKWotFJkUUDIVTd1pyxAHnmmoSO9S7NwznmixTYFR2FOPC0qAgYpxUnrTsTcjD4HIoSQMemKc+3pTBGuc5pD0JCe9Ru+TUiqpGM01owO9Ak0RMSRSKhI61Iy4XpSKcDHagdxuykC45NSZxTS2TQNXEGS2RwKnjkBqAkdqdEADkmgGr7ltSH+tJJwKYsi9BUczHuadzPl1NLQlDXgb+7zXWRHgVxnh+Xbe4J+8OK6yKT5RVQODFp85aLDHWopHGOtMaTjrUEkgxVNnKkJPIB1NZl1N71Ndy+9Yt1Pz1rKTNoRLiTfuHHYHisW/vI4HMksgUdBxkmrImYWibRzJNt/ADmuV1OcXN9K/OxDtQewrVO8UiqcEpuZoCeK+vomiDfIMfMMda6zToyFUYrgvAsj3uo3MjkAKVCqOw5r0m0CoBmrhGzMcTPmZdt4zgcVeiXAqpFKOMVciYntW6RxNk6DFSg1Epp+RirJHE8UxjSE8UUAMeq8wqw3SoJRQBTkBzVeQVck9aqSfeIHJ9qTGmQNgis+9t1kJdeHH61yPxC+LfgfwYxttR1iO7v+1lYkTSg/wC1g7U/4EQfasvwP8VvDvjRvs8dxLpl2c7bW5wnmD/Zk+6x9sg1lO1tTtw1Ore8TsRknHpTJ2WGGSdjgRqXP4DNWFXK9CCKxfGEzW/hrUHBwTFsH1Y4/rXJY9hy0OR8QOYfhucj57+QA+5kbn9K+edQcXGv3siD5POZVHsDgfyr3/4n3AtfDml2/RYv3jD2SM/1NfO2mMSPOkJJPzE/rSrbpGWFWjkfRn7N9iIfCuoX+35ru8Kg/wCygxj8ya9SrmfhVp7aZ8PNFgkAEj2qzPj1f5v610rdKqCsjmqO82xKa3WlJpp6VRAHpSUp6U00mMM0ZpKKQDqTNGeKSgCK8nS1s7i6c4SGJ5GPsFJ/pXkX7P8Aas39t6265ZlWFCfVyWP8v1rtvi1qSab8P9RffiS6C2sXqSxyf/HVP51R+EWmnTvAti0gxLfOblh/s9F/T+dLqjopL3W+52ixKiBQc4GKUKBzmo2kx1pofcfSlc60iyGAHNG5T0qEcinKAO9NMVhxK0xX2sBQ6jrmmhM8mkBJJJ2qIsetBGKQkEYoBIcHXFFRYHpRSuVZEsaFqk2OpB7U9RgcVMrZXkVSIbG4wuaaW3DinuRSfJjnimK5AFG7k05lUUjqWb5KRg2cE1JQuMU0g5zmnqp/CnlVIoAh5OKdx0xzTsKKDtHJNOwDPKJ5o8nvmpDMoAxSLKrUguyIxdzUiqNtPYgimg8U7BdjCnPFNdCTzUh45prE9qQDrbdFKsi/wmuktLoSRgg1zaswHSpbaWSJsqTg9qadjCtS51c6V5uKryzADrWab1sfc/KmefJNkAIv+82Kd7nL7Fofdz+9Y0rvPMsUSlmY4FXZ7e4dsfaLdc9Pnz/KrcOnraW7Op3OfvSHqR6AdhRGnKTFKcaaMzV2FtZCOM5McbAH1Y968/stSjD/AGWaTZdIzLhv48c5H59K7i+YS3oTsvJrjvGGh3azHULBgdpDYx90+taRsaODUFY3/AdkFvrmW3YlJCrGPH3DznH416XZ2igAsa8z+FE9w93cx3QAl2BsgYBwccCvUon+Wt4I8/EP3i1HHGoxgZqUFQOBVZCSalTNapHLclzxijJpAKUCgAFKeKD0rC8ZeLvDnhHTxf8AiPWLXToW/wBX5rfNIf8AYUfM34CgaTeiNtjmqOoXdvZWsl3e3ENtbRjLyzOERR7knFfPXjz9pK9lSS18AeHGkPIGo6nlUHusQwW/Ej6V4B4y1Pxv4wuWn8T+ILm+3MT5LOREvssYwoH4Umzsp4CtPW1j6T+IX7SvgfQmltdBSXxLdr8u63bZbhvQyEc/8BH4185eP/jN8QfG8ksFxqZ03TpDgWGngxpj0ZvvN+JrmP7AZfvOMCtDTdLhhYMQCRUN3O+jl/K9UVNA0He3nTjOecetdTDH9nAEYwB0qS3CqgCgYqVlBpNHrUoRgrHX+DPid4g0Bkglm+32KnBguCTtH+y3Vf5V6Pe+OdH8U+H/ACbHzobjz4jNBIOVXdnIYcEcV4DLHjpXV/DXIXUGPOJIce33z/Ss3BGWLhFU3JbnRfE7UnutHnkY8R28oX/gRArySxiaSNYUHzPhB9TwP513fxElcaFMucArGp/Fif6VzHga1F54m0i1J4lvolP03iuWs/eOWguWB9hWsK2tnb2qDCwwpGB/ugCnsac5+Y1Ga0OFahmkPSikNMAJpuaU0lJjCkJoNJSBC5oY8UlMuJooIJJ522xRIXc+igZNBR5R8aZ31nxPo/hW3OSCDIB/fkYAfko/WvSoFhgn+zQgCKzjW1jwOPlAzXlXw1afxJ8QdU8X3MeIrUNcKno7ZWNPwUN+VetWNv5VqivzIRucn+8eTUrudcI2suxIFVhyKZ5ZLcVYRBQ0ZXkUWNbkG1wMUg3jrU3LVKi+tAXKx3EdKlUHHSrIVQOlJuAPSnYnmK/lk54pBDjOauBge1NYUWBSZTKgHGKKmIGaKLFcwAGnqxzig7cZB5poIByaYtx5R2ORUgjBXDGoTOR90ZqPzHYnJxRcVmTO8acDFQ7wzcGoSjs3ep44io7UtyrJApzTgM8dKbjFKDk8nntSAQwn+9TTGwNSM5Uc0nnHoBmgNRvl57c07ysYpUJIz3p3JFOxIh9KUKKYAATzT1NMBrcduKGwMU9+nSoj9KBoe7rtxTfOIFNwByaZLJDCm+WRUX1NS2krsaRKzEjcDSDeeQeKwr/WmXK2dvuP9+X+g/xrFutZ1o523zR+yKAK4amYUoO2/oaxoyZ22cdad9odYmUSfJjpXm02s62v/MTuD9cf4U3/AISXXFQxtdiRT1DxjmojmlPsypYVyXRndW53MX7sf0qxjPFcJZ+Lr6Bv3tjDMMYyGKn+tatt4009uLi0uoT6jDAfrn9K3jj6UvtGX1epHodXo6RRaspSNVZ1K5A5Pf8ApXZ2/avNNJ1/Sp9TtRBeoXaUAKQQTk9Oa9KtjkCvUw04zj7rueJj4OM1dFyMVOgqpPdWtlZvd3lzDbW0Yy80rhEUe5PFeRePP2ivBuhI9voEUviS9HA8hvLt1P8AtSEcj/dBro2OOFKdR2irntQ54HWuA8f/ABe8CeDGa31HWY7q/HSxssTTfiAcL+NfLnjL4tfEXxsJYLjV20vT5c5tNPzEuPQv95vzH0rldO0m2tvmCKSeTx1PvSuerQymctajPWPF/wAfPHHiWd7fwvaw+G9NPHnPiW6Yeufup+ANefLZfaL5tR1K5uNTv35e5upDI5/E0sWFGBwKniakz1qWFp0V7qCaIFemKz7iDB5Fa3UVBPFmkbxdjFkhHp1qAoVPTitOWMg1WdM0GliCOTBqwk2epqs64pm5hUkNF5yCOtdb8Ohi11Aj/ntF/wCgvXDLcfLya6rwVcFdM1XYT8skBOPQlxQzlxPwMX4jNnSggP8AEjfqaofC1WPjnQAqhj9uj4NJ40uTLbzRE58sR4+mTTvhc/l+ONAb/p/iHHucVw1PiZhD4D62fvTKc/em1oeetgPSkoY00nmmAUhpKCakYUUZpD1oKQtcF8ateGmeGBpsT4u9SOz/AHYR98/jwK7slQCXYIoBJZjgKB1J+leJR7viL8UySS2mW2cHstuh5+hc/wA6TZdNXdzvPhXow0zwbZRvHtmv2+2TeyfwKfw2/ma7Xbt4zUEJ3nzUUKr42gcAKOgA7CrWMjJ/On5HVFdRgGOakxuXnpTCQOlPBDDAoBjQoAprZJqTbgUwDc3FAIVMihWG7FPVT7UwDa2DQA4HmmSPzSuQKhdhmgEh+6imBuKKCrD1jC8nmnHB47UhJHBOKau3k559KBiNhTipMJtBxUEgJPTNSR4VRvqRNEgIxwKafenqQBxUbAk9aoSBVGKUBV6jmhsKOKQKX5NSA2UFuaYoIHNTjb/F2pjDJyBkU7FJjogPWnZHSokyDjpUgBHJoQmLgHtSnaozmo3cUgIb7xpBYcW3dBmkbJHSmYOeOBQSyg9yaUpKKbYhk8oRdoG5/T09zWdPEWPmSnc3v2+laIjCAux+Y1ja1epCjcgV4GKxMqjt0N4LsZupzIhIyK56/wBQjTODk1T1XU5ru6EFqjyyMcKqDJJq/pHg2+vF87UJxACOI15bPueg/WsaOHnVfuo6HJQV5Mx5r0ufSkEpY5FbOpaFDYqfLjbIODvbJqCytl84edF5qH0OK71llXyMHjaa7lOPP8WfwqzDArngVsRWOlXUfmWUzgg4eNyCVNOjsdj/ALsq2TjAPNY1Mvqx6FwxlOWzKVjaiC9guQvzRSK4x7EGu58S+NNWOk3Y8L2MQvRCzQPeDKl8ZxtB/LPtXMW4BCsCCOoNa1m0KRl3wFRdzE9lAyT+QrShVrYa8U7XJrUaddqU1ex8s+P/ABT4p8Wah5Gv61eXkqnc8UjbY4Ofuqg4U59s1R0y0iFtH1JBIGT6HFaXiK7j1PxHf6mUVftFw0jEADPPH6YqrpaFbCHcPmZdx+p5/rX00G2k2VToKLSsaECKq4UYqde1QRnFTKenarOtImQ1KrVApwakVqCJIso/rT+o61VDVIklBDiJNGCDVKWLH41pH5qglQGlYcZGVKmKrSjFac8ZCliMKO9ZN47L3jiA6vIcD8ql6DlJWIJTtGc8V0Pw/n8xNetQfmawEyj3jkU/yJrjry9sYwd01zct6RLtH5n/ABrU+FWsE+PrOyFlHbW98klqxY7nJZDtyfqBS3PNxOIp8rinqaOrOJ4biQPndGPl78c5qx4HmFv4m0e5PHl3sDH2+cVnSRyxXtxbS7jtDRbT2wTUWnSvCqyR/wCsibcv+8DkfyrkrRtMzoT9pTufa0n3iPemMaisLuPUNNtb+Egx3MCTKR6MM1IxqjiQhNNozmjNMYUmaM0hqQA0ZpKpa5qdpo2kXOqXzlbe3Qs2OrHso9yeB9aCkjh/jh4nj0rQ/wCxIX/0q/QmbH/LODPP4sePwPrWr8LPDbeH/CiG4i8u/wBRxNcA9Y0x8ie3Byfc1578P7C58e+PrjXtWh32ds4uLlc5Xd/yyhHqBj8h717pON5Zs5Ynk1K7nVCFlYduVuF/CnB8/KarR5jPNS5zyKaZtYe3tQpOOKQMAOaCdvNFxWHbj3pEbbzTA5Y5FDdKYrEjT84GKidyzZpABmnADNSNJIXORzUeMtipDtPA600/LzQFhwTAopnmmigNRG3Sc5xikRcNz1p7ZGSOlRCTDUFJlqMcZAyaV42Iyfypscm0cc05Hy3zZoIdxIwcYIpMHPHSrAIcHAxUTqAflPNUJMay8jJpN+GwOtK6NjqKiRG3EmpK9SRwW4pmGU1KHULg8GmNtbvQCYws2d4o81nHTHrT0VQpBNJsHVKAuhoUEcZzR5eOp5oLFWz0qQnI6GgYxRzhmqWNM5cjjtURUtIOwqedgkJ+ledjqm0CTM1e6EMZ5Fec6/e3V/epY2UbSzSttRAep/pW74v1Ixq4DGpPhxohFs2u3IPn3IKwA/wR5+99Sf0rzaFF1qnKdkLU48zNDwr4dttFtmztmvpVxNP/AOyr6D+daFh8u+M/wMRWiIVU5HGKpXqm3nEo+433vrX0dKChHlirI46srtSZhanbPNe39o5nlEsHnxOVwsbDgxg9+gNcxpTyCPZJlVQ4Un0r0JmBUFep5waw00eBTvkbI/ujpW0XY4qkbt2KNhpNujfb4pNxlffjPStZRBFKRjJzkVQvI380QW/yoAAoFaFtp0u5SzfMR3PtVMmCKGn3SX2oOPJKpbkgg/xE5rI+KV7/AGN4Kv7iDdFJcKLePB/vcH9M12unaXDZhwo3O7bnY9zXkH7T2srbxWemqQRbxefIg7s3Cj8gD+NYOlCcveVz0cPfR3PEdYvVs7dYUAaef5EHoDxmttF2qqjoAAK4vRxJe6iLm6JZmmH0HfFdoOSa7UzsoVHUk5D061OpGOtV14qRTVHUTqakU1ADUimgTHlqVWO6oyaAwHNBJehYEY71Dqd9Z2MJeeRffnj6ccn6VkavrEdkhRctI3RQcH8fQfrXJXtxPeSmWdy390DgL9BUt9jlqS5Xoamq+Ipbs4gkktwOjbcnHt6ViebiTzBJI7n+JuM/X1pQh54phXBqUcVWPPK8tSyJ5COQjfVBUtnePZXsF9DAgmtpVmjK5B3KQR/Kq0XpUwXuKGhxpRfQ9K8XW0J1eS+tAfIu0S7h9w43f41zERCXbr2Y7hXb+CLceIPAQIdTc6UrwsD12L86f+Olh+Fcprlr9nvWZF2KMOgx/Cf/AK+a5q2rTFQp8icfM+jfgXrSar4DgsSR9o0k/ZHGedmMxt+I/lXcNXzV8GfE6eHfF0UlzLt0+/jFrdZ6Kc5R/wAD+hr6VYYPNKLujlqx5ZDaQ9aXNITzVGYmaSikJGDkqoAySxwAPX2qQBiApJYAAEkk4AHck14V8TPE914z8R23h7QCbizjmCQBB/x8ynjefYdB+Jp/xb+I39qedoGhTMunhttxcqcG5I/hX/Yz/wB9fTFdZ8F/BB0SyGv6nEU1O6jxBG4wbaI9z6MR+QqXrodNOFtWdl4P8PQeGPDUGkWzI7p808oH+tlP3m+nYVsqo2gU5FGMA5A6UEYoN0MlQYxUJJUVYyNuTUTAGgpCqylBn71Jt3fSoyCDxzViEhj15oBjNu3ikzuqfbk4NNwq9Bmgm5HjPWmE4U1K/wAy+lQ7S7bR0oKQJk81IoyORUiRgLgU4DjGKdhXI1jGKKkUYGKKZIiAiLkc1EIi784AqZpMjgc005PI60rFJsiEUiSHBpyFxnOKe5k645qLLFsNxSGSJIRmmeZl8qaBx3qPaWYkHrQKxaUlqcu7P3eKrKjoc7jQLhwdmTTuJq5YdQckrUeMHIAxSLNn5Sc+9N3tyc8UXGkOk5XjimKxXgU5GBjJqAI7EkcUhpErkNyTnFNWbnAFIAR8vakbPG0Ux2LEJLSc1DrEuy2OPSltywkyTVDX5D5JUeleNjf4jCK94878ReZfanDZRk7ppFjH4mvUrYiC2ighXbHEgRB7AYrzjR087x1p6kZAkLfkpP8ASvTZAFjGOa2y2Noykb13shiyHd8w5qWSNJIyH5B/SoY2weRmp0kXpXppnNJXRQNrIpKptI7Emmmw4w8u4+gFaDAbjjgVHM6ooYnjvV3bMJU4xWhX+xW0SZRBvPJPempGFO4En60+W6hCZMi1VW9jbhMt+FJ3KVlGxfi2nfuOAOST2FfJHxz1g6nrl1cbsiaYkf7o+6PyC19GeNNabT9DvDnZJPF5EQB5y3BP4DJ/Cvkzx5OZ9Qwpzljt/E4Fa0171zahrBsyrWWLTrKO5mOAGDcdyTXYDgn0zXmHiy9EtytjCf3VuMNjoWx/SvSNNczadbyN1aJSfyrVLqXgaynOUF0LANPBptAqz0iZTTweKgU8Vd020utQvYrKygkuLmZtscSDLMf896b01BuxH0Gc1h6vrARmhtCHccF+oX6epr3zSvgjaXFhGPEOq3izsMywWTKqr/s7yCT+FdJpvwb+HOnRqP8AhHReOo+/dXEjk/gCB+lYSqp7HHUxC2R8fsdzlncMx5JJyTV6w0jV79gtjpGo3ZPTybV3H54xX2npfhXwrp7A2PhzSbbb0K2yk/mcmt9dqRhUARfRRgfpUe0Od1PI+N9J+FfxC1Ar5Phe6gRv47pliA/M5/Ssvx54J13wZf29rrcESm5i82KSF98bc4K7vUdx7ivtlgrHk5+tZPiPQtD8Q2Q0/XNMgv7UNuCS5G1vUEYIP0NJVHcXPfofDUafMFHzMeAByT+Fd74M+FPjfxKFmg0l9Psz/wAvN+fJUj2U/Mfyr6f0Dwb4W0CQPovh+wsmH/LRY97/APfTEmt5m5yWyabqdg57bHlXw/8AhNL4OjutQXW5L6/kiCtAkQSBwOcc8k9Rn36U/wCIvgy08T+F4NV0S3EeoWkRMcYXBkQfeiI/vDH5j3r1EMF596wr0SaNqUuqwBm06Yhr2JRzC3/PVcdv7w9s9jWT13Icne58lnCE8fIxIII5Hsa9x+EXxGtjZQaD4jvfKaNQlneTHhgOkbt2I7E9uKm+KnwvOszP4g8KLEbuZd89opAS4PXeh6Bvboe1eGXEV1ZSvDNbyQOpKyRTJtII7EHms7uLHKCqI+xQysiurq6NyrKchh6gjrSE18t+F/H/AIj8PReTpuqOlsP+XadBLEPoDyv4GtXVfi54xvotkWoWtiO5tbYK5/Fs1XOmc7w8uh7/AK5rGlaFZPfazfw2UA6GQ/M59FXqx+leF/Ev4m3XiKJ9L0xJLHSCcMGP7659N2Pur/s9++elcnZWniXxdqm21gvtVu3PMjsWxnuWPCj8hXs/w6+Gdj4auEv9WEWq62AGWMjMFmfXP8Te/wCXrRdvY0jSUNzI+Enw8+yC28SeJbYm5b5rDTnHzL6SSD27Dt3r1758ku+5ycse1R+XtdpXcyzNw8h6n2HoPalQndmlsbJdSVXKjFPVtwxUbgE5poBU5zTuFrkrZHamlCeTxUquNvNIWBFAIaoAHHWoirJIWB61MMU7aOvagLiRHceTipRtPeq7Ag5qaNcjmmiX3HHHSonUAYWpNhJ9KXyxjOaYkRKWFODfMKcAaeqrnpQFw2g80U/A9KKCSpknrxTtvo2D61ExORmhtwHXilc1syZo228Pn8ajMbryQSKavmcc8U+SRgnHNIWpFuQfeVqeJVxlR0pvmeYcFaUoAPkU5oKsPa4yucCjfAw6AGofKbBOOtEaKBubqKBWRI0GRlDVYsVyDmrEMqrux3qFn/ecKDQxrzBJtqc8ZpyMzj5TxUgAfG5QBS7EJIU4FJILoZnauSOabKzBeBQ+Aducn3pMM3FMEImV5J561R1n5oWx3FaRibGao6hGwQqR24rzMfTdlMuO5wVlMLPxjYXD8IJgrE8YB+U/zr0xS5LA9Aa8y8SWxWTzB1Fd/wCG9QTUdHt7gEF9u2XHZx1/xpZdPeHzNKyuky4wmzhRxT0hdV3nrUwOAOKc75XA4r1bHO5PYrhyeCpqrqSubc7WKkHPTr7Va3FgQKJQDCVODkULcTWjMqC3aXGWTaRnO2pIbcGYxl+B1AAHFS2aSeSgBBVSc0p2rdK7sVXqa0Zzx1uea/G68gszFYQrh4YjK/PO5+F/8dz+dfMHi6+8q6knAyYyAo/2v/117J8S9YfVNQur9if9KmLKM9Ix8qD/AL5XP414J4ucu4H9+QtW1PuddW9Kg+9jBUNK/wA3LO3J+tes6If+JbEn9z5a8y0uDzLiPI43CvS9GyqsvY4NaM58qjdTl6F+lX0oIpCyIjPI6oiAszN0AHWmme1e2poaJpl9rGpwadp1u1xcztiNF7+pJ7AetfR3w68C2fhTT92UudUlX9/cleF/2E9F9+pryD9ljW4tT8caukcYEJ08+SxHzHbIMn2yDX0bG4OQK5qk23Y4a9ZydlsREMCACakXP8VK7KDwOaQHceeKyOYR0XIIxTshRg802ThhSM3fvQFrick4pfLalBGMjOaarkHFAyYKAvsahbAbC8ilEpHDVE2N2d1K4JFpMbcnFI7IDgY5qshcnANPxg/MeaYrFWK0ewJ/s4J5B5Nq/CKfVD/D/u9PpUOqQaNqKiPWtNilI/5+bbdj6Ng/zrSLjGKN5HANAWOJ1DwH8N7omSXT7WEd/JmdP0FR6d4B8AxsJdP8OXN8wPDSGQoPrvIGK7koSM8U/LbMEk+nNKyHd9zMtLI28At7aC3062xjybZQC31bA/T86sRwrChVAAM9ql2E9WpjDHfNDKREuS5HWpSAOPWo9vPB5oJIOD+dSPckZdoHNEg+TOeabk7fUU2LLMc9KYIVThMk5NSRqSMmkdM9O1AbHFAN3JAgyCDT5clcLxTEPY07ABzmmiAVDjkjNOIIHWkzu5BpM80wsKGY8ZqRU9TUQxnINTxsCTntQKQxFkUkHp608kAY6U1XwTk0ow7ZoJaDzD6H8qKYxbNFAWKgAMm12x61O8YKZVsgVEoTBLdacGQLjJ5qTVjV8zBA5ApyDPGcZpIhtzz1qVlyoK84oBsaUC5I7UqktkCmhnw2RSwsgyzMcn0qhCuxUYBzTCvf1qXCnlRmmSq20bR0osCY1B/s05QpJBWkWQIuWQ5qQNG464NSJtkZHOM01yqHjmldQG3Fs0qxjqOc07DRGNjvnGMVJlQOBSOFK44BqMttpD3JTLx92oJl8+M88inZ38A80oVkGTUzgpx5XsPY5LX7PzEbArK8FaoNJ1ZrS5bbbTnaSeins39K7bULTz4yyAZ7j1rz7xJp7xsZVXkV4k4Tw1RM6ItSVj1HLZI9KjaQkYCmsHwRra6npHkTuTd2vyvnqy9m/pW9HL8vQV7dOoqkVJdTncWnqLGcA7uKRTlj6GkZwRuJFNLIwyGxVXCxTimePzVB431keN7max8MXtzGTvZBEh75c7f5ZrWKnzXCjcT0FeZfEL4jaNcyz+FtKZb+4WNnurhG/dQbOwP8TZOPQetaxd0c8YL2iXc8q8XXAklkCHCIpRPoBgV5Vr0Dz3kadFVeteh6qxkYgnOTzXHasFF04HXpXRBG2YS5aVu5Q0m3AvYUHY5PHpXb6cNrL71zPh2HzdSAUbmCM2B1rtdD06fUdStNOs9j3NzMIYl3jlj6+nvTkysp5YUpN9WIw5wBXPeLbiV1XT4DhSR5hH8R/u17j4S+Eeq3OpSnxHILG0jJVVgkV5Jj6r2C+55r0nw14I8J+H5hLp2jQNcDpcXA82T6gtwPwrGVVbHVWqRkrJnln7KngfW9GvZ/EmqWctlbvbNFbrKNrTbyOcHnAA619ChQV+Xqarlm353Ek+tTIQq9eaybuzilqxSoGCTzS8A1G0nzZNDnKZHJpCsyRypxjqKgcHdwaYBIp3fpQ7rtxnmpKSHmQqcY4pJJlUZI5qJtxAxSmL93ljz6UD0AyCToMUbSRwMmjAUdaVQVHB60AMQtnuCKmwCPm60xDzzTwPegBABwAacw54NIY9oyOTQyPjNBIpb5cKeaZukx1pyLn6+tNZQeBnIpsBm9iOaaSRTkyCQVok27TnikaCKc96O+DzUcZ5IAJp653YNAWE3Y+TtSou37pzmh4yRkU+ANjntQA9VZVy1OEasMnihTg/McikeTBHPFBDuKwAGM80L0wTQ2G5FIR0oGKo7CgKe5p8ajtS5A4xVEkfsKkUjbjPNIqjOaRiB7VI3qK4GRTkcIPm5qMtkgClcgKAetUImBUjOKKh3j1opXDlEKxbtp4NNkjC4PvQzoDkjdmlzkjAwPemA9URl+Y4pyxfL8kmPaoiQeNwpwk2HpQDRK0YX5Tye9VuY2IHI96lDvKuehqKUlD84o0BXJFddmVbHtSLM2do5+tRoVMmFHWkuIJFO9X59KTHZFohGUErjiq3kDedp4qSOXEQVjk96Yzoh3ZIJpCVxV2x8dfrTJJdpzninyFdgPXNVmJzgDIptjWu48qX+ZWJpJFZV55pAWHHQUsrbsA9KRXUdGDtB2/jStkkZPFCSKBio3cA46ZoELuwcVn39hb3qskuEYjGQKtEoQeefWmnDLyaznGM1aSNI6HP8Ah7w3PpOsTXi3KNA8RTaM5JyCP5V0DyKowDQZ8DbUZ28sRUwhGCtEd23djw44B6VBql/Y6bYTX2oXUVpawjMkshwo9vr7Csfxh4r0XwnpR1HWZ8DkQQIR5k7eij+Z6Cvl34jePdb8bX4a8byLKIkwWcTHy4/f/ab3NbwpuZz4jERpLXc6r4sfGG81x59J8Mmey0tgUeYnbLcjvn+4p/ujk9z2rzHRtUOi3TXc0TSxSR+VIq/eCnnI+npTILbPLc0zU41+zMK7Y00lY8Z4mfPzp6o1r/xToixiVbsznsiIdx+uelYWkWraw097LIyF3JVN3SucltsSEgZXvVyG6eIYgMmcYC4q0kisTi6mItzGhe6c9tckLIVwpLOWwFXvzX0F+yx4bDpJ4meEx2lqDb2RYYLyN/rH/IgfjjtXgmhaPrXiPVLHSIomLXUyp6lienH+fWvuXQNHttA8PWOiWQXyLOLywQMbj1ZvxOTXPiJ6WOnL6bvzPY11KbBjqacq4UkiqELSb8YNXoBt++xOa5Uz05Kw+IszZKgYqQDL5FRTSRoCADk+lQRzSDscVV7E8rZckxkBlxnoaVFaFSeuajSTzTk9qeJMn1pk2YSHcARx61GsYcHPFJLL8+AuKcNxXIpMa2A4UYUEmlEbSKPmxUfIkwDn1qc/KM5xRYHoMa2HHzH86kEWFxxTVl3HrxSs5PAp6E3Y9Ylx2odQowq5piuw4IpUmzkHjFAtRCSBx2prO2MkkVIOTmo5tqnBoGtxcgpnOKhYFTlTzTxtxUbsVbjmkykhA0npSH/a5qfzFwBioJZFycdqGNE0IXGTSSbc/KOarCc5AIxUoYkZFK47MGZ1BzTTMwGMU5WDDDHBpzlQoUAGgZEJt52gH61KIty/e5oIGAwAGKfGQwIPWkhMVOFwTyKXK96RVycE0jYU4HNMQ6NiSSBgVKBkVFuwuFFOjJVSWNAmhd4z0prLuG7NN5fJ6CjcQduOKAsGCq5FJGrsSXNPkYMACMVHu2n5elAx2COMUUnXnNFAESxrnG4kVJJhACTkVBHvLgsePapCXPUcChDejBXRz90j3p2COtNPThaiZnyc9PSi4blmPI5yaa3znDZNNR2dBg47U4PsbDdaBDGikX5gcCpDll4Yk0yd2JUA8d6JmdVyg4oC1yNVcEvyaa8isw9felV5CuAKhkD5yTz6UmUkPlldSAenpT0mGPTNNVkdPnX5qVQhXkZNFx6Dslvc1GWdTg9KkZkjAweahZiW3twB2oYkiXYMAt+lNkTONmTTUkLnjgCnCRl5GDRoGpEY88GpQvyjAzRkM2fWgqQNwY89qSQxJEViNoNcx8SfF+m+CtCa9vtstzICtpahsNM/r7KO5rZ8Sa3ZeHdCutZ1N9ltbIWKj70jdkX3J4FfH3jvxRqPi7xLcatqDYZziKIHKwxj7qL7D9a1p0+ZnLiMR7KNupX8Va/qvinWZdT1WfzZ5OAAMLGvZVHYD0/Oqlvb4Ge1PtICcFquEBU6V2RjZHi1Kjk7srsoQdKx9WlByo5rRvZxGhArEYGSTJqzMbbQhjkjrV6NVQAKoz9KbEgArW8L6Pea9rlppVhGZLi5lEa47erH2AyT9KUnZF04OTsj2X9l7w2gurnxXex4WLNvZkjq5++4+gOPxr34AMcHGO1Yuh6VZaHoNhpVjGBBbRBEwOp7sfcnJrSM2xBuU57V58pXdz6GnTUIpIsMNrE4GKhkYn7rYp5kYjG3qOajbqFAH1qWWiRBlfmOTTw3rVadyi8A5pYplZBnrQDTLUbyZI2DHrT1YgFRwaiEh2YFNVj15pkkznJw3BPelVBGn3iarzM2AMjNNV2Py5zRewNaFhpY856GkmmDLgZqnJKFO3bk+tOiy5yxpXHy9Swp/d+lNjbbKDuJFJtJGAw2igvjACUxFlHIc0jMA/zHFRRsc5xg1HOSwPODTuJR1JxcKT8poc78M3BqpapmPrk+1TkgAAtSuU1Z6EpbgDtUcsgHTrTQ25uDkUyVWL7ugobBLUXzc8kYp6KrAnFVCzu2DwKsq+zAHIqUymrDtvy8pThwOnIqNpSTkcUhmI5zkU7omzF75Ip23+JTSC4BH3BinLIuOlGg9R6bs4PIoZCpyDxTkUMu7dimsQvHWmTccDnoeac4+XI696hWTaeF4p4b5h6GgLDhwc0hmBBzxSybSODUTBXGBxigFqSJINu7tQWLcjpULYWLFSRMGULQO3Uc5J5JpVAK9OaTIBINCv1GKBC+X6k5op+7HHFFArlUEovByRxUiTy7dsiikJCjPHPamsScGgsVZ1LbQKldQcNgVWZVB+U80iySxnD4Kmi4nHsWBjoMA01omY5LZNQsxAyDgUxbhuoGaLhZk0ibRyc1Hvb7pzTluM9V6VFLKDyM5oY0TqOMY5qMl93IGBVfz5hwBTstkF88+lK47WHuehBFOXy8ZyQajuGHl/ul5pkMkrALImB60dQtoTTSDH3Mj1qr5jk4AwDVryyRx+VRNHh/ekxp2G28jEEYzipApY5zjHalSIlsKdnrUiwqDh3yPUU0hNjApXnOTUqZk+Vclj0HvSr5Y+Q5471xXxk8Wt4R8F3F1aOseoXZNrZkdQSPmcf7q/qRVJa2M5S5Vdnjf7RfjY6zr/8AwjunzBtO05yGZT/rp+jE+oXoPxryy0iywJ5pg3SylmJY56nqT61eiARcmu6EeVWPCrVXUk2yyhEa1WurvC4FQXVxgYBrNmkLHjmrMBbqYyNgZpIUGKagycmpQeKB2Hg5bAr6I/Z48INpWjP4ovoQt1fLttARykHdvYsf0A9a8t+Dngx/F3iYCcFdNs8S3j/3lzxGPdj+mTX1OqpEqxxqqRqNqqo4VRwAPYVy1Z3dkepg6Nlzs0bPa0C5xkGrDqhGWAqjaugXaep6VcldUjJbmsGegCseRgYqCclHBXpQHBjPPWnsisgDDJ9aRS0GvLG0eD1qFmUL8o5FSMka9Rgj1qspEs+BwvSpZUSaB5MFj+VSiffEccYqPyzGSRzUKMWcnOCO1MLXJtw2hiTkVGk4V8ZxnuaR2Gwk9ahUF0JK8CpGkWRMqsQQDnvSm6ydqJVeN4jwQVIoaUL0H40D5UXIcuOcg/WnmQdCelUPNYDKsfenpJlv507kuJbFwCTtzwKriVmchqaZVLDaKS4LEgqoAouCViS0k8tmUH6UOz7+eQarBwHzg08Snoe9Iq2pIshWT5cinl3bOTzUJ4AOaeuG6HpQOxJG5QkAA1IGLscgACoQoznNSDAOM9aCWPYjbjFORIyvJpgC5wRkVNHtztAqkS2AhTjBqZYkIAxURjJckcVJCrnnPC00S2SHauEFI0eOSeKHP8VPjYMvXiqJ6DCB0A60x1zx0NPf7+R0ok6AqMmpC5EqlepzUigBdxA5qOQEHJ4peSNx6UFgELMRTWXy+nWn7wBwMUrbXI4osK4L8y5oA7UoUpzjIp7EkA4wKBERbmipgBjtRQURtHtO7rUFxIUIz3qRiyDBYNUEpZ/kkIB7EUNkxQ0OAcE4okfPGOnc00IkZyzbvrTZt7/dwBSbNOo4Rs43GT5fSpHVY1GByarrDMi8OAKdIr8bnDCgNB5YA5YdfSpdsRTHeoxMAgBUdPSqzud2FOKBJXLHybSo6jvTYwpbmTI71EELgAE+9PeONSM7unagdiwfLXGzafUmmSSAcFwfQVH5cZTjOaNsWPmUZFBNh4kLL6YqFmcfMOQKmUoCc424pmFwdjbh70MaGCckgjnI5pY5OcNwKQLGcqBg1FcISgCZz7UkPQvouehDelfLf7RfiKTWvHstgkmbXS1+yxgHgvnLt9STj8K+k/tZsLG6vZ1zHawSTt9EUsf5V8WXc0uoapPdzEtJNI0jE9ySSf5100Fd3POx83GKS6haRdOKddOFGKuLCI4Cx4rHvpcsRmus8dsrzyZqFRk0HJNPFA0hQMVc0bT7vVtVtdMsIWmu7qURQxr1Zj/TuT6CqsKSSyrFHG0juQqogyzE9AB3NfTXwa+GsPhbTDqmtlP7ZuFwQG/49YzzsB/vH+Ij6CsZzsjroUOdnY+A/Cdj4P8ADFvo9swlm/1l1OOs0p6n6DoPatt/KiheVjwgJP0FZkaNHIzW90ZYhxyc/rShHltnM0u3b0XpmuW2tz1VJJWRJb6ikzlthijHClurGrdtdi4kMOTgDIJHWuT8RXUUVpNB5hCtE23b1VsZBq/ompJJp1tAzh7mJU3N/eBptAqlnZnUyNFGg5zTEeQjev61AhDn5+gqzhduQ3HpWZ0jmkSTKSHkjtVX5YvkHI9aJmXoh5qB2DDC9R60AkTNISAgY0KgGfmyD1qkXKv6mpBIQuM4z1qSrFkAIBzlaasjOxC9PamPKQgUAEmki2qflbk9qBD3CbuuDTeM4zTJjtfk59aap4570AWYiF+6Mg9akVV2khsGoAyjkHnvTEfBIzk0BYsghOeKlZ49mDVWMZOZDx1pJDvk2Y4AqhWuSrsc5xTxCpOehqNFcYxwPap4whkCkkk9Oakb0InL524/GnCPeMg4YdvWnyqd/wAnQVIBuHJG4elFhcxA0bL1p8ZUHJPNTEpt+fmomUA7h0qgvcmZQeS2M06NFU5DZNQK5YHPIHSpAOQ3r2o2JaLAkUtyePSiWXZ8q9DULquM55NCHcCO4p3FYlDKRnPAojkY5wMrUa7chSee9KJAGwh+UUBYnR2PTgU6NgHPOaiE/ovFSh12kgCnclpjnYDgrmggEfKKiDF+G6etOQDoHIpBYR8pyRz6UZfAO2nupZRnrSAuDjGcUAME7A4YZFP83d/DgU1iCMBSDSKQflZsUFBn3NFSeUvqaKCbkBV94QA49akCjJywGPWo7ZnkYqx5HrT5Iu7HNNbCemhBOkJG1Xy3pVdSyPt5x71YwUYsMZ7Co3IlUgqQ1SzSI1oWDB1YsD1HpT3hjUbtx9xSQqi5UnOaZcYwsa5wepNAdRSyuwRBQYt8nsO9A+WPIAyOlKCQhxgmgexEoAuDtJ4FSKsm4nBK96EwV+ZcN608EgZ3ZoSE2NZdwDA/hTcqJdgGSRTyp6g7T6UzIDkE4c96dgTAjC/L+tRgKjbTzu9KmcKI+QTTTgoOcNSsCY5U2nJBx6mmfKJODRv8vKu2RTJHhK46CgRleORK/g3X0Q/MdMudgH/XJq+QtJiDSbm6V9mmPfkkbkIwQwyCD1FfL3xN8Cax4O1W4ngt5LjRZHLW91GpKopOQj/3WHT3row8krpnBj6Tkk4nL6vcKgKKelc/K5dyasTO0zdQaiKAHkjP1rpcjy1TZGoqxa281xcxW1vDJNNKwSOONSWdj0AA6mun8H/DzxT4oZX0/TmitScG7ucxxL+fLfQV9B/Dj4b6J4OVbmDGoaqQQ99KmCueojX+Ee/U1jOqkdtDCSnvojF+DfwwTwzGmua7DHLrLDMMedy2Yx+Rk9+3QdzXSeL8BYYTOVLsUXDYBbkiutZMRkFySO1cV4lsbqYptjRYoCsiueeVPTHuKxi+Z6nbVhyRSgjG8N6xJp8U1rK0mwyAYAzhs0/Vdb1UahPCwjhijYFWPVlPIqnoVnHNczWhDgzMWJB984rtbfQIJ5luZI18zAVi3JxWicUc9qj0M28ijlsbK/KF9zAOB3zxUXhcpbSeTES77yDu65GQf5V1badGITbDkDlR2zXPRWaaf4oh8mPAljZpMnjf3Iock9AhRaak2dTbkyoHHRhnFSM+P4scd6rQyhSSq4Q9B6Uk7hu2RXM9z04u6RN5yFDtXmoS+flYEMajUBWDHIpxy+COTUlbCSE8AAZHegBvvOSAaa3XDHBqFnIkwWDCgCwrFmI3HjvSxytEGAXPoag81RgbTz3pd4z1zQA6R5DyCMmnrL8mGyT7VEM55p54GR0oKJA7qBtGAfWnFlBx3PU1EskjL8uAooClsENQSWgCygdKkGEXBIGaqO7w7S1TJ++UHHzetAFyBDtHzHFAQJLwxNJbps6tU4YbieOlVYi9iTggDHHeo3RUk3dqfG5xnpTpo1dQCc802iUyMCPcRnIPNPCqV2inhAowyioyuw7hRYdxEADYxSAkZz0pGbcdwOMU1TkHJzUsa1HDaedxzTs7funJqKJ2DY20pLFyduBSHYfjHOevWlRgCNnPPNRkNjCjNOUB1IY4NA7E4ZcsSOtKScDCnHrUG1ox8p3VLvLDLdfQVSJsPDEN6inbvlDHgUm6Nl+TrTQowcmmLcl88F89Fp6ykEBagVgRjpS7Wz0GR3ouKyLLHGQcVACPMzilV2QnJBJp0W3BL/KaA2H7yOKKCMnNFBNylF8jZXqTzUkrHd170UULYp7kJ++aV+invRRQyiuPlBwTSHmIZJoopFD4vuCpHAeJ9wHSiikhPcrRjI5Jqzb8dAKKKYpbCSEmY5qJ+ASOtFFNiRDLI6kYY0gds5zzRRSLGyMS/NFtxKy4BHvRRQtw6AZpBcCMH5c9KmjlbyA3GJG2OuOGHoRRRTEYWr+D/CV08dxceGdKkkkPzH7OFz+WKdpHhbwzYzBrLw9pVvJ2kW1UsPoSDRRTZzItCWVpZt0jNtXjJ6Vas+h+tFFRE7HsOn4kGKytaA3svb0oorSJzVjn/CFpCNellwSyscZPArqvMbzJOe9FFUzKO5LHK+524ziqklpBLeyTyJueNTtz0HSiin1YvsIfHyvNKoGaKKRotiaFFY8jNXYrSBjynbtRRUh1IrjT7bzA2Gz9ay7pFicbB370UVDNoEEzHcOaVetFFSaEzMQBinBiYjnHWiigCC4YpG204p9s7YDZ5oooKLCjzFbeS3PerdsNmFXpRRVEvYmPPWpVAxRRTM2PXleak6dPSiigkazt5e7PNRMS5G4miigaJQo37ccUIow3FFFIZGP9ZUkn3tvaiipLB/l6cU0/LnFFFALcWMnZQhO8UUVQFnaqN8oAo65zRRTIBgB0pYfu0UUIHsMUd8nOalDHK+9FFAmSL0oooqiD/9k=";

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
