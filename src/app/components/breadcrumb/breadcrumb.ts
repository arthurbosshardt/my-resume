import { Component, inject, input, output } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { Section } from '../../models/resume.model';

interface BreadcrumbSection {
  id: Section;
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class Breadcrumb {
  readonly i18n = inject(I18nService);
  readonly currentSection = input.required<Section>();
  readonly sectionChange = output<Section>();

  readonly sections: BreadcrumbSection[] = [
    { id: 'experience', labelKey: 'breadcrumb.professionalExperience', icon: 'fa-solid fa-briefcase' },
    { id: 'education', labelKey: 'breadcrumb.education', icon: 'fa-solid fa-graduation-cap' },
    { id: 'hardSkills', labelKey: 'breadcrumb.hardSkills', icon: 'fa-solid fa-screwdriver-wrench' },
    { id: 'softSkills', labelKey: 'breadcrumb.softSkills', icon: 'fa-solid fa-user-group' }
  ];
}
