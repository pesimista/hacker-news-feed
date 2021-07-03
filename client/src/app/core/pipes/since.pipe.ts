import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'since',
})
export class SincePipe implements PipeTransform {
  millisecondsPerDay = 86400000;
  datePipe = new DatePipe('en-US');

  transform(value: Date, now: Date, ...args: unknown[]): string {
    if (now.toDateString() === value.toDateString()) {
      return this.datePipe.transform(value, 'shortTime') as string;
    }

    const diff = now.getTime() - value.getTime();
    if (diff < this.millisecondsPerDay * 2) {
      return 'yesterday';
    }

    return this.datePipe.transform(value, 'mediumDate') as string;
  }
}
