import { Component, inject, input, output, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { Experience as ExperienceModel, Project, Section, Skills } from '../../models/resume.model';
import {
  sortByPeriod,
  formatDescription,
  boldTechnicalTerms,
  getTranslationKey,
  formatLocation,
  getTechnologyIcon,
  sortTechnologiesBySection
} from '../../utils/helpers';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  readonly i18n = inject(I18nService);
  readonly experience = input.required<ExperienceModel[]>();
  readonly skills = input.required<Skills>();
  readonly sectionChange = output<Section>();

  private readonly flippedPeriods = signal<Set<string>>(new Set());

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
    return boldTechnicalTerms(formatDescription(translated), this.skills());
  }

  getShortDescription(exp: ExperienceModel, project: Project): string {
    return this.i18n.t(`experience.${getTranslationKey(exp.period)}.shortDescription`, project.shortDescription);
  }

  getLocation(exp: ExperienceModel): string {
    return formatLocation(exp.location, this.i18n.currentLanguage());
  }

  getSortedTechnologies(project: Project): string[] {
    return sortTechnologiesBySection(project.technologies, this.skills());
  }

  getTechIcon(tech: string): string | null {
    return getTechnologyIcon(tech, this.skills());
  }

  isFlipped(exp: ExperienceModel): boolean {
    return this.flippedPeriods().has(exp.period);
  }

  toggleFlip(exp: ExperienceModel): void {
    const next = new Set(this.flippedPeriods());
    if (next.has(exp.period)) {
      next.delete(exp.period);
    } else {
      next.add(exp.period);
    }
    this.flippedPeriods.set(next);
  }

  onTechnologyClick(event: Event): void {
    event.stopPropagation();
    this.sectionChange.emit('hardSkills');
  }
}
