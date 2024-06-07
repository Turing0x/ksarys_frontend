import { Routes } from "@angular/router";

import { DashboardLayoutComponent } from "./pages/dashboard-layout/dashboard-layout.component";
import { UserManagerComponent } from "./pages/personal-control/user-manager/user-manager.component";
import { DependentsManagerComponent } from "./pages/personal-control/dependents-manager/dependents-manager.component";
import { WorkersManagerComponent } from "./pages/personal-control/workers-manager/workers-manager.component";
import { EntitiesManagerComponent } from "./pages/globla-data/entities-manager/entities-manager.component";
import { SalesComponent } from "./pages/operations/sales/sales.component";
import { ProductManagerComponent } from "./pages/products/product/product.component";
import { SaleDetailComponent } from "./pages/operations/components/sale-detail/sale-detail.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'users',
        component: UserManagerComponent,
      },
      {
        path: 'dependents',
        component: DependentsManagerComponent,
      },
      {
        path: 'workers',
        component: WorkersManagerComponent,
      },
      {
        path: 'entities',
        component: EntitiesManagerComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'products',
        component: ProductManagerComponent
      },
      {
        path: 'sale/:id',
        component: SaleDetailComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  }
]
