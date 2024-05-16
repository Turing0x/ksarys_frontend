import { Routes } from "@angular/router";

import { DashboardLayoutComponent } from "./pages/dashboard-layout/dashboard-layout.component";
import { UserManagerComponent } from "./pages/personal-control/user-manager/user-manager.component";
import { DependentsManagerComponent } from "./pages/personal-control/dependents-manager/dependents-manager.component";
import { WorkersManagerComponent } from "./pages/personal-control/workers-manager/workers-manager.component";

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
        path: '**',
        redirectTo: 'users'
      }
    ]
  }
]