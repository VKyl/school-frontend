import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAccessFacadeService {
  private session = inject(AuthService);

  get user() {
    return this.session.getUser();
  }

  public hasRoleAccess(requiredRoles: string | Array<string>) {
    requiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return [this.user.role].some(role => requiredRoles.includes(role));
  }
}
