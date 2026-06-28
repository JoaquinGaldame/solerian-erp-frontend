import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_NAME } from '../../config/app.constants';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#edf4fb_100%)] px-4 py-8">
      <div class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="space-y-8">
          <span class="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-800">
            Plataforma ERP modular
          </span>
          <div class="space-y-5">
            <h1 class="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
              {{ appName }} prepara la operacion completa de tu empresa desde una sola base.
            </h1>
            <p class="max-w-2xl text-lg leading-8 text-slate-600">
              Esta primera version deja lista una shell profesional y escalable para ventas, compras,
              inventario, finanzas, clientes, reportes y futuras capacidades asistidas por IA.
            </p>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="panel-muted p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stack</p>
              <p class="mt-3 text-lg font-semibold text-slate-900">Angular 20 + NgRx</p>
            </div>
            <div class="panel-muted p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">UI</p>
              <p class="mt-3 text-lg font-semibold text-slate-900">Tailwind y componentes base</p>
            </div>
            <div class="panel-muted p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Estado</p>
              <p class="mt-3 text-lg font-semibold text-slate-900">Auth mock listo para API real</p>
            </div>
          </div>
        </section>
        <div class="panel mx-auto w-full max-w-xl p-6 sm:p-8">
          <router-outlet />
        </div>
      </div>
    </div>
  `
})
export class PublicLayoutComponent {
  protected readonly appName = APP_NAME;
}
