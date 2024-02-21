import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorTemplate } from './error/error';

@Injectable({ providedIn: 'root' })
export class MessageLoggingService {
  errorMessage: BehaviorSubject<ErrorTemplate> = new BehaviorSubject(null);
  successMessage: BehaviorSubject<ErrorTemplate> = new BehaviorSubject(null);
}
