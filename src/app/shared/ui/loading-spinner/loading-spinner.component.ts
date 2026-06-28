import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-app-soft flex items-center gap-3 text-sm">
      <div
        class="border-app h-5 w-5 animate-spin rounded-full border-2 border-t-[var(--color-primary)]"
      ></div>
      <span>{{ label() }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  readonly label = input('Cargando...');
}
