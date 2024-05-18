import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { DpaService } from '../../../services/dpa.service';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { EntitesService } from '../../../services/entites.service';
import { Entity } from '../../../interfaces/entity.interface';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { ServerRespDPA } from '../../../interfaces/server-resp.interface';

@Component({
  selector: 'app-entities-manager',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './entities-manager.component.html',
})
export class EntitiesManagerComponent implements OnDestroy, OnInit, AfterViewInit{
  
  private destroy$ = new Subject<void>();

  loadingData: boolean | undefined = true;
  editing: boolean = false;
  
  private entitiesService = inject(EntitesService);
  private dpaService = inject(DpaService);

  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  public dpaResults$!: Observable<ServerRespDPA>;

  public entitiesList: Entity[] = [];
  public entityForm: FormGroup = this.fb.group({
    Id: ['', Validators.required],
    Codigo: ['', Validators.required],
    Nombre: ['', Validators.required],
    Municipio: ['', Validators.required],
    Direccion: ['', Validators.required],
    Director: ['', Validators.required],
    Actividad: ['', Validators.required],
    Cuenta: ['', Validators.required],
    NIT: ['', Validators.required],
    IdDpa: 0,
  });

  ngOnInit(): void {
    this.refreshEntityList();
    this.dpaResults$ = this.dpaService.getAllDPAS();
  }

  ngAfterViewInit(): void {
    this.addNumberPreventionListener();
  }

  onSubmit() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Desea crear una entidad con la información antes brindada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.editing) {
          this.entitiesService.saveEntity(this.entityForm.value).pipe(
            tap((resp) => this.handleSuccessfulResponse(resp.success))
          ).subscribe();
        } else {
          this.entitiesService.editEntity(this.entityForm.value).pipe(
            tap((resp) => this.handleSuccessfulResponse(resp.success))
          ).subscribe();
        }
      }
    });
  }

  deleteEntity(id: string) {
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
        this.entitiesService.deleteEntityById(id.toString()).subscribe(
          success => {
            if (success) {
              this.refreshEntityList();
            }
          }
        )
      }
    });
  }

  refreshEntityList() {
    this.entitiesService.getAllEntities()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      list => {
        if (list.length !== 0) {
          this.loadingData = false;
          this.entitiesList = list;
        } else {
          this.loadingData = undefined;
        }
        this.cdRef.detectChanges();
      }
    )
  }

  putTuEdit(entity: Entity, edit = false) {
    if (!edit) {
      this.editing = false;
      Object.entries(entity).forEach(value => {
        if (this.entityForm.contains(value[0])) {
          this.entityForm.controls[value[0]]
          .setValue(value[1])
        }
      })
      this.entityForm.disable()
    } else {
      this.editing = true;
      this.entityForm.enable()
      Object.entries(entity).forEach(value => {
        if (this.entityForm.contains(value[0])) {
          this.entityForm.controls[value[0]]
          .setValue(value[1])
        }
      })
    }
  }

  resetForm() {
    this.editing = false;
    this.entityForm.reset();
    this.entityForm.enable();
  }

  onChangeDPA() {
    const select = document.getElementById("dpa-name") as HTMLSelectElement;
    this.entityForm.controls['Municipio'].setValue(select.value);
  }

  addNumberPreventionListener() {
    const inputs = document.querySelectorAll('.nonNum,.onlyNum') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      input.addEventListener('keypress', (e: KeyboardEvent) => {
        if (input.classList.contains('nonNum') &&!Number.isNaN(Number(e.key))) {
          e.preventDefault();
        }
        if (input.classList.contains('onlyNum') && Number.isNaN(Number(e.key))) {
          e.preventDefault();
        }
      });
    });
  }

  private handleSuccessfulResponse(success: boolean) {
    if (success) {
      this.refreshEntityList();
      this.resetForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
