import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../auth/model/user';
import { backend } from 'src/environments/environement';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(currentUser: User): Observable<User[]> {
    return this.http
      .get<User[]>(backend.url + '/auth/getusers')
      .pipe(
        map((users) =>
          users.filter((user) => user.username !== currentUser.username)
        )
      );
  }

  setUserRole(username: string, rolename: string): Observable<User> {
    return this.http.post<User>(backend.url + '/auth/setuserrole', {
      username,
      rolename,
    });
  }
}
