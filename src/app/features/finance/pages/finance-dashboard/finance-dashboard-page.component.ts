import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { SummaryCardComponent } from '../../../../shared/ui/summary-card/summary-card.component';

@Component({
  selector: 'app-finance-dashboard-page',
  standalone: true,
  imports: [PageHeaderComponent, SummaryCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Finanzas"
        title="Dashboard financiero"
        subtitle="Resumen mock para validar estructura futura de tesorería, cobranzas y proyecciones."
      />
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        @for (card of cards; track card.label) {
          <app-summary-card
            [label]="card.label"
            [value]="card.value"
            [trend]="card.trend"
            [description]="card.description"
          />
        }
      </div>
    </div>
  `
})
export class FinanceDashboardPageComponent {
  protected readonly cards = [
    { label: 'Saldo proyectado', value: '$186K', trend: '+5.4%', description: 'Proyección semanal.' },
    { label: 'Pagos pendientes', value: '$27K', trend: 'Control', description: 'Obligaciones próximas.' },
    { label: 'Cobros abiertos', value: '$42K', trend: '-3.5%', description: 'CxC vigente.' },
    { label: 'Desvío vs presupuesto', value: '2.1%', trend: 'Leve', description: 'Seguimiento financiero.' }
  ];
}
