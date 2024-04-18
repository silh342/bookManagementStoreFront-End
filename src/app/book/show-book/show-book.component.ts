import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, mapTo, of, switchMap, tap } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/model/user';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  currentBook$: Observable<Book>;
  currentBookId: number;
  deleteBook$: Observable<void>;
  activeUser: User;
  reviewLength: number;
  viewsIncremented: boolean = false;
  favoriteBtn: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private logger: MessageLoggingService
  ) {}

  updateReviews() {
    this.currentBook$ = this.bookService.findBook(this.currentBookId);
  }
  openDeleteConfirmationDialog(id: number) {
    const deleteDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        danger: true,
        title: 'Confirm Delete Operation',
        message:
          "Deleting this book will also delete it from user' favorite books section \n. Do you want to confirm this operation ?",
      },
    });

    this.subscription$.add(
      deleteDialog.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteBook(id);
        }
      })
    );
  }

  showEditStockDialog() {
    this.subscription$.add(
      this.bookService.findBook(this.currentBookId).subscribe((foundBook) => {
        const editStockDialog = this.dialog.open(EditStockComponent, {
          width: '700px',
          height: '350',
          data: {
            book: foundBook,
          },
        });
        editStockDialog.afterClosed().subscribe((res) => {
          if (res) {
            this.router.navigate(['/books', this.currentBookId]);
          }
        });
      })
    );
  }

  ngOnInit(): void {
    this.activeUser =
      this.authService.getUserFromToken(sessionStorage.getItem('user_token')) ||
      null;
    this.subscription$.add(
      this.route.params
        .pipe(
          switchMap(() => {
            this.currentBookId = +this.route.snapshot.paramMap.get('id');
            return this.bookService.findBook(this.currentBookId);
          }),
          tap((book) => {
            const userFavBook: boolean = book.likedByUsers.some(
              (user) => user.username === this.activeUser.username
            );
            this.favoriteBtn = userFavBook ? true : false;
          })
        )
        .subscribe((book) => {
          this.currentBook$ = of(book);
        })
    );
    // Optimize the code for better performance
  }

  deleteBook(id: number): void {
    this.subscription$.add(
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.router.navigate(['/books']);
          this.logger.successMessage.next({
            message: 'Book Deleted Successfully !',
          });
        },
      })
    );
  }

  favoriteBtnClick() {
    this.currentBook$ = this.bookService
      .addBookToFavorites(
        this.currentBookId,
        this.activeUser.username,
        this.favoriteBtn
      )
      .pipe(
        map((res) => {
          this.favoriteBtn = !this.favoriteBtn;
          return res;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
