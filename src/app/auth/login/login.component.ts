import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorTemplate } from 'src/app/error/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: ErrorTemplate = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authError.subscribe((err) => {
      this.error = err;
    });
  }

  onSubmit(loginForm: NgForm) {
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe((res) => {
        this.router.navigate(['/books']);
      });
  }
}
