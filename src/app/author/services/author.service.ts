import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Author } from '../../book/models/author';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(
    private http: HttpClient,
    private logger: MessageLoggingService
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
      .pipe(
        catchError(() =>
          throwError(() => {
            this.logger.errorMessage.next({
              message: 'Error while trying to update the author !',
            });
          })
        )
      );
  }
  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(backend.url + '/authors', { ...author }).pipe(
      catchError(() =>
        throwError(() => {
          this.logger.errorMessage.next({
            message: 'Author Could not be added, Try again later !',
          });
        })
      )
    );
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(backend.url + '/authors/' + id).pipe(
      catchError(() =>
        throwError(() => {
          this.logger.errorMessage.next({
            message: 'Error encoutered deleting the author',
          });
        })
      )
    );
  }
}
