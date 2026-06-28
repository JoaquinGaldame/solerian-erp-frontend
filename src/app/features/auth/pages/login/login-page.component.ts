import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
    <section class="login-form-shell">
      <div class="space-y-8">
        <div class="login-section login-section-primary space-y-6">
          <div class="space-y-3">
            <p class="text-app-strong text-lg font-semibold tracking-[0.28em]">SOLERIAN</p>
            <div class="space-y-1">
              <p class="text-app-soft text-sm font-medium uppercase tracking-[0.32em]">ERP Platform</p>
              <h2 class="text-app-strong text-4xl font-semibold tracking-tight">Welcome back</h2>
            </div>
            <p class="text-app-soft max-w-md text-sm leading-7">
              Sign in to access your workspace.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">Secure</p>
              <p class="text-app-strong mt-2 text-sm font-semibold">NgRx Session</p>
            </div>
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">Modules</p>
              <p class="text-app-strong mt-2 text-sm font-semibold">Unified ERP</p>
            </div>
            <div class="surface-soft login-mini-card rounded-2xl px-4 py-3">
              <p class="text-app-soft text-[11px] font-semibold uppercase tracking-[0.24em]">Future</p>
              <p class="text-app-strong mt-2 text-sm font-semibold">AI Ready</p>
            </div>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="login-section login-section-form space-y-5">
          <label class="block space-y-2">
            <span class="text-app text-sm font-medium">Email</span>
            <input
              type="email"
              formControlName="email"
              class="login-input input-shell w-full rounded-2xl px-4 py-3.5 outline-none"
              placeholder="admin@solerian.local"
              autocomplete="email"
            />
          </label>

          @if (emailControl.invalid && emailControl.touched) {
            <p class="login-feedback text-sm text-(--color-danger)">Enter a valid email address.</p>
          }

          <label class="block space-y-2">
            <span class="text-app text-sm font-medium">Password</span>
            <div class="login-input-shell input-shell flex items-center rounded-2xl pr-2 transition">
              <input
                [type]="passwordInputType()"
                formControlName="password"
                class="login-input w-full rounded-2xl bg-transparent px-4 py-3.5 outline-none"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="password-toggle text-app-soft rounded-xl px-3 py-2 text-sm font-medium"
                [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
              >
                {{ showPassword() ? 'Hide' : 'Show' }}
              </button>
            </div>
          </label>

          @if (passwordControl.invalid && passwordControl.touched) {
            <p class="login-feedback text-sm text-(--color-danger)">Password is required.</p>
          }

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label class="remember-option text-app-soft inline-flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                class="remember-checkbox h-4 w-4 rounded border border-(--color-border) bg-(--color-surface) text-(--color-primary)"
              />
              <span>Remember me</span>
            </label>

            <a
              href="#"
              class="forgot-link text-sm font-medium text-(--color-primary)"
              (click)="$event.preventDefault()"
            >
              Forgot password?
            </a>
          </div>

          @if ((authError$ | async); as error) {
            @if (error) {
              <div class="alert-danger auth-alert rounded-2xl px-4 py-3 text-sm">
                {{ error }}
              </div>
            }
          }

          <button
            type="submit"
            [disabled]="form.invalid || (authLoading$ | async)"
            class="btn-primary login-submit inline-flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            @if (authLoading$ | async) {
              <span class="inline-flex items-center gap-2">
                <app-loading-spinner label="Signing in..." />
              </span>
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

    .login-input,
    .login-submit {
      transition:
        border-color 180ms ease,
        box-shadow 180ms ease,
        background-color 180ms ease,
        color 180ms ease,
        transform 180ms ease,
        opacity 180ms ease;
    }

    .login-input-shell {
      transition:
        border-color 180ms ease,
        box-shadow 180ms ease,
        background-color 180ms ease,
        transform 180ms ease;
    }

    .login-input-shell:focus-within {
      border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 10%, transparent);
      transform: translateY(-1px);
    }

    .login-input:focus {
      box-shadow: none;
    }

    .password-toggle,
    .forgot-link,
    .remember-option,
    .remember-checkbox,
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
      color: var(--color-text-strong);
      transform: translateY(-1px);
    }

    .forgot-link:hover {
      color: var(--color-primary-strong);
    }

    .remember-option:hover {
      color: var(--color-text-strong);
    }

    .remember-checkbox {
      appearance: none;
      position: relative;
      box-shadow: inset 0 0 0 1px var(--color-border);
    }

    .remember-checkbox::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 0.2rem;
      background: var(--color-primary);
      transform: scale(0.4);
      opacity: 0;
      transition:
        transform 160ms ease,
        opacity 160ms ease;
    }

    .remember-checkbox:hover {
      border-color: color-mix(in srgb, var(--color-primary) 28%, var(--color-border));
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 28%, var(--color-border)),
        0 0 0 4px color-mix(in srgb, var(--color-primary) 8%, transparent);
    }

    .remember-checkbox:checked::after {
      transform: scale(1);
      opacity: 1;
    }

    .remember-checkbox:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 30%, var(--color-border)),
        0 0 0 4px color-mix(in srgb, var(--color-primary) 10%, transparent);
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
