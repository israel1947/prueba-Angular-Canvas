import { Component, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libros } from '../../interfaces/libros.interface';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorsService } from '../../../shared/validators/email-validators.service';
import { LibrosServicesService } from '../../services/libros-services.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit, AfterViewInit{

  libro!:Libros

  miFormulario:FormGroup=this.formBuilder.group({
    apellidos:[,Validators.required ],
    nombre:[,Validators.required ],
    direccion:[,Validators.required],
    telefono:[,[Validators.required, Validators.minLength(10)]],
    email:[, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidators] ],
    autor:[,[Validators.required, Validators.minLength(3)]],
    titulo:[,[Validators.required, Validators.minLength(3)]],
    fecha:[,[Validators.required]],
    fechaentrega:[,[Validators.required]],
    firma:[,[Validators.required]],
  })



  constructor(private formBuilder:FormBuilder,
              private validatorsService:ValidatorsService,
              private emailValidators:EmailValidatorsService,
              private librosService:LibrosServicesService){ }
              


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

 


  @ViewChild('sigPad') sigPad:any;
  sigPadElement:any;
  context:any;
  isDrawing = false;
  img:any;

  ngAfterViewInit(): void {

    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#b0e0ce';
    
    
  }

  ngOnInit() {}

  campoInvalido(campo:string){
    return this.miFormulario.get(campo)?.invalid
             && this.miFormulario.get(campo)?.touched;
  }


  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e:any) {
    this.isDrawing = false;
  }

  onMouseDown(e:any) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e:any) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  private relativeCoords(event:any) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  save() {
    this.img = this.sigPadElement.toDataURL("image/png");
    console.log(this.img);
  }

  

  enviarForm(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return  ;
    }
    //console.log(this.miFormulario.value)
    this.librosService.librosPrestados(this.miFormulario.value)
        .subscribe(rep=>{
          console.log('respuesta', rep);
        })
     this.miFormulario.reset();
  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  

  downloadPDF() {
    // Extraemos el
    const DATA:any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_comprobante.pdf`);
    });
  }
}