import { NgModule } from '@angular/core';
import { AuthorComponent } from './author.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { RouterModule } from '@angular/router';
import { authGuardFn } from '../auth/guards/auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([
        {
            path: '',
            component: AuthorComponent,
            canActivateChild: [authGuardFn],
            children: [{ path: '', component: AuthorListComponent }],
        },
    ]),
    AuthorComponent, AuthorListComponent, EditAuthorComponent,
],
})
export class AuthorModule {}
