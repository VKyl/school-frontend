import {Routes} from '@angular/router';
import TutorManagementComponent from './tutors/tutor-management.component';


export const ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: 'tutors',
  },
  {
    path: "tutors",
    pathMatch: "full",
    loadComponent: () => TutorManagementComponent
  },
  // {
  //   path: "students",
  //   pathMatch: "full",
  //   loadComponent: () => TutorManagementComponent
  // }
]
