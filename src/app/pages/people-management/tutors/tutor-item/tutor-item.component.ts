import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {Tutor} from '../models/users.dto';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {UserDeleteModalComponent} from '../modals/user-delete-modal/user-delete-modal.component';
import {filter, first} from 'rxjs';
import {UpsertModalComponent} from '../modals/upsert-modal/upsert-modal.component';

@Component({
  selector: 'app-tutor-item',
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
  templateUrl: './tutor-item.component.html',
  styleUrl: './tutor-item.component.css'
})
export default class TutorItemComponent {
  @Input({required: true}) tutor!: Tutor;
  @Output() onEdit = new EventEmitter<Tutor>();

  private readonly modal = inject(MatDialog);

  edit(e: MouseEvent){
    e.stopPropagation();
    this.modal.open(UpsertModalComponent, {
      data: this.tutor
    }).afterClosed().pipe(
      first(),
      filter(de => !!de)
   ).subscribe(
      (res) => {
        this.onEdit.emit({id: this.tutor.id, ...res});
      }
   );
  }

  delete(e: MouseEvent){
    e.stopPropagation();
   this.modal.open(UserDeleteModalComponent, {
     data: {
       name: this.tutor.name,
       email: this.tutor.email
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
