import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(request.url.includes('login') || request.url.includes('register'))) {
      const username: string = this.authService.ActiveUser.username;
      const password: string = this.authService.ActiveUser.password;
      let basicAuthHeader: string = 'Basic ' + btoa(username + ':' + password);
      const transformedRequest = request.clone({
        setHeaders: {
          Authorization: basicAuthHeader,
        },
      });
      return next.handle(transformedRequest);
    }
    return next.handle(request);
  }
}
