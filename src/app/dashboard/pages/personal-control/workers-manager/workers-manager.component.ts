import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { environment } from '../../../../../environments/environment.development';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { WorkerService } from '../../../services/worker.service';
import { SysWorker } from '../../../interfaces/worker';
import { CharacterDetectDirective } from '../../../../directive/character-detect.directive';

@Component({
  selector: 'app-workers-manager',
  standalone: true,
  imports: [
    CharacterDetectDirective,
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './workers-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersManagerComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$ = new Subject<void>();

  private workerService = inject(WorkerService);
  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  loading_data: boolean | undefined = true;

  public roles = environment.roles;
  roles_list = Object.entries(this.roles);

  public userList: SysWorker[] = [];
  public userForm: FormGroup = this.fb.group({
    CI: ['', [Validators.required, Validators.minLength(3)]],
    Nombre: ['', [Validators.required, Validators.minLength(5)]],
    IdTipo: ['', [Validators.required, Validators.minLength(5)]],
    IdCargo: ['', Validators.required],
    Telefono: ['', [Validators.required, Validators.minLength(5)]],
    Salario: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    this.refreshUserList();
  }

  ngAfterViewInit(): void {
    this.addNumberPreventionListener();
  }

  onSubmit() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Desea crear un usuario con la información antes brindada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.workerService.saveUser(this.userForm.value).subscribe(
          response => {
            if (!response.success) {
              Swal.fire('Registro de Usuarios',
              response.api_message, 'error');
              return;
            }
            
            this.userForm.reset();
            this.refreshUserList();
          }
        );
      }
    });
  }

  changeActive(worker: SysWorker) {
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
        const modify: SysWorker = { Id: worker.Id };
        this.workerService.changeActive(modify).subscribe(
          success => {
            if (success) {
              this.refreshUserList();
            }
          }
        )
      }
    });
  } 

  deleteUser(id: string) {
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
        this.workerService.deleteUserById(id).subscribe(
          success => {
            if (success) {
              this.refreshUserList();
            }
          }
        )
      }
    });
  }

  refreshUserList() {
    this.workerService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        list => {
          if (list.length !== 0) {
            this.loading_data = false;
            this.userList = list;
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
    
    this.userForm.controls['NivelAcceso'].setValue(access_level);
    this.userForm.controls['Cargo'].setValue(select.value);
  }

  putTuEdit(worker: SysWorker) {
    this.userForm.controls['CI'].setValue(worker.CI)
    this.userForm.controls['Nombre'].setValue(worker.Nombre)
    this.userForm.controls['IdTipo'].setValue(worker.IdTipo)
    this.userForm.controls['IdCargo'].setValue(worker.IdCargo)
    this.userForm.controls['Telefono'].setValue(worker.Telefono)
    this.userForm.controls['Salario'].setValue(worker.Salario)
  }

  addNumberPreventionListener() {
    const inputs = document.querySelectorAll('.nonNum,.onlyNum') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      input.addEventListener('keypress', (e: KeyboardEvent) => {
        if (input.classList.contains('nonNum') &&!Number.isNaN(Number(e.key))) {
          e.preventDefault();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
