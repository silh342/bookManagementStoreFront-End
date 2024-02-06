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
}
