import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: "Manage Participants",
    path: "manage-participants",
    loadChildren: () => import("./pages/people-management/routes").then(r => r.ROUTES)
  },
  {
    title: 'Login',
    path: "login",
    loadComponent: () => import('./pages/login/login.component')
  }
];
