import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dependents-register',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dependents-register.component.html',
  styleUrl: './dependents-register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependentsRegisterComponent { }
