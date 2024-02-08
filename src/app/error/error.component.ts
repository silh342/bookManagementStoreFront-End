import { Component } from '@angular/core';
import { ErrorTemplate } from './model/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  error: ErrorTemplate;
}
