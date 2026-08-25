import { describe, expect, it } from 'vitest';
import { formatDescription, getTranslationKey, getYearFromPeriod, sortByPeriod } from './helpers';

describe('getYearFromPeriod', () => {
  it('extracts the first 4-digit year found in the string', () => {
    expect(getYearFromPeriod('2020 - 2023')).toBe(2020);
    expect(getYearFromPeriod('Sept 2019 - Present')).toBe(2019);
  });

  it('returns 0 when no year is present', () => {
    expect(getYearFromPeriod('Present')).toBe(0);
    expect(getYearFromPeriod('')).toBe(0);
  });
});

describe('sortByPeriod', () => {
  it('sorts items by descending year without mutating the input array', () => {
    const items = [{ period: '2018 - 2019' }, { period: '2022 - 2023' }, { period: '2020 - 2021' }];
    const original = [...items];

    const sorted = sortByPeriod(items);

    expect(sorted.map((i) => i.period)).toEqual(['2022 - 2023', '2020 - 2021', '2018 - 2019']);
    expect(items).toEqual(original);
  });
});

describe('formatDescription', () => {
  it('inserts a line break after a period followed by a capital letter', () => {
    expect(formatDescription('First sentence. Second sentence.')).toBe(
      'First sentence.<br />Second sentence.'
    );
  });

  it('leaves text without sentence boundaries untouched', () => {
    expect(formatDescription('Just one sentence')).toBe('Just one sentence');
  });

  it('returns an empty string for undefined input', () => {
    expect(formatDescription(undefined)).toBe('');
  });
});

describe('getTranslationKey', () => {
  it('strips spaces and dashes so periods can be used as i18n keys', () => {
    expect(getTranslationKey('2020 - 2023')).toBe('2020_2023');
    expect(getTranslationKey('Sept 2019 - Present')).toBe('Sept2019_Present');
  });
});
