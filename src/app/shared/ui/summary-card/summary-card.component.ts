import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="panel flex flex-col gap-3 p-5">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-app-soft text-sm font-medium">{{ label() }}</p>
          <h3 class="text-app-strong mt-2 text-3xl font-semibold">{{ value() }}</h3>
        </div>
        <mat-chip class="badge-info text-xs font-semibold">
          {{ trend() }}
        </mat-chip>
      </div>
      <p class="text-app-soft text-sm">{{ description() }}</p>
    </mat-card>
  `
})
export class SummaryCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly trend = input('Estable');
  readonly description = input.required<string>();
}
