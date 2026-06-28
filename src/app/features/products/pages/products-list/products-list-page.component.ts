import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductFormModalComponent } from '../../components/product-form-modal/product-form-modal.component';
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
  imports: [AsyncPipe, CurrencyPipe, NgClass, ProductFormModalComponent],
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
    // TODO: Open the future delete confirmation modal and connect it to store effects.
  }
}
