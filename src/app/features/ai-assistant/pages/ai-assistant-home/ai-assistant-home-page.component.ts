import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-ai-assistant-home-page',
  standalone: true,
  imports: [EmptyStateComponent, MatCardModule, PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <app-page-header
        eyebrow="AI Assistant"
        title="Asistente inteligente del ERP"
        subtitle="Seccion reservada para futuras capacidades asistidas por IA, sin integracion real en esta fase."
      />
      <mat-card class="surface-tint rounded-3xl p-6 shadow-(--shadow-soft)">
        <p class="text-app text-sm font-semibold uppercase tracking-[0.3em]">Futuro feature</p>
        <h2 class="text-app-strong mt-3 text-2xl font-semibold">Todavia no se integra ningun modelo IA</h2>
        <p class="text-app-soft mt-3 max-w-3xl text-sm leading-7">
          Este espacio existe solo para dejar la navegacion preparada. Mas adelante podra incorporar
          consultas operativas, sugerencias y automatizaciones sin alterar la arquitectura base.
        </p>
      </mat-card>
      <app-empty-state
        eyebrow="Roadmap"
        title="Pendiente de una fase posterior"
        description="No se implemento logica de IA, embeddings, prompts ni conexion con servicios externos en esta etapa."
      />
    </div>
  `
})
export class AiAssistantHomePageComponent {}
