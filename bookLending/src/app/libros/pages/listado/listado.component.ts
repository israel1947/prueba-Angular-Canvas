import { Component, OnInit } from '@angular/core';
import { LibrosServicesService } from '../../services/libros-services.service';
import { Libros } from '../../interfaces/libros.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  libros:Libros[]=[];

  constructor( private librosServices:LibrosServicesService) { }

  ngOnInit(): void {

    this.librosServices.getLibros()
      .subscribe(libros=>{
        this.libros=libros;
      } );
  }
 
}
