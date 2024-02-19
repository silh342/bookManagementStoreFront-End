import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, of } from 'rxjs';
import { User } from './model/user';

export const homeGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
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
      authService.user.next(null);
    })
  );
};
