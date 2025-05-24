import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserRole} from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class SessionAccessFacadeService {
  private session = inject(AuthService);

  get user() {
    return this.session.getUser();
  }

  public hasRoleAccess(requiredRoles: UserRole | Array<UserRole>) {
    if (!this.user) return false;
    requiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return [this.user.role].some(role => requiredRoles.includes(role));
  }
}
