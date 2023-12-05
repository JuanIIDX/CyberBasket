import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyberbasket-webpage';

  datos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDatos();
  }

  getDatos() {
    this.http.get<any[]>('http://127.0.0.1:8000/producto').subscribe(
      (res: any[]) => {
        this.datos = res;
        console.log(this.datos);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
