import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, property: string) {
    if (value && value.length !== 0) {
      const resultArray = [];
      value.forEach(element => {
        if (element[property].toLowerCase().includes(filterString.toLowerCase())) {
          resultArray.push(element);
        }
      });
      return resultArray;
    }
    return value;
  }
}
