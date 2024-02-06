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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { autocomplete: autocompleResolver },
  },
  {
    path: 'books',
    component: BookComponent,
    children: [
      {
        path: '',
        component: ListBookComponent,
      },
      {
        path: 'new',
        component: AddBookComponent,
      },
      { path: ':id', component: ShowBookComponent },
      { path: ':id/edit', component: EditBookComponent },
      { path: ':id/editstock', component: EditStockComponent },
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
})
export class AppRoutingModule {}
