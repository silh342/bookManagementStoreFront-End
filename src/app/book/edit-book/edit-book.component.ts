import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from '../shared/sharedData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit, OnDestroy {
  author = new FormControl(null, Validators.required);
  category = new FormControl(null, Validators.required);
  currentBookId: number;
  authorFilteredOptions: Observable<string[]>;
  categoryFilteredOptions: Observable<string[]>;
  editBookForm: FormGroup;
  subscription$: Subscription = new Subscription();

  constructor(
    private sharedService: SharedDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private bookService: BookService,
    private logger: MessageLoggingService,
    private datePipe: DatePipe
  ) {}

  openEditConfirmationDialog(): void {
    const dialogReference = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm Operation',
        message: 'Are you sure you want to confirm this operation',
      },
    });

    this.subscription$.add(
      dialogReference.afterClosed().subscribe((answer) => {
        if (answer) this.onSubmit();
      })
    );
  }

  ngOnInit(): void {
    this.subscription$.add(
      this.route.params.subscribe(() => {
        const bookId = +this.route.snapshot.paramMap.get('id');
        this.subscription$.add(
          this.bookService.findBook(bookId).subscribe((value) => {
            this.currentBookId = value.bookId;
            this.editBookForm.patchValue({
              book: {
                title: value.title,
                isbn: value.isbn,
                price: value.price,
                dateCreation: this.datePipe.transform(
                  value.dateCreation,
                  'yyyy-MM-dd'
                ),
                datePublication: this.datePipe.transform(
                  value.datePublication,
                  'yyyy-MM-dd'
                ),
              },
              authorName: value.author?.fullName,
              categoryName: value.category.categoryName,
              quantity: value.inventory.quantity,
            });
          })
        );
      })
    );

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

    this.editBookForm = new FormGroup({
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

  onSubmit(): void {
    console.log(this.editBookForm.value);
    this.editBookForm.value.bookId = this.currentBookId;
    this.subscription$.add(
      this.bookService
        .editBook(this.currentBookId, this.editBookForm.value)
        .subscribe({
          next: () => {
            this.logger.successMessage.next({
              message: 'Book Updated Successfully !',
            });
            this.router.navigate(['/books', this.currentBookId]);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
