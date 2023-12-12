import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  id: string="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("test");
    console.log(this.id);
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
  }

}
