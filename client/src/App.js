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
import PDFDownloadButton from './components/PDFDownloadButton';

function App() {
  const { i18n } = useTranslation();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('experience');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isSoftSkillsSection = currentSection === 'softSkills';
  const isHardSkillsSection = currentSection === 'hardSkills';

  return (
    <div className="app">
      <div className="resume-container">
        <Header 
          personal={resumeData.personal}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />
        <Breadcrumb 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection}
        />
        <div className="resume-content">
          {isSoftSkillsSection ? (
            renderSection()
          ) : (isHardSkillsSection && !isMobile) ? (
            renderSection()
          ) : (
            <div className="main-content">
              {renderSection()}
            </div>
          )}
        </div>
      </div>
      <PDFDownloadButton 
        currentLanguage={i18n.language}
      />
    </div>
  );
}

export default App;


