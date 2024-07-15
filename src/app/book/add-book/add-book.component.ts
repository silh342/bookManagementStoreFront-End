import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from '../shared/sharedData.service';
import { DatePipe, formatDate, AsyncPipe } from '@angular/common';
import { BookService } from '../services/book.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';
import { MatOption } from '@angular/material/core';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { ValidateInputDirective } from '../../shared/directives/validate-input.directive';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ValidateInputDirective,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        RouterLink,
        AsyncPipe,
    ],
})
export class AddBookComponent implements OnInit, OnDestroy {
  author = new FormControl(null, Validators.required);
  category = new FormControl(null, Validators.required);
  authorFilteredOptions: Observable<string[]>;
  categoryFilteredOptions: Observable<string[]>;
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  bookSubscription: Subscription = new Subscription();

  addBookForm: FormGroup;

  constructor(
    private sharedService: SharedDataService,
    private bookService: BookService,
    private route: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private logger: MessageLoggingService
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
    this.sharedService.shareData().subscribe((res) => {
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
    });

    this.addBookForm = new FormGroup({
      book: new FormGroup({
        title: new FormControl(null, Validators.required),
        isbn: new FormControl(null, Validators.required),
        price: new FormControl(
          null,
          Validators.pattern(new RegExp(/[+-]?([0-9]*[.])?[0-9]+/))
        ),
        dateCreation: new FormControl(this.currentDate, Validators.required),
        datePublication: new FormControl(this.currentDate, Validators.required),
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
    this.bookSubscription = this.bookService
      .addBook(this.addBookForm.value)
      .subscribe(() => {
        this.addBookForm.reset();
        this.route.navigate(['/books']);
        this.logger.successMessage.next({
          message: 'Book Created Successfully !',
        });
      });
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
