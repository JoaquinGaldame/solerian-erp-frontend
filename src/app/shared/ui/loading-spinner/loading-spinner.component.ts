import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 text-sm text-slate-600">
      <div
        class="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700"
      ></div>
      <span>{{ label() }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  readonly label = input('Cargando...');
}
