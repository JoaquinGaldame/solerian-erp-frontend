import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { APP_NAME } from '../../config/app.constants';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell min-h-dvh overflow-hidden">
      <div class="relative mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[1.15fr_0.85fr]">
        <section class="login-hero relative hidden overflow-hidden border-r border-(--color-border) lg:flex">
          <div class="hero-glow absolute inset-0 opacity-70">
            <div class="hero-orb absolute left-[8%] top-[12%] h-36 w-36 rounded-full bg-(--color-accent-soft) blur-3xl"></div>
            <div class="hero-orb hero-orb-delayed absolute right-[14%] bottom-[18%] h-52 w-52 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] blur-3xl"></div>
          </div>

          <div class="relative flex min-h-full w-full flex-col px-10 py-8 xl:px-14 xl:py-10">
            <div class="flex items-start justify-between gap-6">
              <div class="hero-copy max-w-3xl">
                <p class="text-app-strong text-lg font-semibold tracking-[0.26em]">SOLERIAN</p>
                <p class="text-app-soft mt-3 text-sm font-medium uppercase tracking-[0.34em]">
                  Solerian ERP
                </p>
                <h1 class="text-app-strong mt-8 text-5xl font-semibold tracking-tight xl:text-6xl">
                  Operate smarter with an AI-ready ERP platform.
                </h1>
                <p class="text-app-soft mt-5 max-w-2xl text-lg leading-8">
                  Manage finance, inventory, sales, purchases and business insights from one
                  modern workspace.
                </p>
              </div>

              <button
                mat-icon-button
                type="button"
                class="theme-toggle theme-toggle-icon hero-theme-switch"
                aria-label="Cambiar tema"
                (click)="themeService.toggleTheme()"
              >
                <mat-icon fontSet="material-symbols-outlined">
                  {{ themeService.currentTheme() === 'light' ? 'dark_mode' : 'light_mode' }}
                </mat-icon>
              </button>
            </div>

            <div class="mt-12 grow">
              <div class="dashboard-preview panel-muted mx-auto grid max-w-4xl gap-4 p-5 xl:grid-cols-[1.2fr_0.8fr] xl:p-6">
                <div class="space-y-4">
                  <mat-card class="panel preview-card p-5">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.24em]">
                          Revenue
                        </p>
                        <p class="text-app-strong mt-3 text-3xl font-semibold">$248,400</p>
                        <p class="text-app-soft mt-2 text-sm">12.4% versus last month</p>
                      </div>
                      <mat-chip class="badge-info text-xs font-semibold">Live</mat-chip>
                    </div>
                    <div class="mt-6 grid grid-cols-4 items-end gap-2">
                      <span class="h-14 rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)]"></span>
                      <span class="h-10 rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_24%,transparent)]"></span>
                      <span class="h-16 rounded-2xl bg-[color-mix(in_srgb,var(--color-accent)_24%,transparent)]"></span>
                      <span class="h-12 rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"></span>
                    </div>
                  </mat-card>

                  <div class="grid gap-4 md:grid-cols-2">
                    <mat-card class="panel preview-card p-4">
                      <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.22em]">
                        Receivables
                      </p>
                      <p class="text-app-strong mt-3 text-2xl font-semibold">$82,910</p>
                      <p class="text-app-soft mt-2 text-sm">28 invoices pending collection</p>
                    </mat-card>
                    <mat-card class="panel preview-card p-4">
                      <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.22em]">
                        Inventory
                      </p>
                      <p class="text-app-strong mt-3 text-2xl font-semibold">1,284 SKUs</p>
                      <p class="text-app-soft mt-2 text-sm">9 items below safety stock</p>
                    </mat-card>
                  </div>
                </div>

                <div class="space-y-4">
                  <mat-card class="panel preview-card p-4">
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.22em]">
                          Monthly Sales
                        </p>
                        <p class="text-app-strong mt-3 text-2xl font-semibold">$96,540</p>
                      </div>
                      <div class="grid grid-cols-3 items-end gap-1">
                        <span class="h-9 w-3 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"></span>
                        <span class="h-14 w-3 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_26%,transparent)]"></span>
                        <span class="h-11 w-3 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_28%,transparent)]"></span>
                      </div>
                    </div>
                  </mat-card>

                  <mat-card class="panel preview-card p-4">
                    <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.22em]">
                      Customers
                    </p>
                    <div class="mt-4 space-y-3">
                      <div class="flex items-center justify-between rounded-2xl bg-(--color-surface-soft) px-4 py-3">
                        <span class="text-app text-sm font-medium">Northwind Retail</span>
                        <span class="text-app-soft text-xs">Active</span>
                      </div>
                      <div class="flex items-center justify-between rounded-2xl bg-(--color-surface-soft) px-4 py-3">
                        <span class="text-app text-sm font-medium">Vertex Supply</span>
                        <span class="text-app-soft text-xs">Review</span>
                      </div>
                      <div class="flex items-center justify-between rounded-2xl bg-(--color-surface-soft) px-4 py-3">
                        <span class="text-app text-sm font-medium">Atlas Holdings</span>
                        <span class="text-app-soft text-xs">Priority</span>
                      </div>
                    </div>
                  </mat-card>

                  <mat-card class="surface-soft preview-card p-4">
                    <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.22em]">
                      Workspace
                    </p>
                    <p class="text-app-strong mt-2 text-base font-semibold">{{ appName }}</p>
                    <p class="text-app-soft mt-2 text-sm leading-6">
                      Unified operations, finance visibility and scalable workflows prepared for
                      future AI assistance.
                    </p>
                  </mat-card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="relative flex min-h-full items-center justify-center px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
          <div class="absolute right-4 top-4 z-10 lg:hidden">
            <button
              mat-icon-button
              type="button"
              class="theme-toggle theme-toggle-icon"
              aria-label="Cambiar tema"
              (click)="themeService.toggleTheme()"
            >
              <mat-icon fontSet="material-symbols-outlined">
                {{ themeService.currentTheme() === 'light' ? 'dark_mode' : 'light_mode' }}
              </mat-icon>
            </button>
          </div>

          <div class="w-full max-w-120">
            <mat-card class="panel login-card p-6 sm:p-8">
              <router-outlet />
            </mat-card>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
    }

    .login-hero,
    .login-card {
      animation: login-enter 560ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .hero-copy,
    .dashboard-preview {
      opacity: 0;
      transform: translateY(20px);
      animation: hero-stagger 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .dashboard-preview {
      animation-delay: 180ms;
    }

    .preview-card {
      transition:
        transform 220ms ease,
        box-shadow 220ms ease,
        border-color 220ms ease,
        background-color 220ms ease;
      animation: float-card 9s ease-in-out infinite;
    }

    .preview-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 42px color-mix(in srgb, var(--color-primary) 12%, transparent);
      border-color: color-mix(in srgb, var(--color-primary) 20%, var(--color-border));
    }

    .hero-glow {
      animation: glow-drift 18s ease-in-out infinite;
    }

    .hero-orb {
      animation: orb-pulse 11s ease-in-out infinite;
    }

    .hero-orb-delayed {
      animation-delay: 1.4s;
    }

    .login-card {
      backdrop-filter: blur(8px);
      transition:
        transform 240ms ease,
        box-shadow 240ms ease,
        border-color 240ms ease;
    }

    .login-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 26px 54px color-mix(in srgb, var(--color-primary) 12%, transparent);
    }

    @keyframes login-enter {
      from {
        opacity: 0;
        transform: translateY(18px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes hero-stagger {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float-card {
      0%,
      100% {
        transform: translateY(0);
      }

      50% {
        transform: translateY(-6px);
      }
    }

    @keyframes glow-drift {
      0%,
      100% {
        transform: translate3d(0, 0, 0);
      }

      50% {
        transform: translate3d(8px, -10px, 0);
      }
    }

    @keyframes orb-pulse {
      0%,
      100% {
        opacity: 0.85;
        transform: scale(1);
      }

      50% {
        opacity: 1;
        transform: scale(1.06);
      }
    }
  `
})
export class PublicLayoutComponent {
  protected readonly appName = APP_NAME;
  protected readonly themeService = inject(ThemeService);
}
