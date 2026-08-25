import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(I18nService);
    httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('assets/i18n/en.json').flush({ greeting: 'Hello' });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('defaults to English on startup', () => {
    expect(service.currentLanguage()).toBe('en');
  });

  it('resolves a translated value once the dictionary has loaded', () => {
    expect(service.t('greeting')).toBe('Hello');
  });

  it('falls back to the provided default value when the key is missing', () => {
    expect(service.t('missing.key', 'fallback')).toBe('fallback');
  });

  it('falls back to the key itself when no default value is given', () => {
    expect(service.t('missing.key')).toBe('missing.key');
  });

  it('lazily loads a language the first time it is switched to', () => {
    service.changeLanguage('fr');
    expect(service.currentLanguage()).toBe('fr');

    httpMock.expectOne('assets/i18n/fr.json').flush({ greeting: 'Bonjour' });
    expect(service.t('greeting')).toBe('Bonjour');
  });

  it('does not re-fetch a language that was already loaded', () => {
    service.changeLanguage('fr');
    httpMock.expectOne('assets/i18n/fr.json').flush({ greeting: 'Bonjour' });

    service.changeLanguage('en');
    service.changeLanguage('fr');

    httpMock.expectNone('assets/i18n/fr.json');
  });
});
