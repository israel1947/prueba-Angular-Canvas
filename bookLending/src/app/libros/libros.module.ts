import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


import { ImagenPipe } from './pipes/imagen.pipe';

import { LibrosRoutingModule } from './libros-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { LibroComponent } from './pages/libro/libro.component';
import { LibroTarjetaComponent } from './components/libro-tarjeta/libro-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { FormatoComponent } from './pages/formato/formato.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HomeComponent,
    ListadoComponent,
    LibroComponent,
    LibroTarjetaComponent,
    ConfirmarComponent,
    FormatoComponent,
    //pipe de imagens
    ImagenPipe,
    

  ],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class LibrosModule { }
