import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, map } from 'rxjs';
import { backend } from 'src/environments/environement';
import { BookRequestBody } from '../models/bookRequestBody';
import { Inventory } from '../models/inventory';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}

  // Search queries
  findAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(backend.url + '/books');
  }
  findBook(id: number): Observable<Book> {
    return this.http.get<Book>(backend.url + '/books/' + id);
  }

  findBookByCategory(categoryName: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      backend.url + '/books/category/' + categoryName
    );
  }
  findBookByAuthor(authorName: string): Observable<Book[]> {
    return this.http.get<Book[]>(backend.url + '/books/author/' + authorName);
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
    console.log(newBook);
    return this.http.post<Book>(backend.url + '/books', newBook);
  }
  editBook(id: number, updateBook: BookRequestBody): Observable<Book> {
    return this.http.put<Book>(backend.url + '/books/' + id, updateBook);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(backend.url + '/books/' + id);
  }
}
