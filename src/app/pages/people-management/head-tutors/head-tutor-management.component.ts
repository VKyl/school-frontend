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
import {MatDialog} from '@angular/material/dialog';
import {UpsertModalComponent} from './modals/upsert-modal/upsert-modal.component';
import {filter, first, Observable, switchMap} from 'rxjs';
import {HeadTutor} from '../../../core/models/users.dto';
import HeadTutorItemComponent from './head-tutor-item/head-tutor-item.component';
import {SchoolService} from '../../../core/school.service';
import {UserRole} from '../../../core/models/constants';
import {LoadingControl} from '../../../core/models/loading-control/loading-control.model';
import {IndicateLoading} from '../../../core/decorators/indicate-loading.decorator';
import {SchoolDto} from './models/constants';
import {MatProgressBar} from '@angular/material/progress-bar';

// const mockTutors: HeadTutor[] = [
//   {
//     id: "1",
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//     userRole: UserRole.HEAD_TEACHER
//   },
//   {
//     id: "2",
//     name: 'Bob Smith',
//     email: 'bob@example.com',
//     userRole: UserRole.HEAD_TEACHER
//   },
//   {
//     id: "3",
//     name: 'Carol White',
//     email: 'carol@example.com',
//     userRole: UserRole.HEAD_TEACHER
//   }
// ];

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
    MatProgressBar,
  ],
  templateUrl: './head-tutor-management.component.html',
  styleUrl: './head-tutor-management.component.css'
})
export default class HeadTutorManagementComponent implements OnInit {
  private readonly dialog = inject(MatDialog)
  private readonly schoolService = inject(SchoolService);

  $schools = signal<SchoolDto[]>([]);

  static loadingControl = new LoadingControl();
  $isLoading = HeadTutorManagementComponent.loadingControl.$loading;

  ngOnInit() {
    this.reloadSchools();
  }

  private reloadSchools() {
    this.getListOfSchools$()
      .subscribe({
        next: (res) => this.$schools.set(res)
      });
  }

  @IndicateLoading(HeadTutorManagementComponent.loadingControl)
  private getListOfSchools$(): Observable<SchoolDto[]> {
    return this.schoolService.getListOfSchools()
      .pipe(first())
  }

  openCreateTeacherDialog() {
    const dialogRef = this.dialog.open(UpsertModalComponent);

    dialogRef.afterClosed()
      .pipe(
        first(),
        filter(res => !!res),
        switchMap((res) => this.schoolService.create(res))
      )
      .subscribe(() => this.reloadSchools());
  }

  edit() {
    this.reloadSchools()
  }
}
