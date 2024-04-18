import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorTemplate } from '../shared/error';
import { MessageLoggingService } from '../shared/messageLogging.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  error: ErrorTemplate;
  success: ErrorTemplate;

  constructor(private errorService: MessageLoggingService) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.errorService.errorMessage.subscribe((err) => {
        this.error = err;
      })
    );
    this.subscription$.add(
      this.errorService.successMessage.subscribe((message) => {
        this.success = message;
      })
    );
  }

  ngOnDestroy(): void {
    this.errorService.errorMessage.next({ message: null });
    this.errorService.successMessage.next({ message: null });
    this.subscription$.unsubscribe();
  }
}
