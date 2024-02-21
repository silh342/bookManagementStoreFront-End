import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageLoggingService } from 'src/app/utils/messageLogging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: MessageLoggingService
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe(() => {
        this.router.navigate(['/books']);
      });
  }
}
