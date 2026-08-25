export interface Contact {
  phone: string;
  email: string;
}

export interface Personal {
  name: string;
  age: number;
  location: string;
  role: string;
  contact: Contact;
}

export interface Project {
  client: string;
  technologies: string[];
  description: string;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  location: string;
  current?: boolean;
  projects: Project[];
}

export interface Education {
  period: string;
  title: string;
  location?: string;
  description: string;
  upcoming?: boolean;
}

export interface TechnicalSkills {
  languagesFrameworks: string[];
  softwares: string[];
  ai: string[];
  projectTools: string[];
  testing: string[];
  cicd: string[];
}

export interface Language {
  name: string;
  level: string;
  communication?: string;
  understanding?: string;
  certification?: string;
}

export interface Skills {
  technical: TechnicalSkills;
  soft: string[];
  concepts: string[];
  languages: Language[];
}

export interface Resume {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  skills: Skills;
}

export type Section = 'experience' | 'education' | 'hardSkills' | 'softSkills';
