import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, of, take } from 'rxjs';

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return of(authService.ActiveUser).pipe(
    take(1),
    map((user) => {
      if (user) return true;
      return router.createUrlTree(['/auth/login']);
    })
  );
};
