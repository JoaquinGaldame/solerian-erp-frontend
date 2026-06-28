import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { SummaryCardComponent } from '../../../../shared/ui/summary-card/summary-card.component';

@Component({
  selector: 'app-inventory-dashboard-page',
  standalone: true,
  imports: [PageHeaderComponent, SummaryCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Inventario"
        title="Dashboard de inventario"
        subtitle="Vista base para niveles de stock, alertas, rotación y pendientes de reposición."
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
export class InventoryDashboardPageComponent {
  protected readonly cards = [
    { label: 'SKUs activos', value: '326', trend: 'OK', description: 'Catalogo operativo actual.' },
    { label: 'Bajo stock', value: '14', trend: 'Alerta', description: 'Productos con umbral crítico.' },
    { label: 'Recepciones hoy', value: '9', trend: '+2', description: 'Entradas registradas hoy.' },
    { label: 'Pendientes de conteo', value: '3', trend: 'Plan', description: 'Ajustes cíclicos previstos.' }
  ];
}
