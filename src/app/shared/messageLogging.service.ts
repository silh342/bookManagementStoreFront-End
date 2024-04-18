import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { ErrorTemplate } from './error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageLoggingService {
  errorMessage: BehaviorSubject<ErrorTemplate> = new BehaviorSubject(null);
  successMessage: BehaviorSubject<ErrorTemplate> = new BehaviorSubject(null);

  errorHandler = (error: HttpErrorResponse): Observable<never> => {
    return throwError(() => {
      this.errorMessage.next({
        status: error.error.status,
        timestamp: error.error.timestamp,
        message: error.error.message,
      });
    });
  };
}
