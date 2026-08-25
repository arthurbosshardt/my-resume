import { Component, inject, input } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { TechnicalSkills } from '../../models/resume.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  readonly i18n = inject(I18nService);
  readonly skills = input.required<TechnicalSkills | undefined>();

  sortAlphabetically(skillsArray: string[]): string[] {
    return [...skillsArray].sort((a, b) => a.localeCompare(b));
  }
}
