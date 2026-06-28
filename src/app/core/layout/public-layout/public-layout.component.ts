import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { APP_NAME } from '../../config/app.constants';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell min-h-screen px-4 py-8">
      <div class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="space-y-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <span class="badge-info inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Plataforma ERP modular
            </span>

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
          </div>

          <div class="space-y-5">
            <h1 class="text-app-strong max-w-2xl text-5xl font-semibold tracking-tight">
              {{ appName }} prepara la operacion completa de tu empresa desde una sola base.
            </h1>
            <p class="text-app-soft max-w-2xl text-lg leading-8">
              Esta primera version deja lista una shell profesional y escalable para ventas, compras,
              inventario, finanzas, clientes, reportes y futuras capacidades asistidas por IA.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="panel-muted p-4">
              <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.2em]">Stack</p>
              <p class="text-app-strong mt-3 text-lg font-semibold">Angular 20 + NgRx</p>
            </div>
            <div class="panel-muted p-4">
              <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.2em]">UI</p>
              <p class="text-app-strong mt-3 text-lg font-semibold">Tailwind y componentes base</p>
            </div>
            <div class="panel-muted p-4">
              <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.2em]">Estado</p>
              <p class="text-app-strong mt-3 text-lg font-semibold">Auth mock listo para API real</p>
            </div>
          </div>
        </section>

        <div class="panel mx-auto w-full max-w-xl p-6 sm:p-8">
          <router-outlet />
        </div>
      </div>
    </div>
  `
})
export class PublicLayoutComponent {
  protected readonly appName = APP_NAME;
  protected readonly themeService = inject(ThemeService);

  protected setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }
}
