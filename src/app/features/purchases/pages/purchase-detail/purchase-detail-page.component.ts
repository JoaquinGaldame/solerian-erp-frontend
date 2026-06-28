import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-purchase-detail-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Compras"
        title="Detalle de compra"
        subtitle="Placeholder para ítems, recepciones, aprobaciones y documentos del proveedor."
      />
      <app-empty-state
        title="Detalle de compra pendiente"
        description="La base del feature ya permite sumar store, servicios y componentes propios sin romper el shell principal."
      />
    </div>
  `
})
export class PurchaseDetailPageComponent {}
