import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent, {THEMES} from './shared/footer/footer.component';
import HeaderComponent from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'school-frontend';
  protected readonly location = location;
  protected readonly THEMES = THEMES;

  ngOnInit(): void {
    console.log(this.location.href);
  }
}
