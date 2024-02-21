import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { ShowBookComponent } from './book/show-book/show-book.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { EditStockComponent } from './book/edit-stock/edit-stock.component';
import { HomeComponent } from './home/home.component';
import { autocompleResolver } from './book/autocomplete.resolver';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { authGuardFn } from './auth/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './auth/services/http-interceptor.service';
import { AuthorComponent } from './author/author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { loginGuard } from './auth/guards/login.guard';
import { homeGuardFn } from './auth/guards/home.guard';
import { isUserAuthorized } from './auth/guards/isUserAuthorized.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [homeGuardFn],
  },
  {
    path: 'books',
    component: BookComponent,
    canActivateChild: [authGuardFn],
    children: [
      {
        path: '',
        component: ListBookComponent,
      },
      {
        path: 'new',
        component: AddBookComponent,
        canActivate: [isUserAuthorized],
        resolve: [autocompleResolver],
      },
      { path: ':id', component: ShowBookComponent },
      {
        path: ':id/edit',
        component: EditBookComponent,
        canActivate: [authGuardFn, isUserAuthorized],
      },
      {
        path: ':id/editstock',
        component: EditStockComponent,
        canActivate: [authGuardFn, isUserAuthorized],
      },
    ],
  },
  {
    path: 'authors',
    component: AuthorComponent,
    canActivateChild: [authGuardFn],
    children: [{ path: '', component: AuthorListComponent }],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivateChild: [loginGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
