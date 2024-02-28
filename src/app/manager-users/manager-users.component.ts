import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../auth/model/user';
import { Observable, map, tap } from 'rxjs';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css'],
})
export class ManagerUsersComponent implements OnInit {
  currentUser: User;
  listUser$: Observable<User[]>;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private matDialog: MatDialog
  ) {}

  loadUsers() {
    this.listUser$ = this.userService.getAllUsers(this.currentUser);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentUser = JSON.parse(params['user']);
      this.loadUsers();
    });
  }

  saveChanges(username: string, oldrole: string, newrole: string) {
    newrole = `ROLE_${newrole.toUpperCase()}`;
    if (newrole === oldrole) return;
    const saveChangesDialog = this.matDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Change User PRIVILEGE',
        message:
          'Do you want to confirm this operation ? the user may lose some of the privileges they had !',
        danger: true,
      },
    });

    saveChangesDialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.setUserRole(username, newrole).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }
}
