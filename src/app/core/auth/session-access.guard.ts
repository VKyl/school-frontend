import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {SessionAccessFacadeService} from "./session-access.facade.service";
import {filter, of, switchMap, take} from "rxjs";
import {AuthService} from './auth.service';

export const hasAccessToRouteGuard = (allowedRoles: any | any[]): CanActivateFn => () => {
  const router = inject(Router);
  const sessionService = inject(AuthService);
  const sessionAccessFacadeService = inject(SessionAccessFacadeService);
  return sessionService.userDataLoaded$
    .pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(
        () => sessionAccessFacadeService.hasRoleAccess(allowedRoles) ? of(true) : router.navigate(['/access-denied'])
      )
    )
}
