import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MessageLoggingService } from './messageLogging.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private logger: MessageLoggingService) {}

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      this.logger.errorMessage.next({
        message: error.message,
      });
    });
  }
}
