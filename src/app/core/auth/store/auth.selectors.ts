import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey } from './auth.reducer';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const selectCurrentUser = createSelector(selectAuthState, (state) => state.user);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);
