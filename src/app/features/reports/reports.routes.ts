import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/reports-home/reports-home-page.component').then(
        (m) => m.ReportsHomePageComponent
      )
  }
];
