import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

import { APP_THEME_STORAGE_KEY, DEFAULT_APP_THEME } from './theme.constants';
import { AppTheme } from './theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themeSignal = signal<AppTheme>(DEFAULT_APP_THEME);

  readonly currentTheme = this.themeSignal.asReadonly();

  restoreTheme(): void {
    const storedTheme = this.readStoredTheme();

    this.applyTheme(storedTheme ?? DEFAULT_APP_THEME);
  }

  setTheme(theme: AppTheme): void {
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    this.applyTheme(this.themeSignal() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(theme: AppTheme): void {
    const rootElement = this.document.documentElement;

    rootElement.classList.remove('theme-light', 'theme-dark');
    rootElement.classList.add(`theme-${theme}`);

    this.themeSignal.set(theme);
    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  }

  private readStoredTheme(): AppTheme | null {
    const storedTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return null;
  }
}
