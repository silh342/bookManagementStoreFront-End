import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SharedDataService } from '../shared/sharedData.service';
import { formatDate } from '@angular/common';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  author = new FormControl(null, Validators.required);
  category = new FormControl(null, Validators.required);
  authorFilteredOptions: Observable<string[]>;
  categoryFilteredOptions: Observable<string[]>;

  addBookForm: FormGroup;

  constructor(
    private sharedService: SharedDataService,
    private bookService: BookService,
    private route: Router,
    private dialog: MatDialog
  ) {}

  openRegisterBookConfirmationDialog() {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm Operation',
        message: 'Do you want to confirm the registration of the book ?',
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) this.onSubmit();
    });
  }

  ngOnInit(): void {
    this.authorFilteredOptions = this.sharedService.fillAutocomplete(
      this.author,
      this.sharedService,
      'author'
    );
    this.categoryFilteredOptions = this.sharedService.fillAutocomplete(
      this.category,
      this.sharedService,
      'category'
    );

    this.addBookForm = new FormGroup({
      book: new FormGroup({
        title: new FormControl(null, Validators.required),
        isbn: new FormControl(null),
        price: new FormControl(
          0,
          Validators.pattern(new RegExp('[+-]?([0-9]*[.])?[0-9]+'))
        ),
        dateCreation: new FormControl(null),
        datePublication: new FormControl(null),
      }),
      authorName: this.author,
      categoryName: this.category,
      quantity: new FormControl(null, Validators.required),
    });
  }

  // Implement add logic here
  onSubmit() {
    this.addBookForm.value.book.dateCreation = formatDate(
      this.addBookForm.value.book.dateCreation,
      'yyyy-MM-dd',
      'en-US'
    );

    this.addBookForm.value.book.datePublication = formatDate(
      this.addBookForm.value.book.datePublication,
      'yyyy-MM-dd',
      'en-US'
    );
    //TODO handle errors with a template for the errors
    this.bookService.addBook(this.addBookForm.value).subscribe((res) => {
      this.route.navigate(['/books']);
      this.addBookForm.reset();
    });
  }
}
