import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptorService: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  if (!(request.url.includes('login') || request.url.includes('register'))) {
    let authToken = sessionStorage.getItem('user_token');
    if (authToken) {
      const transformedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next(transformedRequest);
    }
  }
  return next(request);
};
