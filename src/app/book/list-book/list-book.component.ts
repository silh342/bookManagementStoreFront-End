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
  itemsPerPage: number = 8;
  currentPage: number = 1;
  searchInputHidden: string = 'all';
  @ViewChild('selectSearchOption', { static: false })
  selectSearchOption: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.listBooks$ = this.bookService.findAllBooks();
  }

  selectSearch(data: Event): void {
    const selectElement: HTMLSelectElement = data.target as HTMLSelectElement;
    if (selectElement.value === 'all') {
      this.searchInputHidden = 'all';
      this.ngOnInit();
      return;
    }
    if (selectElement.value === 'author') {
      this.searchInputHidden = 'author';
      return;
    }
    this.searchInputHidden = 'category';
    return;
  }

  searchBooks(): void {
    this.currentPage = 1;
    switch (this.searchInputHidden) {
      case 'all':
        this.listBooks$ = this.bookService.findAllBooks();
        break;
      case 'author':
        if (this.searchInput.nativeElement.value === '') {
          this.listBooks$ = this.bookService.findAllBooks();
        } else {
          this.listBooks$ = this.bookService.findBookByAuthor(
            this.searchInput.nativeElement.value
          );
        }
        break;
      case 'category':
        if (this.searchInput.nativeElement.value === '') {
          this.listBooks$ = this.bookService.findAllBooks();
        } else {
          this.listBooks$ = this.bookService.findBookByCategory(
            this.searchInput.nativeElement.value
          );
        }
        break;
    }
  }

  sortBooks(sortOption: Event): void {
    const sortSelect: HTMLSelectElement =
      sortOption.target as HTMLSelectElement;
    if (sortSelect.value === 'asc') {
      this.listBooks$ = this.bookService.sortBooksAsc();
      return;
    }

    if (sortSelect.value === 'desc') {
      this.listBooks$ = this.bookService.sortBooksDesc();
      return;
    }
    this.listBooks$ = this.bookService.findAllBooks();
    return;
  }
}
