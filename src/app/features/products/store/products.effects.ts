import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ProductsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

  readonly loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productService.loadProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError(() =>
            of(
              ProductsActions.loadProductsFailure({
                error: 'Unable to load products from the mock source.'
              })
            )
          )
        )
      )
    )
  );
}
