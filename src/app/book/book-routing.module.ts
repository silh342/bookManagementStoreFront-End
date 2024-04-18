import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { authGuardFn } from '../auth/guards/auth.guard';
import { isUserAuthorized } from '../auth/guards/isUserAuthorized.guard';
import { AddBookComponent } from './add-book/add-book.component';
import { autocompleResolver } from './autocomplete.resolver';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ListBookComponent } from './list-book/list-book.component';
import { ShowBookComponent } from './show-book/show-book.component';

const routes: Routes = [
  {
    path: '',
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
      {
        path: 'favorites/:username',
        component: FavoriteComponent,
      },
      { path: ':id', component: ShowBookComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
