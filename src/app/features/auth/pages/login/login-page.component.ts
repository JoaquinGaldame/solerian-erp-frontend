import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="login-form-shell">
      <div class="space-y-8">
        <div class="login-section login-section-primary space-y-6">
          <div class="space-y-3">
            <p class="text-app-strong text-lg font-semibold tracking-[0.28em]">SOLERIAN</p>
            <div class="space-y-1">
              <p class="text-app-soft text-sm font-medium uppercase tracking-[0.32em]">
                ERP Platform
              </p>
              <h2 class="text-app-strong text-4xl font-semibold tracking-tight">Welcome back</h2>
            </div>
            <p class="text-app-soft max-w-md text-sm leading-7">
              Sign in to access your workspace.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">
                Secure
              </p>
              <p class="text-app-strong mt-2 text-sm font-semibold">NgRx Session</p>
            </div>
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">
                Modules
              </p>
              <p class="text-app-strong mt-2 text-sm font-semibold">Unified ERP</p>
            </div>
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">
                Future
              </p>
              <p class="text-app-strong mt-2 text-sm font-semibold">AI Ready</p>
            </div>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="login-section login-section-form space-y-4">
          <mat-form-field appearance="fill" class="erp-form-field login-field">
            <mat-label>Email</mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              placeholder="admin@solerian.local"
              autocomplete="email"
            />
            <mat-icon matSuffix fontSet="material-symbols-outlined">person</mat-icon>
          </mat-form-field>

          @if (emailControl.invalid && emailControl.touched) {
            <p class="login-feedback text-sm text-(--color-danger)">Enter a valid email address.</p>
          }

          <mat-form-field appearance="fill" class="erp-form-field login-field">
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="passwordInputType()"
              formControlName="password"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
            <button
              mat-icon-button
              matSuffix
              type="button"
              class="password-toggle"
              [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
              (click)="togglePasswordVisibility()"
            >
              <mat-icon fontSet="material-symbols-outlined">
                {{ showPassword() ? 'visibility_off' : 'visibility' }}
              </mat-icon>
            </button>
          </mat-form-field>

          @if (passwordControl.invalid && passwordControl.touched) {
            <p class="login-feedback text-sm text-(--color-danger)">Password is required.</p>
          }

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <mat-checkbox class="erp-checkbox text-app-soft">Remember me</mat-checkbox>

            <button
              mat-button
              type="button"
              class="forgot-link text-sm font-medium text-(--color-primary)"
            >
              Forgot password?
            </button>
          </div>

          @if ((authError$ | async); as error) {
            @if (error) {
              <div class="alert-danger auth-alert rounded-2xl px-4 py-3 text-sm">
                {{ error }}
              </div>
            }
          }

          <button
            mat-flat-button
            color="primary"
            type="submit"
            [disabled]="form.invalid || (authLoading$ | async)"
            class="erp-button-primary login-submit inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            @if (authLoading$ | async) {
              <app-loading-spinner label="Signing in..." />
            } @else {
              <span>Sign In</span>
            }
          </button>
        </form>
      </div>

      <div class="login-section login-section-footer space-y-4 pt-6">
        <div class="alert-info helper-alert rounded-2xl px-4 py-4 text-sm">
          Use <strong>admin@solerian.local</strong> and any password for the current mock access.
        </div>
        <p class="text-app-soft text-center text-xs tracking-[0.18em]">
          2026 Solerian. All rights reserved.
        </p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .login-form-shell {
      animation: form-enter 580ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .login-section {
      opacity: 0;
      transform: translateY(16px);
      animation: section-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .login-section-form {
      animation-delay: 80ms;
    }

    .login-section-footer {
      animation-delay: 160ms;
    }

    .login-mini-card {
      transition:
        transform 220ms ease,
        border-color 220ms ease,
        background-color 220ms ease,
        box-shadow 220ms ease;
    }

    .login-mini-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px color-mix(in srgb, var(--color-primary) 10%, transparent);
      border-color: color-mix(in srgb, var(--color-primary) 18%, var(--color-border));
    }

    .login-field,
    .login-submit {
      transition:
        border-color 180ms ease,
        box-shadow 180ms ease,
        background-color 180ms ease,
        color 180ms ease,
        transform 180ms ease,
        opacity 180ms ease;
    }

    .login-field:focus-within {
      transform: translateY(-1px);
    }

    .password-toggle,
    .forgot-link,
    .auth-alert,
    .helper-alert {
      transition:
        color 180ms ease,
        background-color 180ms ease,
        border-color 180ms ease,
        box-shadow 180ms ease,
        transform 180ms ease,
        opacity 180ms ease;
    }

    .password-toggle:hover {
      transform: translateY(-1px);
    }

    .forgot-link:hover {
      color: var(--color-primary-strong);
    }

    .login-feedback,
    .auth-alert {
      animation: feedback-enter 220ms ease-out;
    }

    .login-submit:hover:enabled {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px color-mix(in srgb, var(--color-primary) 22%, transparent);
    }

    .login-submit:active:enabled {
      transform: scale(0.99);
    }

    @keyframes form-enter {
      from {
        opacity: 0;
        transform: translateY(18px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes section-enter {
      from {
        opacity: 0;
        transform: translateY(16px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes feedback-enter {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  protected readonly showPassword = signal(false);
  protected readonly passwordInputType = computed(() => (this.showPassword() ? 'text' : 'password'));
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

  protected togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(AuthActions.loginRequested({ payload: this.form.getRawValue() }));
  }
}
