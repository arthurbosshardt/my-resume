import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(App);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('creates the app and shows the loading state before data arrives', () => {
    expect(fixture.componentInstance.loading()).toBe(true);
    fixture.detectChanges();

    httpMock.expectOne('assets/i18n/en.json').flush({});

    expect(fixture.nativeElement.textContent).toContain('Loading resume...');

    httpMock.expectOne('assets/data/resume.json').flush({});
  });

  it('surfaces an error message when the resume fails to load', () => {
    fixture.detectChanges();
    httpMock.expectOne('assets/i18n/en.json').flush({});

    httpMock.expectOne('assets/data/resume.json').flush('boom', {
      status: 500,
      statusText: 'Server Error'
    });
    fixture.detectChanges();

    expect(fixture.componentInstance.error()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Error loading resume');
  });
});
