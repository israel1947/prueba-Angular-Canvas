import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public username:string='([a-zA-Z]+) ([a-zA-Z]+)'; 
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  
  
  
  constructor() { }
  
    noPuedeSerStrider(control:FormControl):ValidationErrors | null{
      
      //tomar el valor del campo(username)
      const valor = control.value.trim().toLowerCase();
  
      if(valor==='strider'){
        return{
          noStrider:true
        }
      }
      return null;
    }


    camposIguales(campo1:string, campo2:string){

      return (formGroup:AbstractControl):ValidationErrors | null=>{

        const pass1 = formGroup.get(campo1)?.value;
        const pass2 = formGroup.get(campo2)?.value;

        console.log(pass1, pass2);

        if(pass1 !== pass2){
          //cuando las contraseñas no son iguales y se desea mandar un error alert
          formGroup.get(campo2)?.setErrors({noIgpasswordNoIguales:true});
          return {passwordNoIguales:true }
        }
        //si las contraseñas son iguales
        formGroup.get(campo2)?.setErrors(null);
        return null
      }
    }

    

}
