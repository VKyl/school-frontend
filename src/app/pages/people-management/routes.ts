import {Routes} from '@angular/router';
import TutorManagementComponent from './tutors/tutor-management.component';
import HeadTutorManagementComponent from './head-tutors/head-tutor-management.component';


export const ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: 'tutors',
  },
  {
    path: "tutors",
    title: "Tutors Management",
    loadComponent: () => TutorManagementComponent
  },
  {
    path: "head-tutors",
    title: "Head Tutors Management",
    loadComponent: () => HeadTutorManagementComponent
  }
  // {
  //   path: "students",
  //   pathMatch: "full",
  //   loadComponent: () => HeadTutorManagementComponent
  // }
]
