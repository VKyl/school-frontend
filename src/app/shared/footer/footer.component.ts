import {Component, Input} from '@angular/core';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

export enum THEMES {
  DARK= "DARK",
  LIGHT = "LIGHT"
}

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    MatAnchor,
    RouterLink
  ],
  styleUrls: ['./footer.component.css']
})
export default class FooterComponent {
  @Input() theme: THEMES = THEMES.LIGHT;
  currentYear = new Date().getFullYear();
  protected readonly THEMES = THEMES;
}
