import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorTemplate } from 'src/app/error/error';
import { ErrorHandlerService } from 'src/app/errorHandler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe((res) => {
        this.router.navigate(['/books']);
      });
  }
}
