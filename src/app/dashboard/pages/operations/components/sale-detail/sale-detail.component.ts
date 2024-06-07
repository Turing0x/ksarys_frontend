import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Sale } from '../../../../interfaces/sales.interface';
import { SalesService } from '../../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleDetailComponent implements OnInit {

  public sale!: Sale

  private saleService = inject(SalesService);
  private activateRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.saleService.getSaleById(params['id']).subscribe(
        sale => {
          this.sale = sale[0];
        }
      )
    })
  }
}
