import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';


import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class SharedModule { }
