import {inject, Injectable} from '@angular/core';
import {UserRole, UserViewDto} from './users.dto';
import {first} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  create(user: UserViewDto, role: UserRole){
    return this.http.put(
      `${environment.apiUrl}/api/user/create`,
      {
        role: role,
        pib: user.name,
        email: user.email
      }
    ).pipe(
      first(),
    );
  }
}
