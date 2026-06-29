import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="panel-muted flex flex-col items-start gap-3 p-6">
      <mat-chip class="btn-primary text-xs font-semibold">
        {{ eyebrow() }}
      </mat-chip>
      <h3 class="text-app-strong text-xl font-semibold">{{ title() }}</h3>
      <p class="text-app-soft max-w-2xl text-sm leading-6">{{ description() }}</p>
    </mat-card>
  `
})
export class EmptyStateComponent {
  readonly eyebrow = input('Placeholder');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
