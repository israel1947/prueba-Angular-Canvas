import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorsService } from 'src/app/shared/validators/email-validators.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  miFormulario:FormGroup=this.formBuilder.group({
    usuario:['', [Validators.required, Validators.pattern(this.validatorsService.username) ] ],
    email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidators] ],
    password:['', [Validators.required,Validators.minLength(6)] ],
    passwordconfirm:['', [Validators.required,] ],
  },{
    validators:[this.validatorsService.camposIguales('password','passwordconfirm')]
  })

  constructor(private formBuilder:FormBuilder,
              private validatorsService:ValidatorsService,
              private emailValidators:EmailValidatorsService,
              private authService:AuthService) { }

  
 campoInvalido(campo:string){
  return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
 }
  
 get emailErrorMsg():string{
  const errors = this.miFormulario.get('email')?.errors;
  if(errors?.required){
    return 'Por favor ingrese un correo electronico'
                }else if(errors?.pattern){
    return 'Por favor ingrese un coreo valido'
   }else if(errors?.emailEnUso){
    return 'El correo ya esta en uso'
 }
  return '';
}

  registrar(){
    this.authService.agregarUsuario(this.miFormulario.value)
      .subscribe(rep=>{
        console.log('respuesta', rep);
      })
    this.miFormulario.markAllAsTouched();
  }

}
