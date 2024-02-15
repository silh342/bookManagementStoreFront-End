import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedDataService } from './shared/sharedData.service';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

export const autocompleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sharedDataService = inject(SharedDataService);
  return sharedDataService.shareData().pipe(
    map(({ authors, categories }) => {
      sharedDataService.authorOptions = authors.map(
        (author) => author.fullName
      );
      sharedDataService.categoryOptions = categories.map(
        (category) => category.categoryName
      );
    }),
    catchError((err) => throwError(() => console.log('Error Fetching data')))
  );
};
