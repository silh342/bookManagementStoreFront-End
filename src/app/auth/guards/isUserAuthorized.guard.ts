import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of, take } from 'rxjs';
import { User } from '../model/user';
import { MessageLoggingService } from '../../utils/messageLogging.service';

export const isUserAuthorized: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const errorService = inject(MessageLoggingService);
  const router = inject(Router);
  const user = authService.getUserFromToken(
    sessionStorage.getItem('user_token')
  );
  if (authService.isUserAuthorized(['ROLE_USER', 'ROLE_ADMIN'], user)) {
    return of(true);
  }
  errorService.errorMessage.next({
    status: 'UNAUTHORIZED ACCESS',
    message: 'Sorry You are not allowed to visit the entered url',
  });
  return router.createUrlTree(['/books']);
};
