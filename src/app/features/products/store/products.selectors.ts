import { createFeatureSelector, createSelector } from '@ngrx/store';

import { productsFeatureKey } from './products.reducer';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>(productsFeatureKey);
export const selectProducts = createSelector(selectProductsState, (state) => state.items);
export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);
export const selectProductsError = createSelector(selectProductsState, (state) => state.error);
