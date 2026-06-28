import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequested),
      switchMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error: Error) =>
            of(AuthActions.loginFailure({ error: error.message || 'No fue posible iniciar sesión.' }))
          )
        )
      )
    )
  );

  readonly loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => void this.router.navigate(['/app/dashboard']))
      ),
    { dispatch: false }
  );

  readonly logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          void this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  readonly restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      map(() => {
        const session = this.authService.restoreSession();
        return session
          ? AuthActions.loginSuccess({ response: session })
          : AuthActions.loginFailure({ error: '' });
      })
    )
  );
}
