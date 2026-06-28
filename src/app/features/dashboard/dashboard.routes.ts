import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-home/dashboard-home-page.component').then(
        (m) => m.DashboardHomePageComponent
      )
  }
];
