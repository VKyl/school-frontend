import {Component, inject, Input} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {ParticipantViewDto} from '../models/users.dto';
import {MatIcon} from '@angular/material/icon';
import {BaseUserConfig} from '../config/people-config';
import {MatDialog} from '@angular/material/dialog';
import {UserDeleteModalComponent} from '../modals/user-delete-modal/user-delete-modal.component';
import {filter, first} from 'rxjs';

@Component({
  selector: 'app-participant-item',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './participant-item.component.html',
  styleUrl: './participant-item.component.css'
})
export default class ParticipantItemComponent {
  @Input({required: true}) participant!: ParticipantViewDto;
  @Input({required: true}) config!: BaseUserConfig<any>;

  private readonly modal = inject(MatDialog);

  edit(e: MouseEvent){
    e.stopPropagation();
    console.log("edit")
  }

  delete(e: MouseEvent){
    e.stopPropagation();
   this.modal.open(UserDeleteModalComponent, {
     data: {
       name: this.participant.name,
       email: this.participant.email
     }
   }).afterClosed().pipe(
      first(),
      filter(de => !!de)
   ).subscribe(
      (res) => {
        console.log(res);
      }
   );

  }
}
