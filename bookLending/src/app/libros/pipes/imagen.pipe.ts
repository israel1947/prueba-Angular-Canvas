import { Pipe, PipeTransform } from "@angular/core";
import { Libros } from '../interfaces/libros.interface';


@Pipe({
    name:'imagen'
})

export class ImagenPipe implements PipeTransform{

    transform(libro:Libros):string{

        if(!libro.id && !libro.alt_img){
            return  `assets/no-image.png`;

        }else if(libro.alt_img){
            return libro.alt_img

        }else{
            return  `assets/libros/${ libro.id }.jpg`;
        }


    }
}