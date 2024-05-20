import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[characterDetect]',
  standalone: true,
})
export class CharacterDetectDirective {

  private elementRef = inject(ElementRef);

  @HostListener('keypress', ['$event'])
  preventCharacterInput(event: KeyboardEvent) {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    if (input.classList.contains('nonNum') &&!Number.isNaN(Number(event.key))) {
      event.preventDefault();
    }
    if (input.classList.contains('onlyNum') && Number.isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }
}
