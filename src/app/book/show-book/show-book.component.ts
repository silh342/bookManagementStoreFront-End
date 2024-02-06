import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  deleteBook$: Observable<void>;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
