import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-2">
        <p class="text-app-soft text-xs font-semibold uppercase tracking-[0.3em]">{{ eyebrow() }}</p>
        <div>
          <h1 class="text-app-strong text-3xl font-semibold">{{ title() }}</h1>
          <p class="text-app-soft mt-2 max-w-3xl text-sm leading-6">{{ subtitle() }}</p>
        </div>
      </div>
      @if (actionLabel() && actionRoute()) {
        <a
          [routerLink]="actionRoute()"
          class="btn-primary inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5"
        >
          {{ actionLabel() }}
        </a>
      }
    </header>
  `
})
export class PageHeaderComponent {
  readonly eyebrow = input('Operacion');
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly actionLabel = input('');
  readonly actionRoute = input('');
}
