import { Pipe, PipeTransform } from '@angular/core';
import { distanceInWordsToNow } from 'date-fns';
@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: number | string | Date): any {
    return value ? distanceInWordsToNow(new Date(value)) : '';
  }

}
