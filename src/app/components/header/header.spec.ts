import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('personal', {
      name: 'Arthur Bosshardt',
      title: 'Full-stack developer',
      contact: { email: 'a@b.com', phone: '+33 6 12 34 56 78', location: 'Nantes' }
    });
    fixture.componentRef.setInput('currentLanguage', 'en');
  });

  it('formatPhone leaves the phone number unchanged in English', () => {
    fixture.componentRef.setInput('currentLanguage', 'en');
    expect(component.formatPhone('+33 6 12 34 56 78')).toBe('+33 6 12 34 56 78');
  });

  it('formatPhone rewrites the +33 6 prefix to 06 in French', () => {
    fixture.componentRef.setInput('currentLanguage', 'fr');
    expect(component.formatPhone('+33 6 12 34 56 78')).toBe('06 12 34 56 78');
  });

  it('formatPhone leaves non-mobile French numbers unchanged', () => {
    fixture.componentRef.setInput('currentLanguage', 'fr');
    expect(component.formatPhone('+33 1 23 45 67 89')).toBe('+33 1 23 45 67 89');
  });

  it('flips imageError to true when the profile image fails to load', () => {
    expect(component.imageError()).toBe(false);
    component.onImageError();
    expect(component.imageError()).toBe(true);
  });
});
