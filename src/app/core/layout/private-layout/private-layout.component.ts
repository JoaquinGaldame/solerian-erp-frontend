import { AsyncPipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../../../store/app.state';
import { AuthActions } from '../../auth/store/auth.actions';
import { selectCurrentUser } from '../../auth/store/auth.selectors';
import { APP_NAME } from '../../config/app.constants';
import { ThemeService } from '../../theme/theme.service';
import { PrivateHeaderComponent } from '../private-header/private-header.component';
import { NavigationItem } from '../models/navigation-item.model';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    PrivateHeaderComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-drawer-container class="app-shell app-shell-surface min-h-dvh w-full" autosize>
      <mat-drawer
        #drawer
        class="erp-sidenav w-72"
        [mode]="isDesktop() ? 'side' : 'over'"
        [opened]="isDesktop()"
      >
        <mat-toolbar class="app-sidebar-toolbar px-6 py-6">
          <div class="flex w-full items-center justify-between">
            <div>
              <p class="app-sidebar-label text-xs uppercase tracking-[0.3em]">ERP</p>
              <h2 class="app-sidebar-title mt-2 text-2xl font-semibold">{{ appName }}</h2>
            </div>
            <mat-chip class="app-badge px-3 py-1 text-xs font-semibold">Beta</mat-chip>
          </div>
        </mat-toolbar>

        <mat-divider></mat-divider>

        <mat-nav-list class="px-3 py-4">
          @for (item of navigation; track item.route) {
            <a
              mat-list-item
              [routerLink]="item.route"
              routerLinkActive="app-nav-link-active"
              class="app-nav-link mb-1 rounded-2xl"
              (click)="!isDesktop() && drawer.close()"
            >
              <mat-icon matListItemIcon fontSet="material-symbols-outlined">{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ item.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-drawer>

      <mat-drawer-content class="flex min-h-dvh min-w-0 flex-1 flex-col">
        <app-private-header
          [isDesktop]="isDesktop()"
          [theme]="themeService.currentTheme()"
          [currentUser]="currentUser$ | async"
          (menuToggled)="drawer.toggle()"
          (themeChanged)="setTheme($event)"
          (logoutRequested)="logout()"
        />
        <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <router-outlet />
        </main>
      </mat-drawer-content>
    </mat-drawer-container>
  `
})
export class PrivateLayoutComponent {
  private readonly store = inject<Store<AppState>>(Store);
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly appName = APP_NAME;
  protected readonly currentUser$ = this.store.select(selectCurrentUser);
  protected readonly themeService = inject(ThemeService);
  protected readonly isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 1024px)').pipe(map((state) => state.matches)),
    { initialValue: false }
  );
  protected readonly navigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/app/dashboard', icon: 'space_dashboard' },
    { label: 'Clientes', route: '/app/customers', icon: 'groups' },
    { label: 'Productos', route: '/app/products', icon: 'inventory_2' },
    { label: 'Inventario', route: '/app/inventory', icon: 'analytics' },
    { label: 'Ventas', route: '/app/sales', icon: 'storefront' },
    { label: 'Compras', route: '/app/purchases', icon: 'shopping_cart' },
    { label: 'Finanzas', route: '/app/finance', icon: 'payments' },
    { label: 'Reportes', route: '/app/reports', icon: 'receipt_long' },
    { label: 'AI Assistant', route: '/app/ai-assistant', icon: 'auto_awesome' }
  ];

  protected logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  protected setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }
}
