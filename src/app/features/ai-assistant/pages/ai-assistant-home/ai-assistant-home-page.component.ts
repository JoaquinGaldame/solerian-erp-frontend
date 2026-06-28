import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-ai-assistant-home-page',
  standalone: true,
  imports: [EmptyStateComponent, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="AI Assistant"
        title="Asistente inteligente del ERP"
        subtitle="Sección reservada para futuras capacidades asistidas por IA, sin integración real en esta fase."
      />
      <section class="panel border-sky-100 bg-[linear-gradient(135deg,_rgba(15,76,129,0.06),_rgba(20,184,166,0.08))] p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-sky-800">Futuro feature</p>
        <h2 class="mt-3 text-2xl font-semibold text-slate-950">Todavía no se integra ningún modelo IA</h2>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Este espacio existe solo para dejar la navegación preparada. Más adelante podrá incorporar
          consultas operativas, sugerencias y automatizaciones sin alterar la arquitectura base.
        </p>
      </section>
      <app-empty-state
        eyebrow="Roadmap"
        title="Pendiente de una fase posterior"
        description="No se implementó lógica de IA, embeddings, prompts ni conexión con servicios externos en esta etapa."
      />
    </div>
  `
})
export class AiAssistantHomePageComponent {}
