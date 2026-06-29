import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  inject,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { Store } from '@ngrx/store';

import { routes } from './app.routes';
import { authTokenInterceptor } from './core/http/interceptors/auth-token.interceptor';
import { AuthActions } from './core/auth/store/auth.actions';
import { ThemeService } from './core/theme/theme.service';
import { appEffects } from './store/app.effects';
import { appReducers } from './store/app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(appReducers),
    provideEffects(...appEffects),
    provideRouterStore(),
    ...(isDevMode() ? [provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })] : []),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(ThemeService).restoreTheme();
        inject(Store).dispatch(AuthActions.restoreSession());
      }
    }
  ]
};
