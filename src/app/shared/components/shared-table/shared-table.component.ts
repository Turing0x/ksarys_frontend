import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoadingDataComponent } from '../../../common/loading-data/loading-data.component';
import { EmptyListComponent } from '../../../common/empty-list/empty-list.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
  ],
  templateUrl: './shared-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedTableComponent {
  @Input({ required: true }) tableCaption!: string;
  @Input({ required: true }) genericList!: any[];
  @Input({ required: true }) genericForm!: FormGroup;

  @Input({ required: true }) trList!: string[];
}
