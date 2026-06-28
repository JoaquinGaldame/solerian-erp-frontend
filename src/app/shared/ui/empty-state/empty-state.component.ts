import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="panel-muted flex flex-col items-start gap-3 p-6">
      <span class="btn-primary rounded-full px-3 py-1 text-xs font-semibold">
        {{ eyebrow() }}
      </span>
      <h3 class="text-app-strong text-xl font-semibold">{{ title() }}</h3>
      <p class="text-app-soft max-w-2xl text-sm leading-6">{{ description() }}</p>
    </section>
  `
})
export class EmptyStateComponent {
  readonly eyebrow = input('Placeholder');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
