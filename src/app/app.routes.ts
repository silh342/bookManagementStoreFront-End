import { Routes } from '@angular/router';
import { homeGuardFn } from './auth/guards/home.guard';
import { authGuardFn } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';
import { loginGuard } from './auth/guards/login.guard';
import { HomeComponent } from './home/home.component';
import { ManagerUsersComponent } from './manager-users/manager-users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuardFn],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./book/book.route').then((mod) => mod.bookRoutes),
    canActivateChild: [authGuardFn],
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./author/author.route').then((mod) => mod.authorRoutes),
    canActivate: [authGuardFn],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.route').then((mod) => mod.authRoutes),
    canActivateChild: [loginGuard],
  },
  {
    path: 'manageusers',
    component: ManagerUsersComponent,
    canActivate: [authGuardFn, adminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
