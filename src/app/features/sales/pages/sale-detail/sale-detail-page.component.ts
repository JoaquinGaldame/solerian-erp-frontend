import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-sale-detail-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Ventas"
        title="Detalle de venta"
        subtitle="Placeholder para cabecera, items, impuestos, cobros y trazabilidad comercial."
      />
      <app-empty-state
        title="Detalle comercial pendiente"
        description="Esta sección queda preparada para integrarse después con endpoints, resolvers y store específico del dominio."
      />
    </div>
  `
})
export class SaleDetailPageComponent {}
