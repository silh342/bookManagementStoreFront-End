import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ValidateInputDirective } from './directives/validate-input.directive';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    ValidateInputDirective,
    SearchHighlightPipe,
  ],
  exports: [
    ConfirmationDialogComponent,
    ValidateInputDirective,
    SearchHighlightPipe,
  ],
  imports: [MatDialogModule, MatButtonModule],
})
export class SharedModule {}
