import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {filter, map, take} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userDataLoaded$.pipe(
    filter(loaded => loaded),
    take(1),
    map(() => {
      const user = authService.getUser();
      return user ? true : router.createUrlTree(['/login']);
    })
  );
};
