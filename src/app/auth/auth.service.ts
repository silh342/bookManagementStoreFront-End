import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  userAuthenticated: BehaviorSubject<User>;
  currentUser: User;

  ngOnInit(): void {
    this.userAuthenticated = new BehaviorSubject(null);
  }
}
