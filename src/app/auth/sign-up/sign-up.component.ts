import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { registerUser } from '../model/registerUser';
import { NgForm } from '@angular/forms';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';
import { Router } from '@angular/router';
import { ErrorTemplate } from 'src/app/shared/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  registerSubscription: Subscription = new Subscription();
  password: string = '';
  repassword: string = '';
  matchPasswords: boolean = true;
  showPassword: boolean = false;
  showRePassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRePasswordVisibility() {
    this.showRePassword = !this.showRePassword;
  }
  constructor(
    private authService: AuthService,
    private errorService: MessageLoggingService,
    private router: Router
  ) {}

  onRegister(signup: NgForm) {
    this.registerSubscription = this.authService
      .singUp(signup.value)
      .subscribe(() => {
        this.errorService.successMessage.next({
          message: 'User Created Successfully',
        });
        this.authService
          .login(signup.value.username, signup.value.password)
          .subscribe((res) => {
            this.router.navigate(['/books']);
          });
      });
  }

  checkReEnteredPasswordValidity() {
    this.matchPasswords = this.password === this.repassword;
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
