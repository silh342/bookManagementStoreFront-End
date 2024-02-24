import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageLoggingService } from './utils/messageLogging.service';
import { ErrorTemplate } from './utils/error/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
