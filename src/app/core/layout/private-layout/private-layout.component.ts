import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.state';
import { AuthActions } from '../../auth/store/auth.actions';
import { selectCurrentUser } from '../../auth/store/auth.selectors';
import { APP_NAME } from '../../config/app.constants';
import { ThemeService } from '../../theme/theme.service';
import { NavigationItem } from '../models/navigation-item.model';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell min-h-dvh w-full">
      <div class="flex min-h-dvh w-full flex-col lg:flex-row">
        <aside class="app-sidebar border-b lg:flex lg:min-h-dvh lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
          <div class="flex items-center justify-between px-6 py-6">
            <div>
              <p class="app-sidebar-label text-xs uppercase tracking-[0.3em]">ERP</p>
              <h2 class="mt-2 text-2xl font-semibold">{{ appName }}</h2>
            </div>
            <span class="app-badge rounded-full px-3 py-1 text-xs font-semibold">Beta</span>
          </div>

          <nav class="grid gap-1 px-3 pb-6 lg:flex-1 lg:content-start">
            @for (item of navigation; track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="app-nav-link-active"
                class="app-nav-link flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition"
              >
                <span>{{ item.label }}</span>
                @if (item.badge) {
                  <span class="app-badge rounded-full px-2 py-1 text-[11px] font-semibold">
                    {{ item.badge }}
                  </span>
                }
              </a>
            }
          </nav>
        </aside>

        <div class="flex min-h-dvh min-w-0 flex-1 flex-col">
          <header class="app-header border-b backdrop-blur">
            <div class="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.3em]">
                  Plataforma operativa
                </p>
                <p class="text-app-strong mt-2 text-lg font-semibold">
                  Gestion centralizada para operaciones, finanzas e inventario
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <div class="theme-toggle inline-flex rounded-2xl p-1">
                  <button
                    type="button"
                    (click)="setTheme('light')"
                    [class.theme-toggle-option-active]="themeService.currentTheme() === 'light'"
                    class="theme-toggle-option rounded-xl px-3 py-2 text-sm font-semibold transition"
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    (click)="setTheme('dark')"
                    [class.theme-toggle-option-active]="themeService.currentTheme() === 'dark'"
                    class="theme-toggle-option rounded-xl px-3 py-2 text-sm font-semibold transition"
                  >
                    Dark
                  </button>
                </div>

                <div class="app-toolbar flex items-center gap-3 rounded-2xl px-4 py-3">
                  <div>
                    <p class="text-app-strong text-sm font-semibold">
                      {{ (currentUser$ | async)?.name || 'Usuario autenticado' }}
                    </p>
                    <p class="text-app-soft text-xs uppercase tracking-[0.2em]">
                      {{ (currentUser$ | async)?.role || 'Sesion mock' }}
                    </p>
                  </div>
                  <button
                    type="button"
                    (click)="logout()"
                    class="btn-secondary rounded-xl px-3 py-2 text-sm font-semibold transition hover:opacity-90"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <router-outlet />
          </main>
        </div>
      </div>
    </div>
  `
})
export class PrivateLayoutComponent {
  private readonly store = inject<Store<AppState>>(Store);

  protected readonly appName = APP_NAME;
  protected readonly currentUser$ = this.store.select(selectCurrentUser);
  protected readonly themeService = inject(ThemeService);
  protected readonly navigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/app/dashboard' },
    { label: 'Clientes', route: '/app/customers' },
    { label: 'Productos', route: '/app/products' },
    { label: 'Inventario', route: '/app/inventory' },
    { label: 'Ventas', route: '/app/sales' },
    { label: 'Compras', route: '/app/purchases' },
    { label: 'Finanzas', route: '/app/finance' },
    { label: 'Reportes', route: '/app/reports' },
    { label: 'AI Assistant', route: '/app/ai-assistant', badge: 'Futuro' }
  ];

  protected logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  protected setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }
}
