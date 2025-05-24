import {inject, Injectable} from '@angular/core';
import {UserViewDto} from './models/users.dto';
import {UserRole} from './models/constants';
import {first} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  create(user: UserViewDto, role: UserRole){
    return this.http.post(
      `${environment.apiUrl}/api/user/create`,
      {
        role: role,
        pib: user.name,
        email: user.email
      }
    ).pipe(
      first(),
      tap((res) => {
        console.log(res)
        return res;
      })
    );
  }
}
