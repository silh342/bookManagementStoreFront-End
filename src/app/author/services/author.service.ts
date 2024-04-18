import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Author } from '../../book/models/author';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(
    private http: HttpClient,
    private errorService: MessageLoggingService
  ) {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(backend.url + '/authors');
  }
  editAuthor(author: Author): Observable<Author> {
    return this.http
      .put<Author>(backend.url + '/authors', {
        ...author,
        books: [],
      })
      .pipe(catchError(this.errorService.errorHandler));
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http
      .post<Author>(backend.url + '/authors', { ...author })
      .pipe(catchError(this.errorService.errorHandler));
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http
      .delete(backend.url + '/authors/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }
}
