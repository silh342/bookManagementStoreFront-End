import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => (this.currentUser = user));
  }

  isUserAuthorized(): boolean {
    return this.authService.isUserAuthorized(
      ['ROLE_USER', 'ROLE_ADMIN'],
      this.currentUser
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/signin']);
  }
}
