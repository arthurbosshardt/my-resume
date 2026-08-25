import { Component, inject, input, output } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { Experience as ExperienceModel, Section } from '../../models/resume.model';
import { sortByPeriod, formatDescription, getTranslationKey } from '../../utils/helpers';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  readonly i18n = inject(I18nService);
  readonly experience = input.required<ExperienceModel[]>();
  readonly sectionChange = output<Section>();

  get sortedExperience(): ExperienceModel[] {
    return sortByPeriod(this.experience());
  }

  getTranslationKey(period: string): string {
    return getTranslationKey(period);
  }

  getTitle(exp: ExperienceModel): string {
    return this.i18n.t(`experience.${getTranslationKey(exp.period)}.title`, exp.title);
  }

  getDescription(exp: ExperienceModel, description: string): string {
    const translated = this.i18n.t(`experience.${getTranslationKey(exp.period)}.description`, description);
    return formatDescription(translated);
  }

  onTechnologyClick(): void {
    this.sectionChange.emit('hardSkills');
  }
}
