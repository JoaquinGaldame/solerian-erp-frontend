import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authFeatureKey, authReducer } from '../core/auth/store/auth.reducer';
import { productsFeatureKey, productsReducer } from '../features/products/store/products.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [productsFeatureKey]: productsReducer,
  router: routerReducer
};
