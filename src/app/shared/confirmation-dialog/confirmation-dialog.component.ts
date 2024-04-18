import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialog: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; danger?: boolean }
  ) {}

  onConfirm() {
    this.dialog.close(true);
  }

  onCancel() {
    this.dialog.close(false);
  }
}
