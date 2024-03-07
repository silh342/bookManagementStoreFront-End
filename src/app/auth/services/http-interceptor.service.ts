import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(request.url.includes('login') || request.url.includes('register'))) {
      let authToken = sessionStorage.getItem('user_token');
      if (authToken) {
        const transformedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        return next.handle(transformedRequest);
      }
    }
    return next.handle(request);
  }
}
