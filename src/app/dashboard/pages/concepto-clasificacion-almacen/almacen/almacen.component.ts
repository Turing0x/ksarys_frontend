import { NgFor, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptoClasificacionAlmacen } from '../../../services/concepto-clasificacion-almacen.service';
import { Entidad } from '../../../interfaces/entidad.interface';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})
export class AlmacenManagerComponent {

  private fb = inject(FormBuilder);
  private conceptoClasificacionAlmacen = inject(ConceptoClasificacionAlmacen);

  public entidades:Entidad[] = [];
  public selectValue: string = 'seleccionar';


  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required,  Validators.minLength(4)]],
  });

  addAlmacen(){
    const { Nombre } = this.myForm.value;

    this.conceptoClasificacionAlmacen.addAlmacen(Nombre).subscribe((success) => {
      if (success) this.conceptoClasificacionAlmacen.message('Almacen Creado', true);
      else this.conceptoClasificacionAlmacen.message('Almacen no Creado', false);
    });
  }
}
