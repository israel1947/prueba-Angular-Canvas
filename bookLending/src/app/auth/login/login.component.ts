import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private router:Router,
              private authService:AuthService) { }

  login(){
    //ir al backend y confirmar que el usuario exista
 
    //un usuario
    this.authService.login()
    .subscribe(resp=>{
      console.log(resp)

      if(resp.id){//si el id existe, entonces me mandara hasta la ruta de heroe

        //ir a la  pagina de listado de heroes
        this.router.navigate(['./libros'])
      }
    })
  }

  ngOnInit(): void {
  }

}
