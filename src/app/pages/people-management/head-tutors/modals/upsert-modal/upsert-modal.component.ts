import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
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

@Component({
  selector: 'app-upsert-modal',
  standalone: true,
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
export class UpsertModalComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UpsertModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  teacherForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    if(!this.data) return;
    this.teacherForm.patchValue(this.data);
  }

  onSave() {
    if (this.teacherForm.invalid) return this.teacherForm.markAllAsTouched();
    return this.dialogRef.close(this.teacherForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
