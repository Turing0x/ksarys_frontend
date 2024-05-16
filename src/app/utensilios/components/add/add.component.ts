import { Component, HostListener, OnInit, effect, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { environment } from '../../../../environments/environments';
import { GetUtenciliosTipo } from '../../interfaces/getUtensilioTipos.interface';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {

  isNumber():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if(isNaN(control.value)){
        return { 'notNumber': true };
      }
      return null;
    }
  }
  public baseUrl: string = environment.baseUrl;
  private fb          = inject( FormBuilder );

  public selectValue: string = '';
  public utensiliosTipos: GetUtenciliosTipo[] = [];
  public Importe = 0;

  public myForm: FormGroup = this.fb.group({
    Descripcion:     ['',Validators.required],
    Cantidad:       [ 0, [Validators.required, this.isNumber()]],
    Precio:      [0, [ Validators.required, this.isNumber()]],

  });

  public authStatusChangedEffect = effect(async () => {
    await this.ObtenerUtensiliosTipos();
  });

  async ObtenerUtensiliosTipos() {
    const result = await fetch(`${this.baseUrl}/api/utensilios/utensiliosTipos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json());

    if (result.data.length == 0) {
      console.log('problemas en la peticion');
    } else {
      for (let i = 0; i < result.data.length; i++) {
        this.utensiliosTipos[i] = result.data[i];
      }
    }
  }

  async addUtensilios(){
    const {Descripcion,      Cantidad,      Precio,  } = this.myForm.value
    // console.log({Nombre : Descripcion,Cantidad,Precio,IdTipo: this.selectValue});
    const utensilio = {
      Nombre : Descripcion,
      Cantidad,
      Precio: this.Importe,
      IdTipo: this.selectValue
    }

    const new_utensilio = await fetch(`${this.baseUrl}/api/utensilios`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(utensilio)
    }).then(response => response.json())


    if ( new_utensilio.success ) console.log('Success - Utensilio Insertado');
    else console.log('Error - Utensilio No Insertado')

    console.log(new_utensilio);

  }

  @HostListener('input', ['$event'])
  calcularImporte(){
    this.Importe = this.myForm.value.Cantidad * this.myForm.value.Precio ;
  }
}
