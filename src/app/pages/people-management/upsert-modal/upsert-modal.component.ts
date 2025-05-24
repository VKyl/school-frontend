import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {NgIf} from '@angular/common';

class CreateTeacherDialogComponent {
}

@Component({
  selector: 'app-upsert-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    NgIf,
  ],
  templateUrl: './upsert-modal.component.html',
  styleUrl: './upsert-modal.component.css'
})
export class UpsertModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UpsertModalComponent>);

  teacherForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
  });

  onSave() {
    if (this.teacherForm.valid) {
      this.dialogRef.close(this.teacherForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
