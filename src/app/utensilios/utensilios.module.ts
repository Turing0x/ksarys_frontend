import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { RouterModule } from '@angular/router';
import { UtensiliosRoutes } from './utensilios.routing';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UtensiliosRoutes)
  ]
})
export class UtensiliosModule { }
