import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageLoggingService } from './utils/messageLogging.service';
import { ErrorTemplate } from './utils/error/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
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
    this.subscription$.unsubscribe();
  }
}
