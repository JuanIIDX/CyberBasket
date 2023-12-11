import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  id: string="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("test");
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
  }
}
