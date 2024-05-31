import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Clasification } from './../../../interfaces/clasifications.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, tap, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { CharacterDetectDirective } from '../../../../directive/character-detect.directive';
import { Concept } from '../../../interfaces/concepts.interface';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { Measure } from '../../../interfaces/measure.interface';
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../../../services/product.service';
import { SharedInputComponent } from '../../../../shared/components/shared-input/shared-input.component';
import { SharedSelectComponent } from '../../../../shared/components/shared-select/shared-select.component';
import { Store } from '../../../interfaces/store.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CharacterDetectDirective,
    CommonModule,
    EmptyListComponent,
    FormsModule,
    LoadingDataComponent,
    ReactiveFormsModule,
    SharedInputComponent,
    SharedSelectComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductManagerComponent {

  private destroy$ = new Subject<void>();

  loadingData: boolean | undefined = true;
  editing: boolean = false;

  private cdRef = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  private productService = inject(ProductsService)

  public productSelectResults$!: Observable<any[]>;
  public productsList: Product[] = [];
  public productsListSave: Product[] = [];

  public conceptoResults: Concept[] = [];
  public storeResults: Store[] = [];
  public clasificationResults: Clasification[] = [];
  public clasificationResultsFilter: Clasification[] = [];
  public meansureResults: Measure[] = [];


  public productForm: FormGroup = this.fb.group({
    Id: [''],
    IdClasificacion: ['', [Validators.required, Validators.minLength(1)]],
    Codigo: ['', [Validators.required, Validators.min(1)]],
    Nombre: ['', [Validators.required, Validators.minLength(1)]],
    IdConcepto: ['', [Validators.required, Validators.minLength(1)]],
    IdAlmacen: ['', [Validators.required, Validators.minLength(1)]],
    IdUm: ['', [Validators.required, Validators.minLength(1)]],
    Precio: ['', [Validators.required, Validators.minLength(1)]],
    FactorConversion: [1, [Validators.required, Validators.min(1)]],
    Fecha: [new Date(), Validators.required],
  });

  public productFormFilter: FormGroup = this.fb.group({
    IdClasificacion: [''],
    IdConcepto: [''],
  })

  public authStatusChangedEffect = effect(async () => {

    this.refreshSaleList();
    this.productSelectResults$ = this.productService.getAllProductsSelect();
    this.productSelectResults$.subscribe(
      (products: any[]) => {
        this.clasificationResults = products[0];
        this.clasificationResultsFilter = products[0];
        this.conceptoResults = products[1];
        this.storeResults = products[2];
        this.meansureResults = products[3];
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );


    this.cdRef.detectChanges();
  }
  )

  async onSubmit() {

    if (this.productForm.invalid)
      await Swal.fire('Error', 'Complete todos los campos', 'error')
    else
      Swal.fire({
        title: "Estás seguro?",
        text: "Desea crear un Producto con la información antes brindada?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          if (!this.editing) {
            this.productService.saveProducts(this.productForm.value).pipe(
              tap((resp) => this.handleSuccessfulResponse(resp.success))
            ).subscribe();
          } else {
            this.productService.updateProducts(this.productForm.value).pipe(
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
        this.productService.deleteProductById(id.toString()).subscribe(
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
    this.productService.getAllProductsTable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        list => {
          if (list.length !== 0) {

            this.productsList = list;
            this.productsListSave = this.productsList;

            const tipoEspecifico = 'OTROS                                             '
            this.productsList.sort((a, b) => {
              if (a.Concepto! === tipoEspecifico && b.Concepto! !== tipoEspecifico) {
                return 1;
              }
              if (a.Concepto! !== tipoEspecifico && b.Concepto! === tipoEspecifico) {
                return -1;
              }
              if (a.Concepto! < b.Concepto!) {
                return -1;
              }
              if (a.Concepto! > b.Concepto!) {
                return 1;
              }
              return 0;
            });

          } else {
            this.loadingData = undefined;
          }
          this.loadingData = false;
          this.cdRef.detectChanges();
        }
      )
  }

  putTuEdit(product: Product, edit = false) {
    if (!edit) {
      this.editing = false;
      Object.entries(product).forEach(value => {
        if (this.productForm.contains(value[0])) {
          this.productForm.controls[value[0]]
            .setValue(value[1])
        }
      })
      this.productForm.disable()
    } else {
      this.editing = true;
      this.productForm.enable()
      Object.entries(product).forEach(value => {
        if (this.productForm.contains(value[0])) {
          this.productForm.controls[value[0]]
            .setValue(value[1])
        }
      })
    }
  }

  resetForm() {
    this.editing = false;
    this.productForm.reset();
    this.productForm.enable();
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

  filterProduct(status: boolean = false) {

    this.productsList = this.productsListSave;
    if (status) {
      this.productFormFilter.controls['IdConcepto'].setValue('')
      this.cdRef.detectChanges();
    }
    const { IdConcepto } = this.productFormFilter.value;

    if (IdConcepto != '' && IdConcepto != 'all') this.productsList = this.productsList.filter(p => (p.IdConcepto === IdConcepto));

    this.cdRef.detectChanges();

  }


}
