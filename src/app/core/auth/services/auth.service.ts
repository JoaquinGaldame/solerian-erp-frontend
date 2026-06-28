import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';

const SESSION_KEY = 'solerian.erp.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(payload: LoginRequest): Observable<LoginResponse> {
    if (!payload.email || !payload.password) {
      return throwError(() => new Error('Credenciales incompletas.'));
    }

    const response: LoginResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 'usr-001',
        name: 'Alicia Romero',
        email: payload.email,
        role: 'ADMIN'
      }
    };

    this.persistSession(response);
    return of(response).pipe(delay(700));
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    return this.restoreSession()?.user ?? null;
  }

  getToken(): string | null {
    return this.restoreSession()?.token ?? null;
  }

  hasSession(): boolean {
    return Boolean(this.restoreSession()?.token);
  }

  restoreSession(): LoginResponse | null {
    const serialized = localStorage.getItem(SESSION_KEY);
    if (!serialized) {
      return null;
    }

    try {
      return JSON.parse(serialized) as LoginResponse;
    } catch {
      this.logout();
      return null;
    }
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(response));
  }
}
