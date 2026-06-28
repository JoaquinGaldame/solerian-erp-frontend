import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { SummaryCardComponent } from '../../../../shared/ui/summary-card/summary-card.component';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, SummaryCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="Overview"
        title="Dashboard ejecutivo"
        subtitle="Panel inicial con indicadores mock para validar navegación, layouts y shell operativa del ERP."
      />

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (card of cards; track card.label) {
          <app-summary-card
            [label]="card.label"
            [value]="card.value"
            [trend]="card.trend"
            [description]="card.description"
          />
        }
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <article class="panel p-6">
          <h3 class="text-xl font-semibold text-slate-950">Actividad reciente</h3>
          <div class="mt-5 grid gap-4">
            @for (item of recentActivity; track item.title) {
              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="font-semibold text-slate-900">{{ item.title }}</p>
                    <p class="mt-1 text-sm text-slate-600">{{ item.description }}</p>
                  </div>
                  <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    {{ item.when }}
                  </span>
                </div>
              </div>
            }
          </div>
        </article>

        <article class="panel p-6">
          <h3 class="text-xl font-semibold text-slate-950">Accesos rápidos</h3>
          <div class="mt-5 grid gap-3">
            @for (item of shortcuts; track item.title) {
              <a
                [routerLink]="item.href"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                <p class="font-semibold text-slate-900">{{ item.title }}</p>
                <p class="mt-1 text-slate-600">{{ item.description }}</p>
              </a>
            }
          </div>
        </article>
      </section>
    </div>
  `
})
export class DashboardHomePageComponent {
  protected readonly cards = [
    { label: 'Clientes', value: '1,284', trend: '+4.1%', description: 'Base activa comercial.' },
    { label: 'Productos', value: '326', trend: '+1.8%', description: 'Catalogo operativo.' },
    { label: 'Ventas', value: '$124K', trend: '+8.6%', description: 'Facturacion del periodo.' },
    { label: 'Compras', value: '$81K', trend: '+2.2%', description: 'Adquisiciones registradas.' },
    { label: 'Stock bajo', value: '14', trend: 'Atencion', description: 'Items con reposicion cercana.' },
    { label: 'CxC', value: '$42K', trend: '-3.5%', description: 'Cuentas por cobrar abiertas.' }
  ];

  protected readonly recentActivity = [
    { title: 'Orden de compra aprobada', description: 'Se aprobó OC-2026-017 para abastecimiento general.', when: 'Hace 18 min' },
    { title: 'Nuevo cliente registrado', description: 'Distribuidora Andina fue agregada al maestro comercial.', when: 'Hace 42 min' },
    { title: 'Alerta de stock', description: 'El SKU PRD-104 quedó por debajo del umbral mínimo.', when: 'Hace 1 h' }
  ];

  protected readonly shortcuts = [
    { title: 'Ir a clientes', description: 'Consultar cartera y detalle comercial.', href: '/app/customers' },
    { title: 'Revisar inventario', description: 'Visualizar stock y movimientos recientes.', href: '/app/inventory' },
    { title: 'Finanzas', description: 'Entrar al tablero de cobranzas y pagos.', href: '/app/finance' }
  ];
}
