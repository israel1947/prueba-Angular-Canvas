import { Component, OnInit } from '@angular/core';
import { HtmlInputEvent } from '../../interfaces/photo-user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Libros } from '../../interfaces/libros.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file!: File;

  photoSelect!:string|ArrayBuffer;

 

  get auth(){

    return this.authService.auth
  }

  constructor(private authService:AuthService,) { }

  ngOnInit(): void {
  }

  

}
