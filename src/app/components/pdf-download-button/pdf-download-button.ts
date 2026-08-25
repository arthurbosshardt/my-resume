import { Component, inject, input } from '@angular/core';
import { I18nService, Lang } from '../../services/i18n.service';

@Component({
  selector: 'app-pdf-download-button',
  imports: [],
  templateUrl: './pdf-download-button.html',
  styleUrl: './pdf-download-button.css'
})
export class PdfDownloadButton {
  readonly i18n = inject(I18nService);
  readonly currentLanguage = input.required<Lang>();

  handleDownload(): void {
    const pdfFileName = this.currentLanguage() === 'fr' ? 'CV_FR.pdf' : 'CV_EN.pdf';
    const pdfPath = `/pdf/${pdfFileName}`;

    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
