import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  test: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  constructor(private http: HttpClient) { }

  loadData(): Promise<any> {

    return new Promise((resolve) => {
      this.http
        .get<any>(`https://micro-tienda.victoriouspebble-f396dfa4.westus2.azurecontainerapps.io/producto`)
        .subscribe(
          (resp) => {
            this.test=resp;
            console.log(this.test);
            return resolve(resp);
          },
          (err) => {
            return resolve(null);
          }
        );
    });
  }
  

}
