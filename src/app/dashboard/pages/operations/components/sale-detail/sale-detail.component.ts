import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { Sale } from '../../../../interfaces/sales.interface';
import { SalesService } from '../../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../../services/oferta.service';
import { Oferta } from '../../../../interfaces/oferta.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComandaDetalles } from '../../../../interfaces/comanda-detalle.interface';
import { ComandasDetallesService } from '../../../../services/cdetalles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleDetailComponent implements OnInit {

  private cdRef = inject(ChangeDetectorRef);

  public sale!: Sale
  public cdetalles!: ComandaDetalles[];

  private fb = inject(FormBuilder);

  private saleService = inject(SalesService);
  private cdService = inject(ComandasDetallesService);
  private activateRoute = inject(ActivatedRoute);
  private ofertaService = inject(OfertaService);

  public ofertaslist: Oferta[] = [];

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      this.saleService.getSaleById(params['id']).subscribe(
        sale => {
          this.sale = sale[0];
          this.refreshList(this.sale.Id!);
        }
      )
    });

    this.ofertaService.getAllOfertas().subscribe(ofertas => {
      this.ofertaslist = ofertas;
      this.cdRef.detectChanges();
    });
  }

  public salesForm: FormGroup = this.fb.group({
    IdComanda: ['', Validators.required],
    IdOferta: ['', Validators.required],
    Cantidad: ['', Validators.required],
    Importe: ['', Validators.required],
    ImporteDescuento: ['', Validators.required],
    IdUsuario: ['', Validators.required],
  });

  refreshList(id: string) {
    this.cdService.getComandaDetalleByComanda(id)
      .subscribe(cdetalles => {
        this.cdetalles = cdetalles;
        this.cdRef.detectChanges();
    });
  }

  onSubmit() {

    const IdOferta = this.salesForm.controls['IdOferta'].value;
    const cantidad = this.salesForm.controls['Cantidad'].value;
    const price = this.ofertaslist.find(
      oferta => oferta.Id === IdOferta)?.Precio;
    
    const descuento = (cantidad * price!) * (this.sale.Descuento! / 100)
    
    this.salesForm.controls['Importe'].setValue(cantidad * price!);
    this.salesForm.controls['ImporteDescuento'].setValue(descuento);

    this.salesForm.controls['IdComanda'].setValue(this.sale.Id);
    this.salesForm.controls['IdUsuario'].setValue(this.sale.IdUsuario);

    this.cdService.saveCDetalle(this.salesForm.value).subscribe(
      success => {
        if (success) {
          this.refreshList(this.sale.Id!);
        }
      }
    )
  }

  onChange() {
    const select = document.getElementById("IdOferta") as HTMLSelectElement;
    this.salesForm.controls['IdOferta'].setValue(select.value);
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
        this.cdService.deleteCDetalleById(id).subscribe(
          success => {
            if (success) {
              this.refreshList(this.sale.Id!);
            }
          }
        )
      }
    });
  }

  getTotal(): number {
    return this.cdetalles.reduce((acc, cdetalle) => acc + cdetalle.Importe!, 0);
  }

}
