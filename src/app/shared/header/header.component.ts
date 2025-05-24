import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatAnchor,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  userRole = 'Викладач';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    return this.router.navigate(['/login']);
  }

  toggleSidenav() {
    console.log('Відкрити сайдбар або мобільне меню');
    this.menuToggle.emit();
  }
}
