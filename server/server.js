const express = require('express');
const cors = require('cors');
const resumeData = require('./data/resume.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route pour obtenir toutes les données du CV
app.get('/api/resume', (req, res) => {
  res.json(resumeData);
});

// Route pour obtenir les informations personnelles
app.get('/api/resume/personal', (req, res) => {
  res.json(resumeData.personal);
});

// Route pour obtenir l'expérience professionnelle
app.get('/api/resume/experience', (req, res) => {
  res.json(resumeData.experience);
});

// Route pour obtenir la formation
app.get('/api/resume/education', (req, res) => {
  res.json(resumeData.education);
});

// Route pour obtenir les compétences
app.get('/api/resume/skills', (req, res) => {
  res.json(resumeData.skills);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


