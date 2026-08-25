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

const CODE_MAP: Record<string, string> = {
  French: 'FR',
  English: 'EN',
  Spanish: 'ES'
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

  getLanguageCode(languageName: string): string {
    return CODE_MAP[languageName] || languageName.slice(0, 2).toUpperCase();
  }

  getLevel(level: string): string {
    return this.i18n.t(`skills.levels.${level}`, level);
  }

  getCertification(certification: string): string {
    return certification.replace('TOEIC', '').trim();
  }
}
