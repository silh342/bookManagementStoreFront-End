import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;
  currentBook$: Observable<Book>;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(() => {
      const bookId = +this.route.snapshot.paramMap.get('id');
      this.currentBook$ = this.bookService.findBook(bookId);
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
