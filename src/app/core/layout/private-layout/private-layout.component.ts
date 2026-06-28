import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { APP_NAME } from '../../config/app.constants';
import { NavigationItem } from '../models/navigation-item.model';
import { AuthActions } from '../../auth/store/auth.actions';
import { selectCurrentUser } from '../../auth/store/auth.selectors';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-dvh w-full bg-transparent">
      <div class="flex min-h-dvh w-full flex-col lg:flex-row">
        <aside class="border-b border-slate-200 bg-slate-950 text-white lg:flex lg:min-h-dvh lg:w-72 lg:flex-col lg:border-b-0 lg:border-r lg:border-slate-800">
          <div class="flex items-center justify-between px-6 py-6">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-slate-400">ERP</p>
              <h2 class="mt-2 text-2xl font-semibold">{{ appName }}</h2>
            </div>
            <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              Beta
            </span>
          </div>

          <nav class="grid gap-1 px-3 pb-6 lg:flex-1 lg:content-start">
            @for (item of navigation; track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-white text-slate-950 shadow-lg shadow-slate-950/25"
                class="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
              >
                <span>{{ item.label }}</span>
                @if (item.badge) {
                  <span class="rounded-full bg-sky-500/20 px-2 py-1 text-[11px] font-semibold text-sky-200">
                    {{ item.badge }}
                  </span>
                }
              </a>
            }
          </nav>
        </aside>

        <div class="flex min-h-dvh min-w-0 flex-1 flex-col">
          <header class="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div class="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Plataforma operativa
                </p>
                <p class="mt-2 text-lg font-semibold text-slate-950">
                  Gestion centralizada para operaciones, finanzas e inventario
                </p>
              </div>

              <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p class="text-sm font-semibold text-slate-900">
                    {{ (currentUser$ | async)?.name || 'Usuario autenticado' }}
                  </p>
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {{ (currentUser$ | async)?.role || 'Sesion mock' }}
                  </p>
                </div>
                <button
                  type="button"
                  (click)="logout()"
                  class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  Logout
                </button>
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
}
