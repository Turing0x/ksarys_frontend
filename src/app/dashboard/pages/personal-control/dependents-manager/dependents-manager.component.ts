import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dependents-manager',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dependents-manager.component.html',
  styleUrl: './dependents-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class DependentsManagerComponent { }
