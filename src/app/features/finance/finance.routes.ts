import { Routes } from '@angular/router';

export const FINANCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/finance-dashboard/finance-dashboard-page.component').then(
        (m) => m.FinanceDashboardPageComponent
      )
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./pages/payments/payments-page.component').then((m) => m.PaymentsPageComponent)
  },
  {
    path: 'receivables',
    loadComponent: () =>
      import('./pages/receivables/receivables-page.component').then(
        (m) => m.ReceivablesPageComponent
      )
  }
];
