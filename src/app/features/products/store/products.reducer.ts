import { createReducer, on } from '@ngrx/store';

import { ProductsActions } from './products.actions';
import { initialProductsState } from './products.state';

export const productsFeatureKey = 'products';

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    items: products,
    loading: false,
    error: null
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
