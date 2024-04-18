import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageLoggingService } from './shared/messageLogging.service';
import { ErrorTemplate } from './shared/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
