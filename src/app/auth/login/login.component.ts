import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe((res) => {
        this.router.navigate(['/books']);
      });
  }
}
