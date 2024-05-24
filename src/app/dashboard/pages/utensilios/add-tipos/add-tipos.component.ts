import { Component, inject } from '@angular/core';

  import { FormBuilder, FormGroup, Validators ,FormsModule,  ReactiveFormsModule,  } from '@angular/forms';
import { UtensiliosServices } from '../../../services/utensilios.service';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-add-tipos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './add-tipos.component.html',
  styleUrl: './add-tipos.component.css'
})
export class AddTiposManagerComponent {
  private fb = inject(FormBuilder);
  private utenciliosService = inject(UtensiliosServices);



  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required,  Validators.minLength(4)]],
  });


  addUtensiliosTipo(){
    const { Nombre } = this.myForm.value;

    this.utenciliosService.addUtensiliosTipos(Nombre).subscribe((success) => {
      if (success) this.utenciliosService.message('Tipo de Utensilio Creado', true);
      else this.utenciliosService.message('Tipo de Utensilio no Creado', false);
    });
  }

}
