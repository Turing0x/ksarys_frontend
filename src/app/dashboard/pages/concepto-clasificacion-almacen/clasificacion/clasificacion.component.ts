import { NgFor, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConceptoClasificacionAlmacen } from '../../../services/concepto-clasificacion-almacen.service';
import { Entidad } from '../../../interfaces/entidad.interface';
import { Clasificacion } from '../../../interfaces/clasificacion.interface';
import { Concepto } from '../../../interfaces/concepto.interface';

@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.css',
})
export class ClasificacionManagerComponent {
  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);
  private conceptoClasificacionAlmacen = inject(ConceptoClasificacionAlmacen);

  public clasificasiones: Concepto[] = [];
  public selectValue: string = 'seleccionar';

  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.minLength(4)]],
  });

  public myForm2: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.minLength(4)]],
  });

  public authStatusChangedEffect = effect(async () => {
    this.actualizarConceptos();
  });

  addConcepto() {
    const { Nombre } = this.myForm2.value;

    this.conceptoClasificacionAlmacen
      .addConcepto(Nombre)
      .subscribe((success) => {
        if (success) {
          this.conceptoClasificacionAlmacen.message('Concepto Creado', true);
          this.actualizarConceptos();
        } else
          this.conceptoClasificacionAlmacen.message(
            'Concepto no Creado',
            false
          );
      });
  }

  addClasificacion() {
    const { Nombre } = this.myForm.value;

    if (this.selectValue === 'seleccionar') {
      this.conceptoClasificacionAlmacen.message(
        'Selecciona un Concepto',
        false
      );
    } else {
      const data: Clasificacion = {
        Nombre,
        IdConcepto: this.selectValue,
        IdUsuario: '2500000000',
      };

      this.conceptoClasificacionAlmacen
        .addClasificacion(data)
        .subscribe((success) => {
          if (success)
            this.conceptoClasificacionAlmacen.message(
              'Clasificacion Creada',
              true
            );
          else
            this.conceptoClasificacionAlmacen.message(
              'Clasificacion no Creada',
              false
            );
        });
    }
  }

  actualizarConceptos() {
    this.conceptoClasificacionAlmacen.AllConcepto().subscribe((list) => {
      if (list.length !== 0) {
        this.clasificasiones = list;
      }
      this.cdRef.detectChanges();
    });
    return;
  }
}
