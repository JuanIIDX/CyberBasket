import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  tipo: string="";
  marca: string="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("test");
    this.tipo = this.route.snapshot.queryParams['tipo'];
    this.marca = this.route.snapshot.queryParams['marca'];
    console.log(this.tipo);
    console.log(this.marca);
  }

}
