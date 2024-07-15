import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageLoggingService } from './shared/messageLogging.service';
import { ErrorTemplate } from './shared/error';
import { Subscription } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        HeaderComponent,
        ErrorComponent,
        RouterOutlet,
        FooterComponent,
    ],
})
export class AppComponent {}
