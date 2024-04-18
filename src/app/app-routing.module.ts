import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './auth/services/http-interceptor.service';
import { homeGuardFn } from './auth/guards/home.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuardFn],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./book/book.module').then((module) => module.BookModule),
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./author/author.module').then((module) => module.AuthorModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'manageusers',
    loadChildren: () =>
      import('./manager-users/manage-users.module').then(
        (module) => module.ManageUsersModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
