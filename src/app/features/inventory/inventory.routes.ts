import { Routes } from '@angular/router';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inventory-dashboard/inventory-dashboard-page.component').then(
        (m) => m.InventoryDashboardPageComponent
      )
  },
  {
    path: 'stock-movements',
    loadComponent: () =>
      import('./pages/stock-movements/stock-movements-page.component').then(
        (m) => m.StockMovementsPageComponent
      )
  }
];
