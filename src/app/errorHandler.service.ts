import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  errorMessage: BehaviorSubject<string> = new BehaviorSubject(null);
  successMessage: BehaviorSubject<string> = new BehaviorSubject(null);
}
