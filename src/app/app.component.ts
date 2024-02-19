import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './book/shared/sharedData.service';
import { ErrorHandlerService } from './errorHandler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  error: string;
  success: string;

  constructor(private errorService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.errorService.errorMessage.subscribe((err) => {
      this.error = err;
    });

    this.errorService.successMessage.subscribe((message) => {
      this.success = message;
    });
  }
}
