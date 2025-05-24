import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent, {THEMES} from './shared/footer/footer.component';
import HeaderComponent from './shared/header/header.component';
import {AuthService} from './core/auth/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, AsyncPipe, NgIf, MatProgressBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  readonly sessionService = inject(AuthService);
  protected readonly location = location;
  protected readonly THEMES = THEMES;

  ngOnInit() {
    this.sessionService.reloadUser().subscribe();
  }
}
