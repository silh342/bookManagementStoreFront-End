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
import { authGuardFn } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './auth/http-interceptor.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books',
    component: BookComponent,
    canActivateChild: [authGuardFn],
    children: [
      {
        path: '',
        component: ListBookComponent,
        resolve: [autocompleResolver],
      },
      {
        path: 'new',
        component: AddBookComponent,
      },
      { path: ':id', component: ShowBookComponent },
      {
        path: ':id/edit',
        component: EditBookComponent,
        canActivate: [authGuardFn],
      },
      {
        path: ':id/editstock',
        component: EditStockComponent,
        canActivate: [authGuardFn],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
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
