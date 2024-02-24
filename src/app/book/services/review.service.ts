import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { backend } from 'src/environments/environement';
import { ReviewRequestBody } from '../models/reviewRequestBody';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient) {}

  getBookReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(backend.url + '/books/reviews/' + id);
  }

  addBookReview(reqBody: ReviewRequestBody): Observable<Review> {
    return this.http.post<Review>(backend.url + '/books/review', {
      ...reqBody,
    });
  }

  deleteBookReview(id: number): Observable<void> {
    return this.http.delete<void>(backend.url + '/books/review/' + id);
  }
}
