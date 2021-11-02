import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorsService implements AsyncValidator {

  
  constructor( private httpclient:HttpClient) { }

  //el observable puede resolver ya sea un error , o puede devolver null(si es null, quiere decir que todo esta bien)
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email);

    return this.httpclient.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
                  .pipe(//cuando el correo electronico ya este en uso
                    delay(3000),//3 segundos para mandar la sufuiente linea de codigo(si es valido o no)
                    map(resp=>{
                      return (resp.length === 0)
                      ? null 
                      : {emailEnUso:true}
                    })
                    
                  );
  }

}

