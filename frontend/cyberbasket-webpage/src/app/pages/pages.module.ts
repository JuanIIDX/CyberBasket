import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [DashboardComponent,HomeComponent, PruebaComponent],
    exports: [DashboardComponent,HomeComponent,PruebaComponent],
    imports: [CommonModule,RouterModule,HttpClientModule,FormsModule,ReactiveFormsModule],
    
  })
  export class PageModule {}