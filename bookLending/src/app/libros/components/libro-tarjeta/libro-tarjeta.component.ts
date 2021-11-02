import { Component, Input } from '@angular/core';
import { Libros } from '../../interfaces/libros.interface';

@Component({
  selector: 'app-libro-tarjeta',
  templateUrl: './libro-tarjeta.component.html',
  styleUrls: ['./libro-tarjeta.component.css']
})
export class LibroTarjetaComponent  {

  @Input() libro!:Libros


}
