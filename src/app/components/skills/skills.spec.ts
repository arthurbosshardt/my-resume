import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Skills } from './skills';

describe('Skills', () => {
  let fixture: ComponentFixture<Skills>;
  let component: Skills;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Skills],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(Skills);
    component = fixture.componentInstance;
  });

  it('sortAlphabetically returns skills sorted alphabetically', () => {
    const skills = ['TypeScript', 'Angular', 'React'];

    expect(component.sortAlphabetically(skills)).toEqual(['Angular', 'React', 'TypeScript']);
  });

  it('sortAlphabetically does not mutate the original array', () => {
    const skills = ['TypeScript', 'Angular', 'React'];

    component.sortAlphabetically(skills);

    expect(skills).toEqual(['TypeScript', 'Angular', 'React']);
  });
});
