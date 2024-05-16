import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-entities-manager',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './entities-manager.component.html',
  styleUrl: './entities-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class EntitiesManagerComponent { }
