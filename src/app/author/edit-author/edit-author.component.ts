import { NgFor } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Author } from 'src/app/book/models/author';
import { AuthorService } from 'src/app/author/services/author.service';
import { MessageLoggingService } from 'src/app/shared/messageLogging.service';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-edit-author',
    templateUrl: './edit-author.component.html',
    styleUrls: ['./edit-author.component.css'],
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDialogActions,
        MatButton,
    ],
})
export class EditAuthorComponent implements OnInit, OnDestroy {
  currentAuthor: Author;
  authorSubscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { operation: string; title: string; author: Author },
    private authorService: AuthorService,
    private logger: MessageLoggingService,
    public dialogRef: MatDialogRef<EditAuthorComponent>
  ) {}

  ngOnInit(): void {
    this.currentAuthor = this.data.author;
  }

  onSave(formData: Author) {
    if (this.data.operation.startsWith('edit')) {
      this.currentAuthor.fullName = formData.fullName;
      this.currentAuthor.description = formData.description;
      this.authorSubscription = this.authorService
        .editAuthor(this.currentAuthor)
        .subscribe(() => {
          this.dialogRef.close(true);
          this.logger.successMessage.next({
            message: 'Author Updated Successfully! ',
          });
        });
    } else if (this.data.operation.startsWith('add')) {
      this.authorSubscription = this.authorService
        .addAuthor(formData)
        .subscribe(() => {
          this.dialogRef.close(true);
          this.logger.successMessage.next({
            message: 'Author Created Successfully! ',
          });
        });
    }
  }

  onDiscard() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }
}
