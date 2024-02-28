import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  listFavBook$: Observable<Book[]>;
  currentUsername: string;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  loadFavoriteBooks(): Observable<Book[]> {
    return this.bookService.getFavoriteBooksByUser(this.currentUsername);
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.currentUsername = this.route.snapshot.paramMap.get('username');
      this.listFavBook$ = this.loadFavoriteBooks();
    });
  }

  openDialgDeleteFromFavorites(bookId: number) {
    const deleteFavoriteBook = this.matDialog.open(
      ConfirmationDialogComponent,
      {
        width: '500',
        data: {
          title: 'Delete from favorties',
          message:
            'Are you sure you want to remove this book from your favorites ?',
        },
      }
    );

    deleteFavoriteBook.afterClosed().subscribe((res) => {
      if (res) this.deleteFromFavorites(bookId);
    });
  }

  deleteFromFavorites(bookId: number): void {
    this.bookService
      .addBookToFavorites(bookId, this.currentUsername, true)
      .subscribe(() => {
        this.listFavBook$ = this.loadFavoriteBooks();
      });
  }
}
