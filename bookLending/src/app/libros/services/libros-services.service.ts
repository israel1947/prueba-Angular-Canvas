import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Libros } from '../interfaces/libros.interface';
import { LibrosPrestados } from '../interfaces/libros-Prestados.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosServicesService {

  private  baseUrl:string=environment.baseUrl;//hacer el llamado de la url desde los envirement

  constructor( private http:HttpClient) { }

  getLibros():Observable<Libros[]>{
    return this.http.get<Libros[]>(`http://localhost:3000/libros`)
  }

  getLibrosForId(id:string):Observable<Libros>{
    return this.http.get<Libros>(`${this.baseUrl}/libros/${id}`)
  }

  getSugerencias(termino:string):Observable<Libros[]>{

    return this.http.get<Libros[]>(`${this.baseUrl}/libros?q=${termino}&_limit=5`);
  }

  agregarLibro(libro:Libros):Observable<Libros>{
    return this.http.post<Libros>(`${this.baseUrl}/libros/`, libro);
  }

 
  actualizarLibro(libro:Libros):Observable<Libros>{
    return this.http.put<Libros>(`${this.baseUrl}/libros/${libro.id}`, libro);
  }


  eliminarLibro(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/libros/${id}`);
  }


  librosPrestados(prestamo:LibrosPrestados):Observable<LibrosPrestados>{
    return this.http.post<LibrosPrestados>(`${this.baseUrl}/librosprestados`, prestamo)
  }
}
