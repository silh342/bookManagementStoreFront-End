import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ShowBookComponent } from './show-book/show-book.component';
import { BookRoutingModule } from './book-routing.module';
import { ReviewComponent } from './review/review.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
    BookRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BookComponent,
    ListBookComponent,
    AddBookComponent,
    ShowBookComponent,
    EditBookComponent,
    EditStockComponent,
    FavoriteComponent,
    ReviewComponent,
],
})
export class BookModule {}
