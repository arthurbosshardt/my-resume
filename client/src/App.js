import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import SoftSkills from './components/SoftSkills';

function App() {
  const { i18n } = useTranslation();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('experience');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get('/api/resume');
        setResumeData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading resume: {error}</p>
      </div>
    );
  }

  if (!resumeData) {
    return null;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'experience':
        return <Experience experience={resumeData.experience} onSectionChange={setCurrentSection} />;
      case 'education':
        return <Education education={resumeData.education} />;
      case 'hardSkills':
        return <Skills skills={resumeData.skills} />;
      case 'softSkills':
        return <SoftSkills skills={resumeData.skills} />;
      default:
        return <Experience experience={resumeData.experience} onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="app">
      <div className="resume-container">
        <Header personal={resumeData.personal} />
        <Breadcrumb 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />
        <div className="resume-content">
          <div className="main-content">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


