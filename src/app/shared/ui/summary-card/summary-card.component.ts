import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="panel flex flex-col gap-3 p-5">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">{{ label() }}</p>
          <h3 class="mt-2 text-3xl font-semibold text-slate-950">{{ value() }}</h3>
        </div>
        <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
          {{ trend() }}
        </span>
      </div>
      <p class="text-sm text-slate-600">{{ description() }}</p>
    </article>
  `
})
export class SummaryCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly trend = input('Estable');
  readonly description = input.required<string>();
}
