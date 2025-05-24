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
import {MatDialog} from '@angular/material/dialog';
import {UpsertModalComponent} from './modals/upsert-modal/upsert-modal.component';
import {filter, first} from 'rxjs';
import {HeadTutor, Tutor} from '../models/users.dto';
import HeadTutorItemComponent from './head-tutor-item/head-tutor-item.component';

const mockTutors: HeadTutor[] = [
    {
      id: "1",
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    {
      id: "2",
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    {
      id: "3",
      name: 'Carol White',
      email: 'carol@example.com',
    }
];

@Component({
  selector: 'app-head-tutor-management',
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
    HeadTutorItemComponent,
  ],
  templateUrl: './head-tutor-management.component.html',
  styleUrl: './head-tutor-management.component.css'
})
export default class HeadTutorManagementComponent {
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

  saveEdit(tutor: HeadTutor){
    this.$tutors.update(
      (prev) => {
        return prev.map(
          (t) => t.id === tutor.id ? {...tutor} : t
        );
      }
    )
  }
}
