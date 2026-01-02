import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBriefcase, FaGraduationCap, FaTools, FaUserFriends } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import './Breadcrumb.css';

const Breadcrumb = ({ currentSection, onSectionChange, currentLanguage, onChangeLanguage }) => {
  const { t } = useTranslation();
  
  const sections = [
    { id: 'experience', labelKey: 'breadcrumb.professionalExperience', icon: FaBriefcase },
    { id: 'education', labelKey: 'breadcrumb.education', icon: FaGraduationCap },
    { id: 'hardSkills', labelKey: 'breadcrumb.hardSkills', icon: FaTools },
    { id: 'softSkills', labelKey: 'breadcrumb.softSkills', icon: FaUserFriends }
  ];

  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb-language-toggle">
          <button
            className={`language-toggle ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => onChangeLanguage('en')}
            title="English"
          >
            <ReactCountryFlag countryCode="GB" svg style={{ width: '1.2em', height: '1.2em' }} />
          </button>
          <button
            className={`language-toggle ${currentLanguage === 'fr' ? 'active' : ''}`}
            onClick={() => onChangeLanguage('fr')}
            title="Français"
          >
            <ReactCountryFlag countryCode="FR" svg style={{ width: '1.2em', height: '1.2em' }} />
          </button>
        </div>
        <div className="breadcrumb-container">
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <button
                className={`breadcrumb-item ${currentSection === section.id ? 'active' : ''}`}
                onClick={() => onSectionChange(section.id)}
              >
                <section.icon className="breadcrumb-icon" />
                {t(section.labelKey)}
              </button>
              {index < sections.length - 1 && (
                <span className="breadcrumb-separator">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;

