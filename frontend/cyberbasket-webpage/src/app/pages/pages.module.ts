import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";



import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { RegisterShopComponent } from './register-shop/register-shop.component';
import { ProductComponent } from './product/product.component';
import { BuyInfoComponent } from './buy-info/buy-info.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
    declarations: [DashboardComponent,HomeComponent, PruebaComponent, LoginComponent, RegisterComponent, SearchComponent, ProductsComponent, RegisterShopComponent, ProductComponent, BuyInfoComponent, ShopComponent],
    exports: [DashboardComponent,HomeComponent,PruebaComponent],
    imports: [CommonModule,RouterModule,HttpClientModule,FormsModule,ReactiveFormsModule,NgApexchartsModule],
  })
  export class PageModule {}
