import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Author } from '../../book/models/author';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';
import { ErrorHandlerService } from 'src/app/utils/errorHandler.service';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(
    private http: HttpClient,
    private logger: MessageLoggingService,
    private errorHandlerService: ErrorHandlerService
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
      .pipe(catchError(this.errorHandlerService.errorHandler));
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http
      .post<Author>(backend.url + '/authors', { ...author })
      .pipe(catchError(this.errorHandlerService.errorHandler));
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http
      .delete(backend.url + '/authors/' + id)
      .pipe(catchError(this.errorHandlerService.errorHandler));
  }
}
