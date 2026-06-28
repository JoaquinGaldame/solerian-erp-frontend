import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-receivables-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Finanzas"
        title="Cuentas por cobrar"
        subtitle="Base inicial para aging, seguimiento de cobranza y conciliación futura."
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class ReceivablesPageComponent {
  protected readonly columns = [
    { key: 'customer', label: 'Cliente' },
    { key: 'document', label: 'Comprobante' },
    { key: 'amount', label: 'Monto' },
    { key: 'dueDate', label: 'Vencimiento' }
  ];

  protected readonly rows = [
    { customer: 'Distribuidora Andina', document: 'FV-00041', amount: '$24,500', dueDate: '08/07/2026' },
    { customer: 'Grupo Delta', document: 'FV-00042', amount: '$11,300', dueDate: '10/07/2026' },
    { customer: 'Northwind SRL', document: 'FV-00037', amount: '$6,200', dueDate: '12/07/2026' }
  ];
}
