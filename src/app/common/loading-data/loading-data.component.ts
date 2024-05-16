import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-data',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loading-data.component.html',
  styleUrl: './loading-data.component.css',
})
  
export class LoadingDataComponent { }
