import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/products-list/products-list-page.component').then(
        (m) => m.ProductsListPageComponent
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail-page.component').then(
        (m) => m.ProductDetailPageComponent
      )
  }
];
