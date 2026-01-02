# Resume React Node.js

Site web pour exposer le CV d'Arthur BOSSHARDT - Full-Stack Developer

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 14 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (inclus avec Node.js)

Pour vérifier l'installation :
```bash
node --version
npm --version
```

## Structure du projet

- `server/` - Backend Node.js/Express avec API REST
- `client/` - Frontend React

## Installation

### Backend

```bash
cd server
npm install
npm start
```

Le serveur démarre sur le port 5000 par défaut.

### Frontend

```bash
cd client
npm install
npm start
```

L'application React démarre sur le port 3000 par défaut.

## API Endpoints

- `GET /api/resume` - Récupère toutes les données du CV
- `GET /api/resume/personal` - Informations personnelles
- `GET /api/resume/experience` - Expérience professionnelle
- `GET /api/resume/education` - Formation
- `GET /api/resume/skills` - Compétences

## Technologies utilisées

### Backend
- Node.js
- Express
- CORS

### Frontend
- React
- Axios
- CSS3

## Fonctionnalités

- Affichage complet du CV avec toutes les sections
- Design moderne et responsive
- API REST pour servir les données
- Interface utilisateur intuitive

## Dépannage

### Erreur : 'react-scripts' n'est pas reconnu

Cette erreur signifie que les dépendances du client n'ont pas été installées. Solution :

```bash
cd client
npm install
```

### Erreur : 'npm' n'est pas reconnu

Node.js n'est pas installé ou pas dans le PATH. Solutions :

1. **Installer Node.js** : Téléchargez et installez depuis [nodejs.org](https://nodejs.org/)
2. **Redémarrer le terminal** après l'installation
3. **Vérifier le PATH** : Assurez-vous que Node.js est dans votre PATH système

### Installation complète des dépendances

Pour installer toutes les dépendances (serveur et client) :

```bash
# Depuis la racine du projet
npm run install-all
```

Ou manuellement :

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```
