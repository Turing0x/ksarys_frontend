import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-data',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './loading-data.component.html',
  styleUrl: './loading-data.component.css',
})
  
export class LoadingDataComponent { }
