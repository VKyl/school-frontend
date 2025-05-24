import { Routes } from '@angular/router';
import {authGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  {
    title: "Main Page",
    path: "",
    pathMatch: "full",
    loadComponent: () => import("./pages/landing/landing.component")
  },
  {
    title: "Manage Participants",
    path: "manage-participants",
    canActivate: [authGuard],
    loadChildren: () => import("./pages/people-management/routes").then(r => r.ROUTES)
  },
  {
    title: 'Login',
    path: "login",
    loadComponent: () => import('./pages/login/login.component')
  },
  {
    title: "Not Found",
    path: "**",
    loadComponent: () => import('./pages/not-found/not-found.component')
  }
];
