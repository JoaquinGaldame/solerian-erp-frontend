import { Routes } from '@angular/router';

export const SALES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sales-list/sales-list-page.component').then((m) => m.SalesListPageComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/sale-detail/sale-detail-page.component').then((m) => m.SaleDetailPageComponent)
  }
];
