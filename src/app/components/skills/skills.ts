import { Component, inject, input, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { TechnicalSkills } from '../../models/resume.model';

type SortOrder = 'alphabetical' | 'mastery';
type TechnicalCategory = keyof TechnicalSkills;

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  readonly i18n = inject(I18nService);
  readonly skills = input.required<TechnicalSkills | undefined>();

  private readonly sortOrders = signal<Partial<Record<TechnicalCategory, SortOrder>>>({});

  toggleSort(category: TechnicalCategory): void {
    this.sortOrders.update((prev) => ({
      ...prev,
      [category]: prev[category] === 'alphabetical' ? 'mastery' : 'alphabetical'
    }));
  }

  getSortOrder(category: TechnicalCategory): SortOrder {
    return this.sortOrders()[category] ?? 'mastery';
  }

  sortSkills(skillsArray: string[], category: TechnicalCategory): string[] {
    if (this.getSortOrder(category) === 'alphabetical') {
      return [...skillsArray].sort((a, b) => a.localeCompare(b));
    }
    return skillsArray;
  }

  sortAlphabetically(skillsArray: string[]): string[] {
    return [...skillsArray].sort((a, b) => a.localeCompare(b));
  }

  getOpacity(index: number, total: number, category: TechnicalCategory): number {
    if (this.getSortOrder(category) === 'alphabetical') {
      return 1;
    }

    if (category === 'languagesFrameworks' && total > 20) {
      const startGradientIndex = total - 20;
      if (index < startGradientIndex) {
        return 1.0;
      }
      const relativeIndex = index - startGradientIndex;
      const minOpacity = 0.75;
      const maxOpacity = 1.0;
      const opacityStep = (maxOpacity - minOpacity) / Math.max(1, 14);
      return maxOpacity - relativeIndex * opacityStep;
    }

    const minOpacity = 0.75;
    const maxOpacity = 1.0;
    const opacityStep = (maxOpacity - minOpacity) / Math.max(1, total - 1);
    return maxOpacity - index * opacityStep;
  }
}
