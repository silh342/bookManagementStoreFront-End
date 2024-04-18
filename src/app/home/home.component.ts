import { Component, OnInit } from '@angular/core';
import { MessageLoggingService } from '../shared/messageLogging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private errorService: MessageLoggingService) {}

  ngOnInit(): void {
    this.errorService.errorMessage.next(null);
    this.errorService.successMessage.next(null);
  }
}
