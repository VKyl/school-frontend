import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatLine} from '@angular/material/core';
import {NgForOf} from '@angular/common';
import ChatInputComponent from '../../shared/chat/chat.component';

@Component({
  selector: 'app-assignment-helper',
  standalone: true,
  templateUrl: './assignment-helper.component.html',
  styleUrls: ['./assignment-helper.component.css'],
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatIcon,
    MatLine,
    NgForOf,
    ChatInputComponent
  ]
})
export default class AssignmentHelperComponent {
  mockChats = ['Math Homework', 'Essay Outline', 'Physics Lab', 'Group Project'];
}
