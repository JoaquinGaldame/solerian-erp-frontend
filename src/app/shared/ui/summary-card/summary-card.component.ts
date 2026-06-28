import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="panel flex flex-col gap-3 p-5">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-app-soft text-sm font-medium">{{ label() }}</p>
          <h3 class="text-app-strong mt-2 text-3xl font-semibold">{{ value() }}</h3>
        </div>
        <span class="badge-info rounded-full px-3 py-1 text-xs font-semibold">
          {{ trend() }}
        </span>
      </div>
      <p class="text-app-soft text-sm">{{ description() }}</p>
    </article>
  `
})
export class SummaryCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly trend = input('Estable');
  readonly description = input.required<string>();
}
