import { Component, inject, input, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { Education as EducationModel } from '../../models/resume.model';
import { sortByPeriod, formatDescription, getTranslationKey, formatLocation } from '../../utils/helpers';

interface ParsedTitle {
  schoolName: string;
  location: string | null;
}

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  readonly i18n = inject(I18nService);
  readonly education = input.required<EducationModel[]>();

  private readonly flippedPeriods = signal<Set<string>>(new Set());

  get sortedEducation(): EducationModel[] {
    return sortByPeriod(this.education());
  }

  isFlipped(edu: EducationModel): boolean {
    return this.flippedPeriods().has(edu.period);
  }

  toggleFlip(edu: EducationModel): void {
    const next = new Set(this.flippedPeriods());
    if (next.has(edu.period)) {
      next.delete(edu.period);
    } else {
      next.add(edu.period);
    }
    this.flippedPeriods.set(next);
  }

  private parseEducationTitle(title: string, period: string): ParsedTitle {
    const periodKey = getTranslationKey(period);
    const translatedTitle = this.i18n.t(`education.${periodKey}.title`, title);

    const locationMatch = translatedTitle.match(/\s-\s(.+)$/);
    if (locationMatch) {
      return {
        schoolName: translatedTitle.replace(/\s-\s.+$/, ''),
        location: locationMatch[1]
      };
    }
    return { schoolName: translatedTitle, location: null };
  }

  getSchoolName(edu: EducationModel): string {
    return this.parseEducationTitle(edu.title, edu.period).schoolName;
  }

  getLocation(edu: EducationModel): string | null {
    let location = edu.location || this.parseEducationTitle(edu.title, edu.period).location;
    if (location === 'Remote') {
      return this.i18n.t('common.remote');
    }
    if (location) {
      location = formatLocation(location, this.i18n.currentLanguage());
    }
    return location;
  }

  getDescription(edu: EducationModel): string {
    const periodKey = getTranslationKey(edu.period);
    const translated = this.i18n.t(`education.${periodKey}.description`, edu.description);
    return formatDescription(translated);
  }

  getLongDescription(edu: EducationModel): string {
    const periodKey = getTranslationKey(edu.period);
    const translated = this.i18n.t(`education.${periodKey}.longDescription`, edu.longDescription);
    return formatDescription(translated);
  }
}
