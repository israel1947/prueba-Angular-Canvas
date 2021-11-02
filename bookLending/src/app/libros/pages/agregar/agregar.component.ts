import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Idioma, Libros } from '../../interfaces/libros.interface';
import { LibrosServicesService } from '../../services/libros-services.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  idiomas=[
    {
      id:'Español',
      leng:'Español',

    },
    {
      id:'Castellano',
      leng:'Castellano',
    }
  ];

  libro:Libros={
    titulo:'',
    Autor:'',
    Categoria:'',
    Anio:0,
    Idioma:Idioma.Español,
    paginas:0,
    Resenia:'',
    alt_img:'',

  };

  constructor( private   libroService:LibrosServicesService,
               private   activatedRoute:ActivatedRoute,
               private   router:Router,
               private   snackbar:MatSnackBar,
               private   dialog:MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){//estoy diciendo que si la ruta no es igual a editar(si no estoy en la pagina de editar), entonces que no haga la peticion de la ruta de editar
      return;
    }

    //verificar url del personaje al que le damos click para editar su info
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.libroService.getLibrosForId(id))
    )
    .subscribe(libro=>this.libro=libro);
  }


 guardar(){//boton para guardar datos en la base de datos al darle click

    if(this.libro.titulo.trim().length===0){
      return;
    }

    if(this.libro.id){ 
      //actualizar registro de libro
      this.libroService.actualizarLibro(this.libro)
      .subscribe(libro=>this.mostrarSnackbar('Resgistro Actualizado'))

    }else{ 

      //crear nuevo libro en caso de que su id no exista
      this.libroService.agregarLibro(this.libro)
      .subscribe(libro=>{
        this.router.navigate(['/libros/editar', libro.id]);
        
        this.mostrarSnackbar('Registro Creado');
      })
    }

  }

 deleteLibro(){
   const dialog= this.dialog.open(ConfirmarComponent,{
    width:'250px',
    data:this.libro
  });

  dialog.afterClosed().subscribe(
    (result=>{
      if(result){

        this.libroService.eliminarLibro( this.libro.id! )
       .subscribe(resp=>{
          this.router.navigate(['/libros'])
       })
      }
    })
  )

 }

  //configuarcion del mensaje push a la hora de creear y actualizar el libro
  mostrarSnackbar(mensaje:string){
    
    this.snackbar.open(mensaje,'Aceptar',{
      duration:2000
    })
  }

}
