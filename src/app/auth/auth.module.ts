import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [FormsModule, CommonModule, AuthRoutingModule, AuthComponent, LoginComponent, SignUpComponent],
})
export class AuthModule {}
