import {Component, inject} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgFor, NgIf} from '@angular/common';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {StudentConfig, TutorConfig} from './config/people-config';
import {StudentViewDto, TutorViewDto} from './models/users.dto';
import ParticipantItemComponent from './participant-item/participant-item.component';
import {MatDialog} from '@angular/material/dialog';
import {UpsertModalComponent} from './upsert-modal/upsert-modal.component';
import {filter, first} from 'rxjs';

enum USER_TYPES {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR"
}

const userConfigResolver = {
  [USER_TYPES.STUDENT]: StudentConfig,
  [USER_TYPES.TUTOR]: TutorConfig
}

@Component({
  selector: 'app-people-management',
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
    ParticipantItemComponent
  ],
  templateUrl: './people-management.component.html',
  styleUrl: './people-management.component.css'
})
export default class PeopleManagementComponent {
  private readonly dialog = inject(MatDialog)

  participants: (TutorViewDto | StudentViewDto)[] = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      group: "1a"
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    {
      name: 'Carol White',
      email: 'carol@example.com',
      group: "2a"
    }
  ];

  public resolveConfig(participant: StudentViewDto | TutorViewDto): StudentConfig | TutorConfig {
    if (participant.hasOwnProperty('group'))
      return new userConfigResolver[USER_TYPES.STUDENT]();
    return new userConfigResolver[USER_TYPES.TUTOR]();
  }

  click(e: MouseEvent) {
    e.stopPropagation();
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
      });
  }
}
