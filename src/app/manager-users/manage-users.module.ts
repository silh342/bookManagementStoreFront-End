import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerUsersComponent } from './manager-users.component';
import { adminGuard } from '../auth/guards/admin.guard';
import { authGuardFn } from '../auth/guards/auth.guard';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ManagerUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagerUsersComponent,
        canActivate: [authGuardFn, adminGuard],
      },
    ]),
  ],
})
export class ManageUsersModule {}
