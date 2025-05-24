import {Component, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {SessionAccessFacadeService} from '../../core/auth/session-access.facade.service';
import {UserRole} from '../../core/models/constants';
import {MenuItem} from '../../core/models/menu-item';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
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
export default class HeaderComponent {
  private router = inject(Router);
  readonly sessionService = inject(AuthService);
  private readonly sessionAccessFacadeService = inject(SessionAccessFacadeService);
  @Output() menuToggle = new EventEmitter<void>();
  userRole = 'Викладач';

  $menuItems = signal<MenuItem[]>([
    {
      label: 'Main',
      link: '/'
    }
  ]);

  constructor() {
    effect(() => {
      console.log('effect', this.sessionService.$user());
      if (this.sessionAccessFacadeService.hasRoleAccess(UserRole.ADMIN)) {
        this.$menuItems.set([
          {
            label: 'Головна',
            link: '/'
          },
          {
            label: 'Заучі',
            link: '/manage-participants/head-tutors'
          },
        ]);
      }
      if (this.sessionAccessFacadeService.hasRoleAccess(UserRole.HEAD_TEACHER)) {
        this.$menuItems.set([
          {
            label: 'Головна',
            link: '/'
          },
          {
           label: 'Вчителі',
           link: '/manage-participants/tutors'
          },
          {
            label: 'Твій помічник',
            link: 'assignment-helper'
          }
        ]);
      }
    });
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['/login']);
  }

  toggleSidenav() {
    console.log('Відкрити сайдбар або мобільне меню');
    this.menuToggle.emit();
  }
}
