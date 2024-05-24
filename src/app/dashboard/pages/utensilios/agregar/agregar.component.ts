import {
  ChangeDetectorRef,
  Component,
  HostListener,
  effect,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Environments } from '../../../../environments/env';
import { GetUtenciliosTipo } from '../../../interfaces/getUtensilioTipos.interface';
import { UtensiliosServices } from '../../../services/utensilios.service';
import { UtensilioPost } from '../../../interfaces/utensilioPost.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css',
})
export class AgregarManagerComponent {

  private cdRef = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private utenciliosService = inject(UtensiliosServices);

  public utensiliosTipos: GetUtenciliosTipo[] = [];
  public selectValue: string = 'seleccionar';
  public Importe = 0;

  isNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value)) {
        return { notNumber: true };
      }
      return null;
    };
  }

  public myForm: FormGroup = this.fb.group({
    Descripcion: ['', Validators.required],
    Cantidad: [0, [Validators.required, this.isNumber(), Validators.min(1)]],
    Precio: [0, [Validators.required, this.isNumber(), Validators.min(1)]],
  });

  public authStatusChangedEffect = effect(async () => {
    this.utenciliosService.ObtenerUtensiliosTipos().subscribe((list) => {
      if (list.length !== 0) {
        this.utensiliosTipos = list;
      }
      this.cdRef.detectChanges();
    });
    return;
  });

  async addUtensilios() {
    const { Descripcion, Cantidad , Precio} = this.myForm.value;


    if(this.selectValue === 'seleccionar' || Descripcion.length < 4) {
      if( this.selectValue === 'seleccionar') this.utenciliosService.message('Selecciona un tipo de Utensilio', false);
      else this.utenciliosService.message('La descripcion es muy breve', false);
    }
    else{
      const utensilio: UtensilioPost = {
        Nombre: Descripcion,
        Cantidad,
        // Precio: this.Importe,
        Precio,
        IdTipo: this.selectValue,
      };

      this.utenciliosService.addUtensilios(utensilio).subscribe((success) => {
        if (success) this.utenciliosService.message('Utensilio Creado', true);
        else this.utenciliosService.message('Utensilio no Creado', false);
      });
      return;
    }


  }

  @HostListener('input', ['$event'])
  calcularImporte() {
    this.Importe = this.myForm.value.Cantidad * this.myForm.value.Precio;
  }


}
