import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMinute'
})
export class HourMinutePipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes/60);
    const minutesLeft = minutes % 60;
    return `${hours} h ${minutesLeft < 10 ? '0': ''}${minutesLeft}`
  }
}
