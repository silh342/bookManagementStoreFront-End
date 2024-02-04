import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, map } from 'rxjs';
import { backend } from 'src/environments/environement';
import { DatePipe } from '@angular/common';
import { BookRequestBody } from '../models/bookRequestBody';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

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
  addBook(newBook: BookRequestBody): Observable<Book> {
    return this.http.post<Book>(backend.url + '/books', newBook);
  }
  editBook(id: number, updateBook: BookRequestBody): Observable<Book> {
    return this.http.put<Book>(backend.url + '/books/' + id, updateBook);
  }
  deleteBook(id: number): void {
    this.http.delete(backend.url + '/books/' + id);
  }
}
