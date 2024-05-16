import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagerComponent { }
