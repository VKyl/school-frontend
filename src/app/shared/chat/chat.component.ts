import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    FormsModule,
    MatIcon
  ]
})
export default class ChatInputComponent {
  message: string = '';

  @Output() send = new EventEmitter<string>();

  sendMessage() {
    if (this.message.trim()) {
      this.send.emit(this.message.trim());
      this.message = '';
    }
  }
}
