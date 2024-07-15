import { Component, OnInit } from '@angular/core';
import { MessageLoggingService } from '../shared/messageLogging.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterLink],
})
export class HomeComponent implements OnInit {
  constructor(private errorService: MessageLoggingService) {}

  ngOnInit(): void {
    this.errorService.errorMessage.next(null);
    this.errorService.successMessage.next(null);
  }
}
