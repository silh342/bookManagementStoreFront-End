import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of } from 'rxjs';
import { User } from '../model/user';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const errorService = inject(MessageLoggingService);
  const authenticatedUser: User = authService.getUserFromToken(
    sessionStorage.getItem('user_token')
  );

  return of(authenticatedUser.role.includes('ROLE_ADMIN')).pipe(
    map((isAdmin) => {
      if (isAdmin) return true;
      errorService.errorMessage.next({
        message: 'You are not allowed to visit the entered URL',
      });
      return router.createUrlTree(['/books']);
    })
  );
};
