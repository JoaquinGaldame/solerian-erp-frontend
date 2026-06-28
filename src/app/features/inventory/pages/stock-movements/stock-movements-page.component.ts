import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-stock-movements-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Inventario"
        title="Movimientos de stock"
        subtitle="Timeline operacional mock para futuras entradas, salidas, ajustes y transferencias."
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class StockMovementsPageComponent {
  protected readonly columns = [
    { key: 'date', label: 'Fecha' },
    { key: 'sku', label: 'SKU' },
    { key: 'type', label: 'Movimiento' },
    { key: 'quantity', label: 'Cantidad' }
  ];

  protected readonly rows = [
    { date: '28/06/2026', sku: 'PRD-100', type: 'Entrada', quantity: 12 },
    { date: '28/06/2026', sku: 'PRD-104', type: 'Salida', quantity: 4 },
    { date: '27/06/2026', sku: 'PRD-208', type: 'Ajuste', quantity: 2 }
  ];
}
