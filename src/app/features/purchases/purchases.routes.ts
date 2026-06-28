import { Routes } from '@angular/router';

export const PURCHASES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/purchases-list/purchases-list-page.component').then(
        (m) => m.PurchasesListPageComponent
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/purchase-detail/purchase-detail-page.component').then(
        (m) => m.PurchaseDetailPageComponent
      )
  }
];
