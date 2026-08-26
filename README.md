# Resume

Site web pour exposer le CV d'Arthur BOSSHARDT - Full-stack developer

Application Angular statique (pas de backend). Les données du CV et les traductions sont chargées en JSON depuis `src/assets/`, et les PDF téléchargeables sont servis depuis `public/pdf/`.

## Prérequis

- **Node.js** (version 20 ou supérieure)
- **npm** (inclus avec Node.js)

## Installation

```bash
npm install
```

## Développement

```bash
npm start
```

L'application démarre sur http://localhost:4200

## Build de production

```bash
npm run build
```

Les fichiers statiques sont générés dans `dist/resume/browser`.

## Déploiement

Déployé sur GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`), avec la branche `develop` configurée comme branche de déploiement (push sur `develop` = déploiement). Le site est servi sur le domaine personnalisé `arthur-bosshardt-resume.org` (voir le fichier `public/CNAME`).

## Structure du projet

- `src/app/components/` - Composants Angular standalone (header, breadcrumb, experience, education, skills, soft-skills, pdf-download-button)
- `src/app/services/` - Services (données du CV, i18n)
- `src/assets/data/resume.json` - Données du CV
- `src/assets/i18n/` - Traductions (en/fr)
- `public/pdf/` - CV au format PDF téléchargeable
- `public/images/` - Photo de profil

## Technologies utilisées

- Angular 22 (standalone components)
- TypeScript
- Font Awesome (icônes)
