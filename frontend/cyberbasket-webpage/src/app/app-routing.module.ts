import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyInfoComponent } from './pages/buy-info/buy-info.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import  {RegisterComponent} from './pages/register/register.component';
import { RegisterShopComponent } from './pages/register-shop/register-shop.component';
import { SearchComponent } from './pages/search/search.component';
import{ShopComponent} from './pages/shop/shop.component';


import { PruebaComponent } from './pages/prueba/prueba.component';
import { ProductComponent } from './pages/product/product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CreateShopComponent } from './pages/create-shop/create-shop.component';
import { InventarioService } from './services/inventario.service';
import { InventoryComponent } from './pages/inventory/inventory.component';



//Borrar a futuro pruebas, productos no creo que se use
//En product y search hay un ejemplo de como se captura el id/options
//probar con pagina.com/product/?id=1234
//probar con pagina.com/search?tipo=12345&marca=6789

const routes: Routes = [
  {
    path: 'buy_info',
    component: BuyInfoComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product',
    component: ProductComponent,

  },
  {
    path: 'prueba',
    component: PruebaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register_shop',
    component: RegisterShopComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'create_product',
    component: CreateProductComponent,
  },
  {
    path: 'create_shop',
    component: CreateShopComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },

  {
    path: '',
    component: HomeComponent,
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
