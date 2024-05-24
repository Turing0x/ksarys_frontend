import { Component, inject } from '@angular/core';

  import { FormBuilder, FormGroup, Validators ,FormsModule,  ReactiveFormsModule,  } from '@angular/forms';
import { UtensiliosServices } from '../../../services/utensilios.service';
import { CommonModule, NgFor } from '@angular/common';
import { ConceptoClasificacionAlmacen } from '../../../services/concepto-clasificacion-almacen.service';


@Component({
  selector: 'app-concepto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './concepto.component.html',
  styleUrl: './concepto.component.css'
})
export class ConceptosManagerComponent {

  private fb = inject(FormBuilder);
  private conceptoClasificacionAlmacen = inject(ConceptoClasificacionAlmacen);



  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required,  Validators.minLength(4)]],
  });

  addConcepto(){
    const { Nombre } = this.myForm.value;

    this.conceptoClasificacionAlmacen.addConcepto(Nombre).subscribe((success) => {
      if (success) this.conceptoClasificacionAlmacen.message('Concepto Creado', true);
      else this.conceptoClasificacionAlmacen.message('Concepto no Creado', false);
    });
  }

}
