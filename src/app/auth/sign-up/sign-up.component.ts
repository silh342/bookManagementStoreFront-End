import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { registerUser } from '../model/registerUser';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/errorHandler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  onRegister(signup: NgForm) {
    this.authService.singUp(signup.value).subscribe((msg) => {
      this.errorService.successMessage.next(msg);
      this.authService
        .login(signup.value.username, signup.value.password)
        .subscribe((res) => {
          this.router.navigate(['/books']);
        });
    });
  }
}
