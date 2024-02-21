import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/book/models/author';
import { AuthorService } from 'src/app/author/services/author.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditAuthorComponent } from '../edit-author/edit-author.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit, OnDestroy {
  headers: string[] = ['fullName', 'description', 'actions'];
  dataSource: MatTableDataSource<Author>;
  currentUser: User;
  userSubscription: Subscription;
  authorSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authorService: AuthorService,
    private matDialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  isUserEligible(roles: string[]): boolean {
    return this.authService.isUserAuthorized(roles, this.currentUser);
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => (this.currentUser = user)
    );
    this.authorSubscription = this.authorService.getAllAuthors().subscribe({
      next: (authors) => {
        this.dataSource = new MatTableDataSource<Author>(authors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  reloadData(): void {
    this.ngOnInit();
    this.router.navigate(['/authors']);
  }

  openDialogEditAuthor(element: Author) {
    console.log(element);
    const editAuthorDialog = this.matDialog.open(EditAuthorComponent, {
      width: '400px',
      data: {
        operation: 'edit',
        title: 'Edit Author',
        author: element,
      },
    });

    editAuthorDialog.afterClosed().subscribe((res) => {
      if (res) this.reloadData();
    });
  }

  openDialogAddAuthor() {
    const addAuthor = this.matDialog.open(EditAuthorComponent, {
      width: '400px',
      data: { operation: 'add', title: 'Add New Author' },
    });

    addAuthor.afterClosed().subscribe((res) => {
      if (res) this.reloadData();
    });
  }

  openDialogDeleteAuthor(id: number) {
    const deleteAuthor = this.matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Author',
        message: 'Do you confirm the deletion of this author ?',
      },
    });

    deleteAuthor.afterClosed().subscribe((res) => {
      if (res) {
        this.authorService.deleteAuthor(id).subscribe({
          next: () => this.reloadData(),
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase().trim();
    this.dataSource.filter = filterValue;
    // if (filterValue !== '') {
    //   // Highlighting the seached text
    //   const searchRegex = new RegExp(filterValue, 'gi');
    //   const rows = document.querySelectorAll('[mat-row]');
    //   console.log(searchRegex, rows);
    //   rows.forEach((row) => {
    //     const columns = Array.from(
    //       document.querySelectorAll('.mat-column-fullName')
    //     );
    //     columns.shift();
    //     columns.forEach((col) => {
    //       const columnText = col.textContent || '';
    //       console.log(columnText);
    //       col.innerHTML = columnText.replace(
    //         searchRegex,
    //         (match) => `<mark class="highlight">${match}</mark>`
    //       );
    //     });
    //   });
    // }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.authorSubscription.unsubscribe();
  }
}
