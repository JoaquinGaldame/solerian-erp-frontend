import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-customers-list-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Clientes"
        title="Cartera de clientes"
        subtitle="Listado mock inicial para validar navegación y composición de tablas."
        actionLabel="Nuevo cliente"
        actionRoute="/app/customers/new"
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class CustomersListPageComponent {
  protected readonly columns = [
    { key: 'name', label: 'Cliente' },
    { key: 'segment', label: 'Segmento' },
    { key: 'city', label: 'Ciudad' },
    { key: 'status', label: 'Estado' }
  ];

  protected readonly rows = [
    { name: 'Distribuidora Andina', segment: 'Mayorista', city: 'Mendoza', status: 'Activo' },
    { name: 'Grupo Delta', segment: 'Retail', city: 'Cordoba', status: 'Activo' },
    { name: 'Northwind SRL', segment: 'Industria', city: 'Rosario', status: 'Prospecto' }
  ];
}
