import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Productos"
        title="Catalogo de productos"
        subtitle="Base inicial del maestro de productos con tabla reusable y acción placeholder."
        actionLabel="Nuevo producto"
        actionRoute="/app/products/new"
      />
      <app-data-table [columns]="columns" [rows]="rows" />
    </div>
  `
})
export class ProductsListPageComponent {
  protected readonly columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Producto' },
    { key: 'category', label: 'Categoria' },
    { key: 'stock', label: 'Stock' }
  ];

  protected readonly rows = [
    { sku: 'PRD-100', name: 'Bomba centrífuga', category: 'Equipos', stock: 18 },
    { sku: 'PRD-104', name: 'Filtro de línea', category: 'Repuestos', stock: 6 },
    { sku: 'PRD-208', name: 'Tablero de control', category: 'Automatización', stock: 11 }
  ];
}
