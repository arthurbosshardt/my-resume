import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { I18nService } from './services/i18n.service';
import { ResumeService } from './services/resume.service';
import { Resume, Section } from './models/resume.model';
import { Header } from './components/header/header';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Experience } from './components/experience/experience';
import { Education } from './components/education/education';
import { Skills } from './components/skills/skills';
import { SoftSkills } from './components/soft-skills/soft-skills';
import { PdfDownloadButton } from './components/pdf-download-button/pdf-download-button';

@Component({
  selector: 'app-root',
  imports: [Header, Breadcrumb, Experience, Education, Skills, SoftSkills, PdfDownloadButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly resumeService = inject(ResumeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly resumeData = signal<Resume | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly currentSection = signal<Section>('experience');
  readonly isMobile = signal(window.innerWidth <= 768);

  ngOnInit(): void {
    const handleResize = () => this.isMobile.set(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    this.destroyRef.onDestroy(() => window.removeEventListener('resize', handleResize));

    this.resumeService.getResume().subscribe({
      next: (data) => {
        this.resumeData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  onSectionChange(section: Section): void {
    this.currentSection.set(section);
  }
}
