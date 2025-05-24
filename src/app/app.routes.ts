import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: "Manage Participants",
    path: "manage-participants/tutors",
    loadComponent: () => import('./pages/people-management/tutor-management.component')
  },
  {
    title: 'Login',
    path: "login",
    loadComponent: () => import('./pages/login/login.component')
  }
];
