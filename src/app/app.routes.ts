import { Routes } from '@angular/router';
import { LayoutComponent } from './utensilios/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: 'utensilios',
    loadChildren: () => import('./utensilios/utensilios.module').then( m => m.UtensiliosModule)
  }
];
