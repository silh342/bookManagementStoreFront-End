import { Component, OnInit } from '@angular/core';
import { MessageLoggingService } from './utils/messageLogging.service';
import { ErrorTemplate } from './utils/error/error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  error: ErrorTemplate;
  success: ErrorTemplate;

  constructor(private errorService: MessageLoggingService) {}

  ngOnInit(): void {
    this.errorService.errorMessage.subscribe((err) => {
      this.error = err;
    });

    this.errorService.successMessage.subscribe((message) => {
      this.success = message;
    });
  }
}
