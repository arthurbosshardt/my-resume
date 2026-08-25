import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

export type Lang = 'en' | 'fr';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);

  readonly currentLanguage = signal<Lang>('en');
  private readonly translations = signal<Partial<Record<Lang, any>>>({});
  private readonly loadedLangs = new Set<Lang>();

  constructor() {
    this.loadLanguage('en');
  }

  changeLanguage(lang: Lang): void {
    this.currentLanguage.set(lang);
    if (!this.loadedLangs.has(lang)) {
      this.loadLanguage(lang);
    }
  }

  t(key: string, defaultValue?: string): string {
    const dict = this.translations()[this.currentLanguage()];
    if (!dict) return defaultValue ?? key;
    const value = key.split('.').reduce<any>((obj, part) => obj?.[part], dict);
    return typeof value === 'string' ? value : (defaultValue ?? key);
  }

  private loadLanguage(lang: Lang): void {
    this.http.get<any>(`assets/i18n/${lang}.json`).subscribe((data) => {
      this.translations.update((current) => ({ ...current, [lang]: data }));
      this.loadedLangs.add(lang);
    });
  }
}
