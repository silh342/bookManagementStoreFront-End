import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

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
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
