import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Observable, tap, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ServerRespDPA } from '../../../../../assets/globals/server-resp.interface';
import { DpaService } from '../../../services/dpa.service';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { CharacterDetectDirective } from '../../../../directive/character-detect.directive';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../interfaces/sales.interface';
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../../../services/product.service';
import { Dependent } from '../../../interfaces/dependents';
import { DependentsService } from '../../../services/dependents.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CharacterDetectDirective,
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();

  loadingData: boolean | undefined = true;
  editing: boolean = false;

  private salesService = inject(SalesService);
  private productService = inject(ProductsService);
  private dependetService = inject(DependentsService);
  private dpaService = inject(DpaService);

  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  public dpaResults$!: Observable<ServerRespDPA>;
  public prodResults$!: Observable<Product[]>;
  public depResults$!: Observable<Dependent[]>;

  public salesList: Sale[] = [];
  public entityForm: FormGroup = this.fb.group({
    Id: ['', Validators.required],
    Fecha: [Date.now(), Validators.required],
    Mesa: ['1', Validators.required],
    Personas: ['1', Validators.required],
    IdDependiente: ['', Validators.required],
    Descuento: ['', Validators.required],
    Producto: ['', Validators.required],
    prod_cant: ['', Validators.required],
  });

  ngOnInit(): void {
    this.refreshSaleList();
    this.dpaResults$ = this.dpaService.getAllDPAS();
    this.prodResults$ = this.productService.getAllProducts();
    this.depResults$ = this.dependetService.getAllDependents();
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
          this.salesService.saveSale(this.entityForm.value).pipe(
            tap((resp) => this.handleSuccessfulResponse(resp.success))
          ).subscribe();
        } else {
          this.salesService.editSale(this.entityForm.value).pipe(
            tap((resp) => this.handleSuccessfulResponse(resp.success))
          ).subscribe();
        }
      }
    });
  }

  deleteSale(id: string) {
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
        this.salesService.deleteSaleById(id.toString()).subscribe(
          success => {
            if (success) {
              this.refreshSaleList();
            }
          }
        )
      }
    });
  }

  refreshSaleList() {
    this.salesService.getAllSales()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      list => {
        if (list.length !== 0) {
          this.loadingData = false;
          this.salesList = list;
        } else {
          this.loadingData = undefined;
        }
        this.cdRef.detectChanges();
      }
    )
  }

  putTuEdit(entity: Sale, edit = false) {
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

  private handleSuccessfulResponse(success: boolean) {
    if (success) {
      this.refreshSaleList();
      this.resetForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
