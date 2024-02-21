import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    this.loginSubscription = this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe(() => {
        this.router.navigate(['/books']);
      });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
