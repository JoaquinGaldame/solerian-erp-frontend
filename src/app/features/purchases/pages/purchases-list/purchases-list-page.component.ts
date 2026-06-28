import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-purchases-list-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Compras"
        title="Abastecimiento"
        subtitle="Vista inicial de compras para futuras órdenes, recepciones y control de proveedores."
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class PurchasesListPageComponent {
  protected readonly columns = [
    { key: 'order', label: 'Orden' },
    { key: 'supplier', label: 'Proveedor' },
    { key: 'amount', label: 'Monto' },
    { key: 'status', label: 'Estado' }
  ];

  protected readonly rows = [
    { order: 'OC-2026-017', supplier: 'TecnoSupply', amount: '$32,000', status: 'Aprobada' },
    { order: 'OC-2026-018', supplier: 'Industrial Hub', amount: '$12,400', status: 'En tránsito' },
    { order: 'OC-2026-019', supplier: 'Insumos del Sur', amount: '$8,150', status: 'Pendiente' }
  ];
}
