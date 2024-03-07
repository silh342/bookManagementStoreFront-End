import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { backend } from 'src/environments/environement';
import { Category } from '../models/category';
import { ErrorHandlerService } from 'src/app/utils/errorHandler.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(backend.url + '/categories')
      .pipe(catchError(this.errorHandlerService.errorHandler));
  }
}
