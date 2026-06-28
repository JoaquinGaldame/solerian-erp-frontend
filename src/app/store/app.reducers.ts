import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authFeatureKey, authReducer } from '../core/auth/store/auth.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  router: routerReducer
};
