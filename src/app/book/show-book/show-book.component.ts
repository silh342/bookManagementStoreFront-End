import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;
  currentBook$: Observable<Book>;
  deleteBook$: Observable<void>;
  activeUser: User;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  openDeleteConfirmationDialog(id: number) {
    const deleteDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm Delete Operation',
        message: 'You confirm that you want to delete this book',
      },
    });

    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBook(id);
      }
    });
  }

  ngOnInit(): void {
    this.activeUser = this.authService.ActiveUser;
    this.paramSubscription = this.route.params.subscribe(() => {
      const bookId = +this.route.snapshot.paramMap.get('id');
      this.currentBook$ = this.bookService.findBook(bookId);
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: (value) => {
        console.log('Book Deleted Successfully', value);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.log('Error Deleting the Book', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
