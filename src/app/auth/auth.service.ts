import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from './model/jwtResponse';
import { backend } from 'src/environments/environement';
import { jwtDecode } from 'jwt-decode';
import { decodedToken } from './model/decodedToken';
import { ErrorTemplate } from '../error/error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  authError: Subject<ErrorTemplate> = new Subject();
  ActiveUser: User = null;
  constructor(private http: HttpClient) {}

  getUserFromToken(token: string): User {
    const decodedToken: decodedToken = jwtDecode(token);
    return new User(decodedToken.sub, decodedToken.roles);
  }

  isAuthenticated(): boolean {
    const decodedToken: decodedToken = jwtDecode(
      sessionStorage.getItem('user_token')
    );
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken && decodedToken.exp < currentTime ? false : true;
  }

  singUp() {}

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(backend.url + '/auth/login', {
        username,
        password,
      })
      .pipe(
        map((token: JwtResponse) => {
          sessionStorage.setItem('user_token', token.accessToken);
          this.ActiveUser = {
            ...this.getUserFromToken(token.accessToken),
            password,
          };
          this.user.next(this.ActiveUser);
          this.authError.next(null);
          return token;
        }),
        catchError((err) =>
          throwError(() => {
            this.user.next(null);
            this.ActiveUser = null;
            this.authError.next({
              title: 'Error Logging you in',
              stack: 'Bad Credentials',
            });
          })
        )
      );
  }

  logout(): void {
    sessionStorage.removeItem('user_token');
    this.user.next(null);
    this.ActiveUser = null;
  }
}
