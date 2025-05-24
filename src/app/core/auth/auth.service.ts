// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import {map, Observable, of, throwError} from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(credentials: { email?: string | null; password?: string | null }): Observable<AuthResponse> {
    // Simulate API call
    return of(null).pipe(
      delay(1500), // Simulate network latency
      tap(() => {
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password123'
        ) {
          // Simulate successful login
          const mockResponse: AuthResponse = {
            token: 'fake-jwt-token-12345',
            username: 'TestUser',
            email: credentials.email,
          };
          localStorage.setItem('authToken', mockResponse.token); // Basic token storage
          localStorage.setItem('username', mockResponse.username);
          // In a real app, you'd navigate to a dashboard or emit an event
          console.log('Login successful', mockResponse);
        } else {
          // Simulate failed login
          console.error('Login failed: Invalid credentials');
          throw new Error('Invalid email or password.');
        }
      }),
      // This part will only be reached on success due to throwError
      map(() => ({
        token: 'fake-jwt-token-12345',
        username: 'TestUser',
        email: credentials.email as string,
      }))
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    // In a real app, you'd navigate to the login page
    console.log('User logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
