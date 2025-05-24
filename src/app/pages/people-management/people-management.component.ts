import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgFor, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

interface Participant {
  fullName: string;
  email: string;
  role: string;
  groupNumber?: number;
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
    MatButton,
    MatIcon
  ],
  templateUrl: './people-management.component.html',
  styleUrl: './people-management.component.css'
})
export default class PeopleManagementComponent {
  participants: Participant[] = [
    {
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Student',
      groupNumber: 1
    },
    {
      fullName: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Mentor'
    },
    {
      fullName: 'Carol White',
      email: 'carol@example.com',
      role: 'Student',
      groupNumber: 2
    }
  ];

  click(e: MouseEvent) {
    e.stopPropagation();
  }
}
