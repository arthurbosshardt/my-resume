import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly http = inject(HttpClient);

  getResume(): Observable<Resume> {
    return this.http.get<Resume>('assets/data/resume.json');
  }
}
