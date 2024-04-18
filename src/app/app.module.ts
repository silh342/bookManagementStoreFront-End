import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { SearchHighlightPipe } from './shared/pipes/search-highlight.pipe';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { SharedModule } from './shared/shared.module';
import { ManageUsersModule } from './manager-users/manage-users.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BookModule,
    AuthorModule,
    SharedModule,
    ManageUsersModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, SearchHighlightPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
