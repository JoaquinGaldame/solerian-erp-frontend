import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customers-list/customers-list-page.component').then(
        (m) => m.CustomersListPageComponent
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/customer-detail/customer-detail-page.component').then(
        (m) => m.CustomerDetailPageComponent
      )
  }
];
