import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../errorHandler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private errorService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.errorService.errorMessage.next(null);
    this.errorService.successMessage.next(null);
  }
}
