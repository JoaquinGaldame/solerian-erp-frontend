import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../core/auth/store/auth.actions';
import {
  selectAuthError,
  selectAuthLoading
} from '../../../../core/auth/store/auth.selectors';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Acceso seguro</p>
        <h2 class="text-3xl font-semibold text-slate-950">Ingresar a Solerian ERP</h2>
        <p class="text-sm leading-6 text-slate-600">
          Esta autenticacion es un mock temporal conectado al store para dejar preparada la
          integracion real con la API.
        </p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            formControlName="email"
            class="input-shell w-full rounded-2xl px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="admin@solerian.local"
          />
        </label>

        @if (emailControl.invalid && emailControl.touched) {
          <p class="text-sm text-red-600">Ingresá un email válido.</p>
        }

        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            formControlName="password"
            class="input-shell w-full rounded-2xl px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="••••••••"
          />
        </label>

        @if (passwordControl.invalid && passwordControl.touched) {
          <p class="text-sm text-red-600">La password es obligatoria.</p>
        }

        @if ((authError$ | async); as error) {
          @if (error) {
            <div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {{ error }}
            </div>
          }
        }

        <button
          type="submit"
          [disabled]="form.invalid || (authLoading$ | async)"
          class="btn-primary inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg shadow-sky-900/20 transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          @if (authLoading$ | async) {
            <span class="inline-flex items-center gap-2">
              <app-loading-spinner label="Ingresando..." />
            </span>
          } @else {
            <span>Iniciar sesión</span>
          }
        </button>
      </form>

      <div class="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4 text-sm text-sky-900">
        Usuario mock sugerido: <strong>admin@solerian.local</strong> con cualquier password.
      </div>
    </section>
  `
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  protected readonly form = this.fb.nonNullable.group({
    email: ['admin@solerian.local', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]]
  });
  protected readonly authLoading$ = this.store.select(selectAuthLoading);
  protected readonly authError$ = this.store.select(selectAuthError);

  protected get emailControl() {
    return this.form.controls.email;
  }

  protected get passwordControl() {
    return this.form.controls.password;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(AuthActions.loginRequested({ payload: this.form.getRawValue() }));
  }
}
