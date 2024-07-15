import { Routes } from '@angular/router';
import { ListBookComponent } from './list-book/list-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { isUserAuthorized } from '../auth/guards/isUserAuthorized.guard';
import { autocompleResolver } from './autocomplete.resolver';
import { FavoriteComponent } from './favorite/favorite.component';
import { ShowBookComponent } from './show-book/show-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { authGuardFn } from '../auth/guards/auth.guard';
import { EditStockComponent } from './edit-stock/edit-stock.component';

export const bookRoutes: Routes = [
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
  {
    path: 'favorites/:username',
    component: FavoriteComponent,
  },
  {
    path: ':id',
    component: ShowBookComponent,
  },
  {
    path: ':id/edit',
    component: EditBookComponent,
    canActivate: [authGuardFn, isUserAuthorized],
    resolve: [autocompleResolver],
  },
  {
    path: ':id/editstock',
    component: EditStockComponent,
    canActivate: [authGuardFn, isUserAuthorized],
  },
];
