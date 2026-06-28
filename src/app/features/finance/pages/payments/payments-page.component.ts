import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Finanzas"
        title="Pagos"
        subtitle="Agenda mock de pagos preparada para tesorería y futuras aprobaciones."
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class PaymentsPageComponent {
  protected readonly columns = [
    { key: 'supplier', label: 'Proveedor' },
    { key: 'dueDate', label: 'Vencimiento' },
    { key: 'amount', label: 'Monto' },
    { key: 'status', label: 'Estado' }
  ];

  protected readonly rows = [
    { supplier: 'TecnoSupply', dueDate: '30/06/2026', amount: '$8,200', status: 'Programado' },
    { supplier: 'Industrial Hub', dueDate: '02/07/2026', amount: '$11,000', status: 'Pendiente' },
    { supplier: 'Insumos del Sur', dueDate: '05/07/2026', amount: '$4,500', status: 'Revisión' }
  ];
}
