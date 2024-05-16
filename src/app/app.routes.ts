import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Page404Component } from './common/page-404/page-404.component';
import { authGuard } from './auth/utils/guards/auth.guard';
import { savePathGuard } from './auth/utils/guards/save-path.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    component: AuthComponent
  },
  {
    path: 'dashboard',
    canActivateChild: [savePathGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes')
        .then( m => m.DASHBOARD_ROUTES )
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Page404Component
  },
];
