import {Component, inject, OnInit, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgFor, NgIf} from '@angular/common';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import TutorItemComponent from './tutor-item/tutor-item.component';
import {MatDialog} from '@angular/material/dialog';
import {UpsertModalComponent} from './modals/upsert-modal/upsert-modal.component';
import {filter, first} from 'rxjs';
import {UserLoginDto, UserRole} from '../../../core/models/constants';
import {TeacherResponseDto, TeacherService} from '../../../core/teachers.service';


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
export default class TutorManagementComponent implements OnInit{
  private readonly dialog = inject(MatDialog);
  // private readonly service = inject(UserService);

  $tutors = signal([] as TeacherResponseDto[]);
  private readonly  schoolId = 1;
  private readonly service = inject(TeacherService);

  ngOnInit() {
    this.service.getListOfTeachers().subscribe(
      (tutors) => this.$tutors.set(tutors as unknown as TeacherResponseDto[]),
    )
  }

  openCreateTeacherDialog() {
    const dialogRef = this.dialog.open(UpsertModalComponent);

    dialogRef.afterClosed()
      .pipe(
        first(),
        filter(res => !!res)
      )
      .subscribe(result => {
        console.log('Новий викладач:', result);
        this.service.create({...result, role: UserRole.TEACHER}, this.schoolId).subscribe(
          () => this.$tutors.update(
            (prev) => {
              prev.push({id: 1, ...result});
              return prev;
            }
          )
        );
        // this.service.create(result, UserRole.TEACHER).subscribe();
      });
  }

  saveEdit(tutor: TeacherResponseDto) {

  }
}
