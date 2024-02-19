import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Observable, map } from 'rxjs';
import { Inventory } from '../models/inventory';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../models/book';
import { BookRequestBody } from '../models/bookRequestBody';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css'],
})
export class EditStockComponent {
  @ViewChild('quantity') quantityInput: ElementRef;
  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {}

  onSave() {
    const reqBody: BookRequestBody = {
      book: this.data.book,
      authorName: this.data.book.author.fullName,
      categoryName: this.data.book.category.categoryName,
      quantity: this.quantityInput.nativeElement.value,
    };
    this.bookService.editBook(reqBody.book.bookId, reqBody).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onDiscard() {
    this.dialogRef.close(false);
  }
}
