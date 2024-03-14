import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Review } from '../models/review';
import { backend } from 'src/environments/environement';
import { ReviewRequestBody } from '../models/reviewRequestBody';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(
    private http: HttpClient,
    private errorService: MessageLoggingService
  ) {}

  getBookReviews(id: number): Observable<Review[]> {
    return this.http
      .get<Review[]>(backend.url + '/books/reviews/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }

  addBookReview(reqBody: ReviewRequestBody): Observable<Review> {
    return this.http
      .post<Review>(backend.url + '/books/review', {
        ...reqBody,
      })
      .pipe(catchError(this.errorService.errorHandler));
  }

  deleteBookReview(id: number): Observable<void> {
    return this.http
      .delete<void>(backend.url + '/books/review/' + id)
      .pipe(catchError(this.errorService.errorHandler));
  }
}
