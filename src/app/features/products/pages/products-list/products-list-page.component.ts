import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductsActions } from '../../store/products.actions';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading
} from '../../store/products.selectors';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, MatButtonModule, MatCardModule, MatIconModule, MatTableModule, NgClass],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListPageComponent {
  private readonly store = inject(Store);
  private readonly productService = inject(ProductService);

  protected readonly products$ = this.store.select(selectProducts);
  protected readonly loading$ = this.store.select(selectProductsLoading);
  protected readonly error$ = this.store.select(selectProductsError);
  protected readonly displayedColumns = ['sku', 'product', 'category', 'stock', 'price', 'status', 'actions'];

  constructor() {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  protected openCreateModal(): void {
    this.productService.openCreateModal();
  }

  protected openEditModal(product: Product): void {
    this.productService.openEditModal(product);
  }

  protected requestDelete(product: Product): void {
    void product;
    // TODO: Abrir el futuro modal de eliminacion y conectarlo al store con effects.
  }
}
