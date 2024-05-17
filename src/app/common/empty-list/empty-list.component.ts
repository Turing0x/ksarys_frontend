import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-empty-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterModule
  ],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.css',
})
  
export class EmptyListComponent {
}
