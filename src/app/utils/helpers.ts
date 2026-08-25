export function getYearFromPeriod(period: string): number {
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

export function sortByPeriod<T extends { period: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => getYearFromPeriod(b.period) - getYearFromPeriod(a.period));
}

export function formatDescription(text: string | undefined): string {
  if (!text) return '';
  return text.replace(/\. ([A-Z])/g, '.<br />$1');
}

export function getTranslationKey(period: string): string {
  return period.replace(/\s/g, '').replace(/-/g, '_');
}
