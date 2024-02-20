import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of } from 'rxjs';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return of(authService.isAuthenticated()).pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) return true;
      const user = authService.getUserFromToken(
        sessionStorage.getItem('user_token')
      );
      authService.user.next(user);
      return router.createUrlTree(['/']);
    })
  );
};
