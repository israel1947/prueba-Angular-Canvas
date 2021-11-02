import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interface/auth.interface';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string=environment.baseUrl;
  private _auth:Usuarios | undefined

  get auth(){

    return {...this._auth }
  }

  constructor(private http:HttpClient) { }

  agregarUsuario(usuario:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(`${this.baseUrl}/usuarios`, usuario);

  }

  
  verificarAutenticacion():Observable<boolean> {

    if(!localStorage.getItem('id')){

      return of (false);

    }
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios/1`)
       .pipe(
         map(auth=>{
           this._auth=auth;//evitar que la informacion del usuario se pierda al recgargar rl navegador
           return true;
         })
       )
  }

  login(){
    
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth=>this._auth=auth),
        tap(auth=>localStorage.setItem('id', auth.id))//guardar el id del susario en el localStorage
      );
  }
}
