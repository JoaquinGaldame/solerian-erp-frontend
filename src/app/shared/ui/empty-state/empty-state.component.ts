import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="panel-muted flex flex-col items-start gap-3 p-6">
      <span class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
        {{ eyebrow() }}
      </span>
      <h3 class="text-xl font-semibold text-slate-900">{{ title() }}</h3>
      <p class="max-w-2xl text-sm leading-6 text-slate-600">{{ description() }}</p>
    </section>
  `
})
export class EmptyStateComponent {
  readonly eyebrow = input('Placeholder');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
