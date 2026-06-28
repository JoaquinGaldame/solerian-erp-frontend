import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from '../core/auth/store/auth.state';
import { ProductsState } from '../features/products/store/products.state';

export interface AppState {
  auth: AuthState;
  products: ProductsState;
  router: RouterReducerState;
}
