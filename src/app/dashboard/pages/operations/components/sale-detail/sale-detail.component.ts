import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Sale } from '../../../../interfaces/sales.interface';
import { SalesService } from '../../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../../services/oferta.service';
import { Oferta } from '../../../../interfaces/oferta.interface';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  private fb = inject(FormBuilder);

  private saleService = inject(SalesService);
  private activateRoute = inject(ActivatedRoute);
  private ofertaService = inject(OfertaService);

  public ofertasResults$!: Observable<Oferta[]>;

  ngOnInit(): void {

    this.ofertasResults$ = this.ofertaService.getAllOfertas();

    this.activateRoute.params.subscribe(params => {
      this.saleService.getSaleById(params['id']).subscribe(
        sale => {
          this.sale = sale[0];
        }
      )
    })
  }

  public salesForm: FormGroup = this.fb.group({
    Id: ['', Validators.required],
    Fecha: [Date.now(), Validators.required],
    Mesa: ['', Validators.required],
  });


}
