import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Category } from '../models/category';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    private errorService: MessageLoggingService
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(backend.url + '/categories')
      .pipe(catchError(this.errorService.errorHandler));
  }
}
