import {Component, Input} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {StudentViewDto, User} from '../models/users.dto';
import {MatIcon} from '@angular/material/icon';
import {BaseUserConfig} from '../config/people-config';

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
  @Input({required: true}) participant!: StudentViewDto | ;
  @Input({required: true}) config!: BaseUserConfig<User>;
}
