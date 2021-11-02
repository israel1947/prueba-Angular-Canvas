import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Libros } from '../../interfaces/libros.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogReft:MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Libros) { }//traer la data de los super heroes directo desde la interfase, para luego ser inyectada en la ventana de dialog desde su html correspondiente

  ngOnInit(): void {
  }


  cancelar(){
  this.dialogReft.close();
  }

  confirmBorrar(){
  this.dialogReft.close(true);
  }

}
