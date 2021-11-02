import { Component, OnInit } from '@angular/core';
import { Libros } from '../../interfaces/libros.interface';
import { LibrosServicesService } from '../../services/libros-services.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string='';

  libros:Libros[]=[];

  libroSeleccionado:Libros|undefined

  constructor(private librosService:LibrosServicesService) { }

  ngOnInit(): void {
  }

  buscando(){

    this.librosService.getSugerencias(this.termino.trim())
    .subscribe(libros=>{
      this.libros=libros

    }) 
  }

  opcionSelect(event:any){

   
    if(!event.option.value){

      this.libroSeleccionado=undefined;
      return;
    }

    const libro:Libros = event.option.value;

   
    this.termino=libro.titulo;

    
    this.librosService.getLibrosForId(libro.id!)
    .subscribe(libros=>this.libroSeleccionado=libro)

  }

}
