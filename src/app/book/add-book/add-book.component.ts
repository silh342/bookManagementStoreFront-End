import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  listAuthors: string[] = ['Masashi Kishimoto', 'Oda', 'Hajime Isayama'];
  listCategories: string[] = ['Psychology', 'Romance', 'Sports', 'Action'];
  addBookForm: FormGroup;

  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      book: new FormGroup({
        title: new FormControl(null, Validators.required),
        isbn: new FormControl(null),
        price: new FormControl(
          0,
          Validators.pattern(new RegExp('[+-]?([0-9]*[.])?[0-9]+'))
        ),
        author: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        datecreation: new FormControl(null),
        datepublication: new FormControl(null),
        quantity: new FormControl(null, Validators.required),
      }),
    });
  }
}
