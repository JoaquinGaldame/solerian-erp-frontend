import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-sales-list-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Ventas"
        title="Operaciones comerciales"
        subtitle="Listado base de ventas para futuras órdenes, facturas, estados y cobranzas asociadas."
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class SalesListPageComponent {
  protected readonly columns = [
    { key: 'document', label: 'Comprobante' },
    { key: 'customer', label: 'Cliente' },
    { key: 'amount', label: 'Monto' },
    { key: 'status', label: 'Estado' }
  ];

  protected readonly rows = [
    { document: 'FV-00041', customer: 'Distribuidora Andina', amount: '$24,500', status: 'Emitida' },
    { document: 'FV-00042', customer: 'Grupo Delta', amount: '$11,300', status: 'Pendiente' },
    { document: 'NC-00012', customer: 'Northwind SRL', amount: '$1,900', status: 'Aprobada' }
  ];
}
