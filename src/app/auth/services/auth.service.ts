import { ErrorHandler, Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  exhaustMap,
  map,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtResponse } from '../model/jwtResponse';
import { backend } from 'src/environments/environement';
import { jwtDecode } from 'jwt-decode';
import { decodedToken } from '../model/decodedToken';
import { MessageLoggingService } from '../../shared/messageLogging.service';
import { registerUser } from '../model/registerUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private errorService: MessageLoggingService
  ) {}

  getUserFromToken(token: string): User {
    const decodedToken: decodedToken = jwtDecode(token);
    return new User(decodedToken.sub, decodedToken.roles, decodedToken.email);
  }

  isUserAuthorized(roles: string[], user: User): boolean {
    return roles.some((role) => user.role.includes(role));
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('user_token')) {
      const decodedToken: decodedToken = jwtDecode(
        sessionStorage.getItem('user_token')
      );
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken && decodedToken.exp < currentTime ? false : true;
    }

    return false;
  }

  singUp(user: registerUser): Observable<string> {
    return this.http
      .post(
        backend.url + '/auth/register',
        {
          ...user,
          roleNames: ['ROLE_USER'],
        },
        { responseType: 'text' }
      )
      .pipe(catchError(this.errorService.errorHandler));
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(backend.url + '/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((token: JwtResponse) => {
          sessionStorage.setItem('user_token', token.accessToken);
          this.user.next(this.getUserFromToken(token.accessToken));
          this.errorService.errorMessage.next(null);
          this.errorService.successMessage.next({
            message: 'Successfully LoggedIn',
          });
          return token;
        }),
        catchError(this.errorService.errorHandler)
      );
  }

  logout(): void {
    this.user.next(null);
    sessionStorage.removeItem('user_token');
  }
}
