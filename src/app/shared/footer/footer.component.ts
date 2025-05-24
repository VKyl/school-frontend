import { Component } from '@angular/core';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

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
  currentYear = new Date().getFullYear();
}
