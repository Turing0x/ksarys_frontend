import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Observable, tap, takeUntil, of } from 'rxjs';
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
import { EntiyArea } from '../../../interfaces/entityArea.interface';
import { SplitDatePipe } from '../../../../pipes/split_date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CharacterDetectDirective,
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule,
    SplitDatePipe
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
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
  private router = inject(Router);

  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  public dpaResults$!: Observable<ServerRespDPA>;
  public prodResults$!: Observable<Product[]>;
  public depResults$!: Observable<Dependent[]>;
  public entityAreaResult$!: Observable<EntiyArea[]>;

  public salesList: Sale[] = [];
  public salesForm: FormGroup = this.fb.group({
    Id: ['', Validators.required],
    Fecha: [Date.now(), Validators.required],
    Mesa: ['', Validators.required],
    Personas: ['', Validators.required],
    IdDependiente: ['', Validators.required],
    Descuento: ['', Validators.required],
    Producto: ['', Validators.required],
    Observaciones: ['', Validators.required],
  });

  ngOnInit(): void {
    this.refreshSaleList();
    this.dpaResults$ = this.dpaService.getAllDPAS();
    this.prodResults$ = this.productService.getAllProducts();
    this.depResults$ = this.dependetService.getAllDependents();
  }

  onSubmit() {

    const mesa = this.salesForm.get('Mesa')?.value;
    const exist = this.salesList.some(sale => sale.Mesa?.toString() === mesa.toString());

    if (exist) {
      Swal.fire({
        title: "Mesa ocupada",
        text: "Ya existe una comanda con esta mesa",
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Estás seguro?",
        text: "Desea crear una comanda con la información antes brindada?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          if (!this.editing) {
            this.salesService.saveSale(this.salesForm.value).pipe(
              tap((resp) => this.handleSuccessfulResponse(resp.success))
            ).subscribe();
          } else {
            this.salesService.editSale(this.salesForm.value).pipe(
              tap((resp) => this.handleSuccessfulResponse(resp.success))
            ).subscribe();
          }
        }
      });

    }
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
        if (this.salesForm.contains(value[0])) {
          this.salesForm.controls[value[0]]
          .setValue(value[1])
        }
      })
      this.salesForm.disable()
    } else {
      this.editing = true;
      this.salesForm.enable()
      Object.entries(entity).forEach(value => {
        if (this.salesForm.contains(value[0])) {
          this.salesForm.controls[value[0]]
          .setValue(value[1])
        }
      })
    }
  }

  onRowClick(id: string) {
    this.router.navigate(['/dashboard/sale', id]);
  }

  resetForm() {
    this.editing = false;
    this.salesForm.reset();
    this.salesForm.enable();
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