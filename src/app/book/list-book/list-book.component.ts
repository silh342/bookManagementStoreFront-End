import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent implements OnInit {
  listBooks$: Observable<Book[]>;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  searchInputHidden: string = 'all';
  @ViewChild('selectSearchOption', { static: false })
  selectSearchOption: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.listBooks$ = this.bookService.findAllBooks();
  }

  selectSearch(data) {
    if (data.target.value === 'all') {
      this.searchInputHidden = 'all';
      this.ngOnInit();
      return;
    }
    if (data.target.value === 'author') {
      this.searchInputHidden = 'author';
      return;
    }
    this.searchInputHidden = 'category';
    return;
  }

  searchBooks() {
    switch (this.searchInputHidden) {
      case 'all':
        this.listBooks$ = this.bookService.findAllBooks();
        break;
      case 'author':
        this.listBooks$ = this.bookService.findBookByAuthor(
          this.searchInput.nativeElement.value
        );
        break;
      case 'category':
        this.listBooks$ = this.bookService.findBookByCategory(
          this.searchInput.nativeElement.value
        );
        break;
    }
  }
}
