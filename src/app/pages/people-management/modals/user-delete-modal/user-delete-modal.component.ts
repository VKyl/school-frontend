import {Component, inject, Input} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './user-delete-modal.component.html',
  styleUrl: './user-delete-modal.component.css'
})
export class UserDeleteModalComponent {

  private readonly modal = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);

  confirm(){
    this.modal.close(true);
  }

  dismiss(){
    this.modal.close()
  }
}
