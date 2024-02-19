import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Author } from '../models/author';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(backend.url + '/authors');
  }
  editAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(backend.url + '/authors', {
      ...author,
      books: [],
    });
  }
  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(backend.url + '/authors', { ...author });
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(backend.url + '/authors/' + id);
  }
}
