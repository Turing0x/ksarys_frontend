import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workers-manager',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './workers-manager.component.html',
  styleUrl: './workers-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class WorkersManagerComponent { }
