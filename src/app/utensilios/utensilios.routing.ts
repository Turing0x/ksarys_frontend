import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddComponent } from './components/add/add.component';


export const UtensiliosRoutes: Routes = [{
  path: '',
  // component: LayoutComponent,
  children:[
    {
      path: 'add',
      component: AddComponent,
    }
  ]
}
];
