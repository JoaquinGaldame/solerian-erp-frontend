import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-app-soft flex items-center gap-3 text-sm">
      <mat-progress-spinner
        class="erp-spinner"
        mode="indeterminate"
        [diameter]="18"
        [strokeWidth]="3"
      />
      <span>{{ label() }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  readonly label = input('Cargando...');
}
