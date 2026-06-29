import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../auth/models/user.model';
import { AppTheme } from '../../theme/theme.model';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="app-header border-b backdrop-blur">
      <div class="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex min-w-0 items-start gap-3">
          @if (!isDesktop()) {
            <button
              mat-icon-button
              type="button"
              class="mt-0.5 shrink-0"
              aria-label="Abrir menu de navegacion"
              (click)="menuToggled.emit()"
            >
              <mat-icon fontSet="material-symbols-outlined">menu</mat-icon>
            </button>
          }

          <div class="min-w-0">
            <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.3em]">
              Plataforma operativa
            </p>
            <p class="text-app-strong mt-2 text-base leading-6 font-semibold sm:text-lg">
              Gestion centralizada y automatizada de los procesos operativos y administrativos.
            </p>
          </div>
        </div>

        <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            mat-icon-button
            type="button"
            class="theme-toggle theme-toggle-icon self-start sm:self-auto"
            aria-label="Cambiar tema"
            (click)="toggleTheme()"
          >
            <mat-icon fontSet="material-symbols-outlined">
              {{ theme() === 'light' ? 'dark_mode' : 'light_mode' }}
            </mat-icon>
          </button>

          <div class="app-toolbar flex min-w-0 items-center gap-3 rounded-2xl px-3 py-3 sm:px-4">
            <mat-icon class="shrink-0" fontSet="material-symbols-outlined">person</mat-icon>
            <div class="min-w-0 flex-1">
              <p class="text-app-strong truncate text-sm font-semibold">
                {{ currentUser()?.name || 'Usuario autenticado' }}
              </p>
              <p class="text-app-soft truncate text-xs uppercase tracking-[0.2em]">
                {{ currentUser()?.role || 'Sesion mock' }}
              </p>
            </div>
            <button
              mat-stroked-button
              type="button"
              class="erp-button-secondary shrink-0"
              (click)="logoutRequested.emit()"
            >
              <mat-icon fontSet="material-symbols-outlined">logout</mat-icon>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class PrivateHeaderComponent {
  readonly isDesktop = input.required<boolean>();
  readonly theme = input.required<AppTheme>();
  readonly currentUser = input<User | null>(null);

  readonly menuToggled = output<void>();
  readonly logoutRequested = output<void>();
  readonly themeChanged = output<AppTheme>();

  protected toggleTheme(): void {
    this.themeChanged.emit(this.theme() === 'light' ? 'dark' : 'light');
  }
}
