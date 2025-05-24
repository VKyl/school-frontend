import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: "Manage Participants",
    path: "manage-participants",
    loadComponent: () => import('./pages/people-management/people-management.component')
  }
];
