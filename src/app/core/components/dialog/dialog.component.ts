import { Component, inject, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Periodic } from '../../api/periodic.service';

export interface DialogData {
  item: Periodic;
  key: keyof Periodic;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  /**
   * Dialog reference (e.g. to close).
   */
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  /**
   * Input data.
   */
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  /**
   * Currently edited form model.
   */
  readonly edited = model(this.data.item[this.data.key]);

  /**
   * Resolve input type based on data type.
   *
   * @protected
   */
  protected inputType(): string {
    const type = typeof this.data.item[this.data.key];

    switch (type) {
      case 'number':
        return 'number';
      case 'string':
        return 'text';
      default:
        throw new Error('Unknown data type');
    }
  }

  /**
   * Close after click "cancel" button.
   *
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
