import { Component, inject, input, output, signal } from '@angular/core';
import { I18nService, Lang } from '../../services/i18n.service';
import { Personal } from '../../models/resume.model';
import { formatLocation, calculateAge } from '../../utils/helpers';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly i18n = inject(I18nService);
  readonly personal = input.required<Personal>();
  readonly currentLanguage = input.required<Lang>();
  readonly languageChange = output<Lang>();

  readonly imageError = signal(false);
  readonly imagePath = 'images/profile.jpg';

  onImageError(): void {
    this.imageError.set(true);
  }

  formatPhone(phone: string): string {
    if (this.currentLanguage() === 'fr' && phone.startsWith('+33 6')) {
      return phone.replace('+33 6', '06');
    }
    return phone;
  }

  getLocation(): string {
    return formatLocation('Vannes', this.currentLanguage());
  }

  getAge(): number {
    return calculateAge(this.personal().birthDate);
  }

  getFirstName(): string {
    return this.personal().name.split(' ')[0];
  }

  getLastName(): string {
    return this.personal().name.split(' ').slice(1).join(' ');
  }
}
