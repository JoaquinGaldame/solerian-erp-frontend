import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-customer-detail-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Clientes"
        title="Detalle de cliente"
        subtitle="Placeholder preparado para futuras fichas, contactos, condiciones comerciales e historial."
      />
      <app-empty-state
        title="Detalle pendiente de implementación"
        description="La estructura de rutas y layouts ya está preparada para conectar este detalle con la API y un store específico del feature."
      />
    </div>
  `
})
export class CustomerDetailPageComponent {}
