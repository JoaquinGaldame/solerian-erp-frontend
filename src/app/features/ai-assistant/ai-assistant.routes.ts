import { Routes } from '@angular/router';

export const AI_ASSISTANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ai-assistant-home/ai-assistant-home-page.component').then(
        (m) => m.AiAssistantHomePageComponent
      )
  }
];
