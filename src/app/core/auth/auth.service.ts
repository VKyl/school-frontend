import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, catchError, first, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginResponse, UserLoginDto} from '../models/constants';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  $user = signal<LoginResponse | null>(null);
  userDataLoaded$ = new BehaviorSubject<boolean>(false);

  login(credentials: UserLoginDto) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, credentials, { withCredentials: true }).pipe(
      first(),
      tap((res) => this.setUser(res)),
    );
  }

  reloadUser() {
    return this.http.get<LoginResponse>(`${environment.apiUrl}/api/auth/get_current_role`, {
      withCredentials: true
    })
      .pipe(
        catchError(() => {
          this.logout();
          return of(null);
        }),
        tap((res) => {
            this.setUser(res);
            this.setUserDataAsLoaded();
          },
        )
      );
  }

  logout(): void {
    this.setUser(null);
    if (localStorage.getItem('userId')) this.router.navigate(['/login']);
    localStorage.clear();
  }

  getUser() {
    return this.$user();
  }

  setUser(user: LoginResponse | null): void {
    if (user) localStorage.setItem('userId', String(user.id));
    this.$user.set(user);
  }

  setUserDataAsLoaded(): void {
    this.userDataLoaded$.next(true);
  }
}
