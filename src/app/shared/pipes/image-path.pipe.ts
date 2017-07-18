import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'imagePath'
})
export class ImagePathPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!value) {
      return '';
    }
    if (!value.startsWith('http')) {
      value = `${environment.webApiUrl}/${value.split('\\').join('/')}`;
    }
    return value;
  }

}
