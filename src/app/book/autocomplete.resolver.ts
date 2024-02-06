import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedDataService } from './shared/sharedData.service';
import { inject } from '@angular/core';

export const autocompleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(SharedDataService).shareData();
};
