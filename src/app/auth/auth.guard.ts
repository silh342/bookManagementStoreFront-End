import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, of, take } from 'rxjs';
import { User } from './model/user';

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return of(authService.isAuthenticated()).pipe(
    map((isAuth) => {
      if (isAuth) {
        const authenticatedUser: User = authService.getUserFromToken(
          sessionStorage.getItem('user_token')
        );
        authService.user.next(authenticatedUser);
        return true;
      }
      return router.createUrlTree(['/auth/login']);
    })
  );
};
