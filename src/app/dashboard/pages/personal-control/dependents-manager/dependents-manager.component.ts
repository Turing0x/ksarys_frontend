import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { environment } from '../../../../../environments/environment.development';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { Dependent } from '../../../interfaces/dependents';
import { DependentsService } from '../../../services/dependents.service';
import { CharacterDetectDirective } from '../../../../directive/character-detect.directive';

@Component({
  selector: 'app-dependents-manager',
  standalone: true,
  imports: [
    CharacterDetectDirective,
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './dependents-manager.component.html',
})
  
export class DependentsManagerComponent {

  private destroy$ = new Subject<void>();

  private userService = inject(DependentsService);
  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  loading_data: boolean | undefined = true;

  public roles = environment.roles;
  roles_list = Object.entries(this.roles);

  public dependentsList: Dependent[] = [];
  public dependentForm: FormGroup = this.fb.group({
    IdAreaEntidad: ['', [Validators.required, Validators.minLength(3)]],
    Nombre: ['', [Validators.required, Validators.minLength(5)]],
    Activo: [10, Validators.required],
  });

  ngOnInit(): void {
    this.refreshDependentList();
  }

  onSubmit() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Desea registrar un dependiente con la información antes brindada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.saveDependent(this.dependentForm.value).subscribe(
          response => {
            if (!response.success) {
              Swal.fire('Registro de Usuarios',
              response.api_message, 'error');
              return;
            }
            
            this.dependentForm.reset();
            this.refreshDependentList();
          }
        );
      }
    });
  }

  changeActive(dependent: Dependent) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción cambiará el acceso al sistema de este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cámbialo!"
    }).then((result) => {
      if (result.isConfirmed) {
        const modify: Dependent = {...dependent, Activo: !dependent.Activo }
        this.userService.changeActive(modify).subscribe(
          success => {
            if (success) {
              this.refreshDependentList();
            }
          }
        )
      }
    });
  } 

  deleteDependent(id: string) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción eliminará por completo al usuario del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteDependentById(id).subscribe(
          success => {
            if (success) {
              this.refreshDependentList();
            }
          }
        )
      }
    });
  }

  refreshDependentList() {
    this.userService.getAllDependents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        list => {
          if (list.length !== 0) {
            this.loading_data = false;
            this.dependentsList = list;
          } else {
            this.loading_data = undefined;
          }
          this.cdRef.detectChanges();
        }
    )
  }

  onChangeCat() {
    const select = document.getElementById("role-types") as HTMLSelectElement;
    const access_level =
      Object.entries(this.roles)
        .find(([key]) => key === select.value)![1];
    
    this.dependentForm.controls['NivelAcceso'].setValue(access_level);
    this.dependentForm.controls['Cargo'].setValue(select.value);
  }

  putTuEdit(dependent: Dependent) {
    this.dependentForm.controls['IdAreaEntidad'].setValue(dependent.IdAreaEntidad)
    this.dependentForm.controls['Nombre'].setValue(dependent.Nombre)
    this.dependentForm.controls['Activo'].setValue(dependent.Activo)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
