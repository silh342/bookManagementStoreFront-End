import { Component } from '@angular/core';
import { User } from './model/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  listOfUsers: User[] = [
    new User('younes', '123', 'USER'),
    new User('ayoub', '456', 'ADMIN'),
  ];
}
