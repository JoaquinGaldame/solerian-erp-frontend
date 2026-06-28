import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-reports-home-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Reportes"
        title="Centro de reportes"
        subtitle="Entrada preparada para reportes operativos, financieros y analíticos."
      />
      <app-empty-state
        title="Reportes listos para crecer"
        description="La home de reportes queda como punto de entrada para futuros filtros, exportaciones y dashboards especializados."
      />
    </div>
  `
})
export class ReportsHomePageComponent {}
