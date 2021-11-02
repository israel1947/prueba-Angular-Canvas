import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private authService:AuthService,
               private router:Router){}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {


return this.authService.verificarAutenticacion()
.pipe(

tap(estaAutenticado=>{

  if(!estaAutenticado){//en caso de que el usuario no este autenticado, entonces sera redirigido a login
    this.router.navigate(['./auth/login'])
     }
   })
  );
}

canLoad(
route: Route,
segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {


return this.authService.verificarAutenticacion()
.pipe(

tap(estaAutenticado=>{

if(!estaAutenticado){
  this.router.navigate(['./auth/login'])


          }
       })
     );
   }
}
