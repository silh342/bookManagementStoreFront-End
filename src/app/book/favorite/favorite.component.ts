import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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

  deleteFromFavorites(bookId: number): void {
    this.bookService
      .addBookToFavorites(bookId, this.currentUsername, true)
      .subscribe(() => {
        this.listFavBook$ = this.loadFavoriteBooks();
      });
  }
}
