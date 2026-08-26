import { Component, inject, input } from '@angular/core';
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

const FLAG_MAP: Record<string, string> = {
  French: '🇫🇷',
  English: '🇬🇧',
  Spanish: '🇪🇸'
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

  getSoftSkillLabel(skill: string): string {
    const translationKey = SKILL_KEY_MAP[skill] || skill;
    return this.i18n.t(`skills.softSkills.${translationKey}`, skill);
  }

  getLanguageFlag(languageName: string): string {
    return FLAG_MAP[languageName] || '';
  }

  getLanguageName(languageName: string): string {
    return this.i18n.t(`skills.languageNames.${languageName}`, languageName);
  }

  getLevel(level: string): string {
    return this.i18n.t(`skills.levels.${level}`, level);
  }

  getCertification(certification: string): string {
    return certification.replace('TOEIC', '').trim();
  }
}
