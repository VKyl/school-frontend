import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {UserDeleteModalComponent} from '../modals/user-delete-modal/user-delete-modal.component';
import {filter, first} from 'rxjs';
import {UpsertModalComponent} from '../modals/upsert-modal/upsert-modal.component';
import {HeadTutor} from '../../../../core/models/users.dto';

@Component({
  selector: 'app-head-tutor-item',
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
  templateUrl: './head-tutor-item.component.html',
  styleUrl: './head-tutor-item.component.css'
})
export default class HeadTutorItemComponent {
  @Input({required: true}) headTutor!: HeadTutor;
  @Output() onEdit = new EventEmitter<HeadTutor>();

  private readonly modal = inject(MatDialog);

  edit(e: MouseEvent){
    e.stopPropagation();
    this.modal.open(UpsertModalComponent, {
      data: this.headTutor
    }).afterClosed().pipe(
      first(),
      filter(de => !!de)
   ).subscribe(
      (res) => {
        this.onEdit.emit({id: this.headTutor.id, ...res});
      }
   );
  }

  delete(e: MouseEvent){
    e.stopPropagation();
   this.modal.open(UserDeleteModalComponent, {
     data: {
       name: this.headTutor.name,
       email: this.headTutor.email
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
