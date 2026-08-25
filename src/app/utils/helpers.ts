import { Skills } from '../models/resume.model';

interface TechCategory {
  key: keyof Skills['technical'] | 'concepts';
  icon: string;
}

const TECH_CATEGORY_ORDER: TechCategory[] = [
  { key: 'languagesFrameworks', icon: 'fa-solid fa-code' },
  { key: 'cicd', icon: 'fa-solid fa-rocket' },
  { key: 'softwares', icon: 'fa-solid fa-laptop' },
  { key: 'testing', icon: 'fa-solid fa-circle-check' },
  { key: 'projectTools', icon: 'fa-solid fa-diagram-project' },
  { key: 'ai', icon: 'fa-solid fa-brain' },
  { key: 'concepts', icon: 'fa-solid fa-lightbulb' }
];

function findTechCategoryMatch(tech: string, skills: Skills | undefined): { icon: string; order: number } | null {
  if (!skills) return null;
  const normalizedTech = tech.trim().toLowerCase();
  for (let order = 0; order < TECH_CATEGORY_ORDER.length; order++) {
    const { key, icon } = TECH_CATEGORY_ORDER[order];
    const items = key === 'concepts' ? skills.concepts : skills.technical[key];
    const isMatch = items?.some((item) => {
      const normalizedItem = item.trim().toLowerCase();
      return normalizedTech === normalizedItem || normalizedTech.startsWith(`${normalizedItem} `);
    });
    if (isMatch) return { icon, order };
  }
  return null;
}

export function getTechnologyIcon(tech: string, skills: Skills | undefined): string | null {
  return findTechCategoryMatch(tech, skills)?.icon ?? null;
}

export function sortTechnologiesBySection(technologies: string[], skills: Skills | undefined): string[] {
  return technologies
    .map((tech, index) => ({ tech, index, order: findTechCategoryMatch(tech, skills)?.order ?? TECH_CATEGORY_ORDER.length }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map(({ tech }) => tech);
}

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

// Variantes redigees en prose des noms techniques deja canonicalises dans skills
// (ex: "Spring Boot" dans le texte vs "Springboot" comme tag), ajoutees uniquement
// pour la detection de mise en gras, sans toucher au nom canonique des tags.
const EXTRA_BOLD_TERMS = ['Spring Boot', 'VS Code', 'Argo CD', 'Node.js'];

export function boldTechnicalTerms(text: string, skills: Skills | undefined): string {
  if (!text || !skills) return text;
  const terms = [...Object.values(skills.technical).flat(), ...skills.concepts, ...EXTRA_BOLD_TERMS];
  const uniqueTerms = Array.from(new Set(terms)).sort((a, b) => b.length - a.length);
  if (uniqueTerms.length === 0) return text;
  const alternatives = uniqueTerms.map((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const exclude = term === 'Express' ? '(?<!American )' : '';
    return `(?<![A-Za-z0-9])${exclude}${escaped}(?![A-Za-z0-9])`;
  });
  const pattern = new RegExp(alternatives.join('|'), 'gi');
  return text.replace(pattern, '<strong>$&</strong>');
}

export function getTranslationKey(period: string): string {
  return period.replace(/\s/g, '').replace(/-/g, '_');
}

export function formatLocation(location: string, lang: 'en' | 'fr'): string {
  return lang === 'en' ? `${location} (FR)` : location;
}

export function calculateAge(birthDate: string, today: Date = new Date()): number {
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) {
    age--;
  }
  return age;
}
