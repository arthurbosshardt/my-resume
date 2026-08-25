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

  it('defaults each category to mastery order', () => {
    expect(component.getSortOrder('languagesFrameworks')).toBe('mastery');
  });

  it('toggleSort flips a category between mastery and alphabetical', () => {
    component.toggleSort('languagesFrameworks');
    expect(component.getSortOrder('languagesFrameworks')).toBe('alphabetical');

    component.toggleSort('languagesFrameworks');
    expect(component.getSortOrder('languagesFrameworks')).toBe('mastery');
  });

  it('toggling one category does not affect another', () => {
    component.toggleSort('languagesFrameworks');
    expect(component.getSortOrder('softwares')).toBe('mastery');
  });

  it('sortSkills returns skills alphabetically only once that order is active', () => {
    const skills = ['TypeScript', 'Angular', 'React'];

    expect(component.sortSkills(skills, 'languagesFrameworks')).toEqual(skills);

    component.toggleSort('languagesFrameworks');
    expect(component.sortSkills(skills, 'languagesFrameworks')).toEqual(['Angular', 'React', 'TypeScript']);
  });

  it('getOpacity returns 1 for every item once alphabetical order is active', () => {
    component.toggleSort('languagesFrameworks');
    expect(component.getOpacity(0, 25, 'languagesFrameworks')).toBe(1);
    expect(component.getOpacity(24, 25, 'languagesFrameworks')).toBe(1);
  });

  it('getOpacity fades only the tail of a long languagesFrameworks list', () => {
    const total = 25;
    const startGradientIndex = total - 20;

    expect(component.getOpacity(0, total, 'languagesFrameworks')).toBe(1);
    expect(component.getOpacity(startGradientIndex, total, 'languagesFrameworks')).toBe(1);
    expect(component.getOpacity(total - 1, total, 'languagesFrameworks')).toBeLessThan(1);
  });

  it('getOpacity applies a full-list gradient for other categories', () => {
    expect(component.getOpacity(0, 5, 'softwares')).toBe(1);
    expect(component.getOpacity(4, 5, 'softwares')).toBe(0.75);
  });
});
