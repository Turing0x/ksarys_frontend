import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterDetectDirective } from '../../../directive/character-detect.directive';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CharacterDetectDirective,
    CommonModule,
  ],
  templateUrl: './shared-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedInputComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) class: string = '';
  @Input({ required: true }) name: string = '';
  
  @Input({ required: true }) genericForm!: FormGroup;
}
