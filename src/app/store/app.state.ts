import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from '../core/auth/store/auth.state';

export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
}
