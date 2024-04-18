import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight',
})
export class SearchHighlightPipe implements PipeTransform {
  transform(value: string, searchText: string): string {
    // if input is empty returns the given text val
    if (searchText === '') return value;
    const expression = new RegExp(searchText, 'gi');
    return value.toString().replace(expression, '<mark>$&</mark>');
  }
}
