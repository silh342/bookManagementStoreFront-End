import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { ShowBookComponent } from './book/show-book/show-book.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { EditStockComponent } from './book/edit-stock/edit-stock.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmationDialogComponent } from './utils/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ValidateInputDirective } from './directives/validate-input.directive';
import { AuthorComponent } from './author/author.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { EditAuthorComponent } from './author/edit-author/edit-author.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReviewComponent } from './book/review/review.component';
import { ErrorComponent } from './error/error.component';
import { FavoriteComponent } from './book/favorite/favorite.component';
import { ManagerUsersComponent } from './manager-users/manager-users.component';
import { SearchHighlightPipe } from './author/search-highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HeaderComponent,
    AuthComponent,
    HomeComponent,
    FooterComponent,
    ListBookComponent,
    ShowBookComponent,
    EditBookComponent,
    EditStockComponent,
    AddBookComponent,
    LoginComponent,
    SignUpComponent,
    ConfirmationDialogComponent,
    ValidateInputDirective,
    AuthorComponent,
    AuthorListComponent,
    EditAuthorComponent,
    ReviewComponent,
    ErrorComponent,
    FavoriteComponent,
    ManagerUsersComponent,
    SearchHighlightPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgxPaginationModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
