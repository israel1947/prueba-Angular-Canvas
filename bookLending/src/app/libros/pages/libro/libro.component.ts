import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LibrosServicesService } from '../../services/libros-services.service';
import { Libros } from '../../interfaces/libros.interface';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libro!:Libros;

  constructor(private rutaCtiva:ActivatedRoute,
              private libroServicios:LibrosServicesService,
              private router:Router) { }

  ngOnInit(): void {

    this.rutaCtiva.params
        .pipe(
          switchMap(({id})=>this.libroServicios.getLibrosForId(id))
        )
       .subscribe(libro=>this.libro=libro)
  }

  back(){
    this.router.navigate(['/libros/listado'])
  }

  apartar(){
    this.router.navigate(['/libros/formato'])
  }

}
