import {Component, inject, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgFor, NgIf} from '@angular/common';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Tutor} from '../models/users.dto';
import TutorItemComponent from './tutor-item/tutor-item.component';
import {MatDialog} from '@angular/material/dialog';
import {UpsertModalComponent} from './modals/upsert-modal/upsert-modal.component';
import {filter, first} from 'rxjs';

const mockTutors: Tutor[] = [
    {
      id: "1",
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: "Math"
    },
    {
      id: "2",
      name: 'Bob Smith',
      email: 'bob@example.com',
      subject: "Math"
    },
    {
      id: "3",
      name: 'Carol White',
      email: 'carol@example.com',
      subject: "Math"
    }
];

@Component({
  selector: 'app-tutor-management',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    NgFor,
    NgIf,
    MatButtonModule,
    MatIcon,
    MatIconButton,
    TutorItemComponent
  ],
  templateUrl: './tutor-management.component.html',
  styleUrl: './tutor-management.component.css'
})
export default class TutorManagementComponent {
  private readonly dialog = inject(MatDialog)

  $tutors = signal(mockTutors);

  openCreateTeacherDialog() {
    const dialogRef = this.dialog.open(UpsertModalComponent);

    dialogRef.afterClosed()
      .pipe(
        first(),
        filter(res => !!res)
      )
      .subscribe(result => {
        console.log('Новий викладач:', result);
      });
  }

  saveEdit(tutor: Tutor){
    this.$tutors.update(
      (prev) => {
        return prev.map(
          (t) => t.id === tutor.id ? {...tutor} : t
        );
      }
    )
  }
}
