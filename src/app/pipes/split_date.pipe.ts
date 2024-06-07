import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'SplitDate',
  standalone: true,
})
export class SplitDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split('T')[0];
  }

}
