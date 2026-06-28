import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Productos"
        title="Detalle de producto"
        subtitle="Placeholder para especificaciones, costos, stock, trazabilidad y datos comerciales."
      />
      <app-empty-state
        title="Futuro detalle de producto"
        description="El feature queda listo para agregar componentes específicos sin mezclar UI, servicios ni store global."
      />
    </div>
  `
})
export class ProductDetailPageComponent {}
