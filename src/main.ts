import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './app/auth/auth.module';
import { ManageUsersModule } from './app/manager-users/manage-users.module';
import { AuthorModule } from './app/author/author.module';
import { BookModule } from './app/book/book.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SearchHighlightPipe } from './app/shared/pipes/search-highlight.pipe';
import { DatePipe } from '@angular/common';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, RouterModule, BookModule, AuthorModule, ManageUsersModule, AuthModule, FormsModule, ReactiveFormsModule),
        DatePipe, SearchHighlightPipe, provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
