import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { selectIsAuthenticated } from '../store/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const authService = inject(AuthService);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) =>
      isAuthenticated || authService.hasSession() ? true : router.createUrlTree(['/login'])
    )
  );
};
