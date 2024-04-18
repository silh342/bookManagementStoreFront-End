import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, catchError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { BookRequestBody } from '../models/bookRequestBody';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(
    private http: HttpClient,
    private errorService: MessageLoggingService
  ) {}

  // Search queries
  findAllBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(backend.url + '/books')
      .pipe(catchError(this.errorService.errorHandler));
  }
  incrementViews(id: number): Observable<Book> {
    return this.http
      .get<Book>(backend.url + '/books/incrementViews/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }
  addBookToFavorites(
    bookId: number,
    username: string,
    addOrRemove: boolean
  ): Observable<Book> {
    return this.http
      .post<Book>(backend.url + '/books/favorite', {
        bookId,
        username,
        addOrRemove,
      })
      .pipe(catchError(this.errorService.errorHandler));
  }
  getFavoriteBooksByUser(username: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(backend.url + '/books/favoritesbyuser/' + username)
      .pipe(catchError(this.errorService.errorHandler));
  }
  findBook(id: number): Observable<Book> {
    return this.http
      .get<Book>(backend.url + '/books/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }

  findBookByCategory(categoryName: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(backend.url + '/books/category/' + categoryName)
      .pipe(catchError(this.errorService.errorHandler));
  }
  findBookByAuthor(authorName: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(backend.url + '/books/author/' + authorName)
      .pipe(catchError(this.errorService.errorHandler));
  }

  // Sort requests
  sortBooksAsc(): Observable<Book[]> {
    return this.http.get<Book[]>(backend.url + '/books/sortedbytitle');
  }
  sortBooksDesc(): Observable<Book[]> {
    return this.http.get<Book[]>(backend.url + '/books/sortedbytitledesc');
  }

  // Add/Update/Delete requests
  addBook(newBook: BookRequestBody): Observable<Book> {
    return this.http
      .post<Book>(backend.url + '/books', newBook)
      .pipe(catchError(this.errorService.errorHandler));
  }
  editBook(id: number, updateBook: BookRequestBody): Observable<Book> {
    return this.http
      .put<Book>(backend.url + '/books/' + id, updateBook)
      .pipe(catchError(this.errorService.errorHandler));
  }
  deleteBook(id: number): Observable<any> {
    return this.http
      .delete(backend.url + '/books/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }
}
