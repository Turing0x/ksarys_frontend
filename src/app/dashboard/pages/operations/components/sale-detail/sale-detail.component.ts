import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Sale } from '../../../../interfaces/sales.interface';
import { SalesService } from '../../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../../services/oferta.service';
import { Oferta } from '../../../../interfaces/oferta.interface';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComandaDetalles } from '../../../../interfaces/comanda-detalle.interface';
import { ComandasDetallesService } from '../../../../services/cdetalles.service';

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

  public sale!: Sale
  public cdetalles!: ComandaDetalles[];

  public listOfertas!: {
    oferta_name: string;
    oferta_cant: string;
    oferta_precio: number;
    importe: number
  }[];

  private fb = inject(FormBuilder);

  private saleService = inject(SalesService);
  private cdService = inject(ComandasDetallesService);
  private activateRoute = inject(ActivatedRoute);
  private ofertaService = inject(OfertaService);

  public ofertasResults$!: Observable<Oferta[]>;

  ngOnInit(): void {

    this.ofertasResults$ = this.ofertaService.getAllOfertas();

    this.cdService.getAllCDetalles().subscribe(cdetalles => {
      this.cdetalles = cdetalles;
    })

    this.activateRoute.params.subscribe(params => {
      this.saleService.getSaleById(params['id']).subscribe(
        sale => {
          this.sale = sale[0];
        }
      )
    })
  }

  public salesForm: FormGroup = this.fb.group({
    IdComanda: ['', Validators.required],
    IdOferta: ['', Validators.required],
    Cantidad: ['', Validators.required],
    Importe: ['', Validators.required],
    ImporteDescuento: ['', Validators.required],
    IdUsuario: ['', Validators.required],
  });

  onSubmit() {
    this.listOfertas.push({
      oferta_name: this.salesForm.value.IdOferta,
      oferta_cant: this.salesForm.value.Cantidad,
      oferta_precio: this.salesForm.value.ImporteDescuento,
      importe: this.salesForm.value.Importe
    });

    this.cdService.saveCDetalle(this.salesForm.value).subscribe()
  }


}
