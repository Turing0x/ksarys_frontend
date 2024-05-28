import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './shared-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedSelectComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) genericList: any[] = [];

  @Input({ required: true }) genericForm!: FormGroup;

}
