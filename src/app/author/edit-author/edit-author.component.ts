import { NgFor } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Author } from 'src/app/book/models/author';
import { AuthorService } from 'src/app/book/services/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  currentAuthor: Author;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { operation: string; title: string; author: Author },
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<EditAuthorComponent>
  ) {}

  ngOnInit(): void {
    this.currentAuthor = this.data.author;
  }

  onSave(formData: Author) {
    if (this.data.operation.startsWith('edit')) {
      this.currentAuthor.fullName = formData.fullName;
      this.currentAuthor.description = formData.description;
      this.authorService.editAuthor(this.currentAuthor).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.data.operation.startsWith('add')) {
      this.authorService.addAuthor(formData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onDiscard() {
    this.dialogRef.close(false);
  }
}
