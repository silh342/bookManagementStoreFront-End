import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchHighlightPipe } from '../../shared/pipes/search-highlight.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatSortHeader,
    MatTooltip,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    SearchHighlightPipe,
    DatePipe,
  ],
})
export class ListBookComponent implements OnInit {
  displayedColumns: string[] = [
    'view',
    'title',
    'isbn',
    'price',
    'quantity',
    'author',
    'category',
    'dateCreation',
    'datePublication',
  ];
  dataSource: MatTableDataSource<Book>;
  @ViewChild('selectSearchOption', { static: false })
  selectSearchOption: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matsort: MatSort;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.findAllBooks().subscribe((listBooks) => {
      this.dataSource = new MatTableDataSource(listBooks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matsort;
      this.dataSource.filterPredicate = (data: any, filter: string) =>
        this.customFilter(data, filter);
    });
  }

  filterListBooks(filterVal: string) {
    this.dataSource.filter = filterVal.toLowerCase().trim();
  }

  customFilter(data: Book, filter: string): boolean {
    filter = filter.toLowerCase();
    return (
      data.title.toLowerCase().includes(filter) ||
      data.isbn.toLowerCase().includes(filter) ||
      data.price.toString().includes(filter) ||
      data.author.fullName.toLowerCase().includes(filter) ||
      data.category.categoryName.toLowerCase().includes(filter) ||
      data.inventory.quantity.toString().includes(filter)
    );
  }

  showBook(id: number) {
    this.bookService.incrementViews(id).subscribe((res) => {
      this.router.navigate(['books', id]);
    });
  }
}
