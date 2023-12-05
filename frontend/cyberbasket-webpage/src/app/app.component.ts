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
    
  }


}
