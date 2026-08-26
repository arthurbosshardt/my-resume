import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { I18nService } from '../../services/i18n.service';
import { Skills } from '../../models/resume.model';

const SKILL_KEY_MAP: Record<string, string> = {
  'Meeting facilitation (demos, retrospective...)': 'meetingFacilitation',
  'Proactive mindset': 'proactiveMindset',
  'Estimation and client communication': 'estimationAndClientCommunication',
  'Technical communication mastery': 'technicalCommunicationMastery',
  'Adaptation to project methodologies': 'adaptationToProjectMethodologies',
  'Knowledge of business processes (IT services company experience)': 'knowledgeOfBusinessProcesses',
  'Ease in facilitating presentations (daily, refinement...)': 'easeInFacilitatingPresentations',
  'Pair programming': 'pairProgramming'
};

/* SVG flags (same technique as the header language switch) rather than
   Unicode flag emoji, which many Android browsers/fonts fail to render. */
const FLAG_SVG_MAP: Record<string, string> = {
  French: `<svg class="flag-icon" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="20" height="40" fill="#0055A4"/>
    <rect x="20" width="20" height="40" fill="#FFFFFF"/>
    <rect x="40" width="20" height="40" fill="#EF4135"/>
  </svg>`,
  English: `<svg class="flag-icon" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="60" height="40" fill="#00247d"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#cf142b" stroke-width="4"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" stroke-width="14"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#cf142b" stroke-width="6"/>
  </svg>`,
  Spanish: `<svg class="flag-icon" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="60" height="40" fill="#AA151B"/>
    <rect y="10" width="60" height="20" fill="#F1BF00"/>
  </svg>`
};

@Component({
  selector: 'app-soft-skills',
  imports: [],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.css'
})
export class SoftSkills {
  readonly i18n = inject(I18nService);
  readonly skills = input.required<Skills | undefined>();
  private readonly sanitizer = inject(DomSanitizer);

  getSoftSkillLabel(skill: string): string {
    const translationKey = SKILL_KEY_MAP[skill] || skill;
    return this.i18n.t(`skills.softSkills.${translationKey}`, skill);
  }

  getLanguageFlag(languageName: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(FLAG_SVG_MAP[languageName] || '');
  }

  getLanguageName(languageName: string): string {
    return this.i18n.t(`skills.languageNames.${languageName}`, languageName);
  }

  getLevel(level: string): string {
    return this.i18n.t(`skills.levels.${level}`, level);
  }

  getFeminineLevel(level: string): string {
    return this.i18n.t(`skills.levelsFeminine.${level}`, this.getLevel(level));
  }

  getCertification(certification: string): string {
    return certification.replace('TOEIC', '').trim();
  }
}
