import React from 'react';
import { FaHandshake, FaLightbulb, FaGlobe } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import './SoftSkills.css';

const getLanguageFlag = (languageName) => {
  const flagMap = {
    'French': 'FR',
    'English': 'GB',
    'Spanish': 'ES',
    'Mandarin': 'CN'
  };
  return flagMap[languageName] || null;
};

const SoftSkills = ({ skills }) => {
  if (!skills) return null;

  return (
    <section className="soft-skills-section">
      <div className="soft-skills-grid">
        {skills.soft && skills.soft.length > 0 && (
          <div className="skills-category-card">
            <h3 className="category-title">
              <FaHandshake className="category-icon" />
              Social skills
            </h3>
            <div className="skills-tags">
              {skills.soft.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {skills.concepts && skills.concepts.length > 0 && (
          <div className="skills-category-card">
            <h3 className="category-title">
              <FaLightbulb className="category-icon" />
              Concepts
            </h3>
            <div className="skills-tags">
              {skills.concepts.map((concept, index) => (
                <span key={index} className="skill-tag">{concept}</span>
              ))}
            </div>
          </div>
        )}

        {skills.languages && skills.languages.length > 0 && (
          <>
            <h3 className="category-title languages-title">
              <FaGlobe className="category-icon" />
              Languages
            </h3>
            <div className="languages-grid languages-full-width">
              {skills.languages.map((lang, index) => {
                const countryCode = getLanguageFlag(lang.name);
                return (
                  <div key={index} className="language-item">
                    <div className="language-name-level">
                      {countryCode && (
                        <ReactCountryFlag 
                          countryCode={countryCode}
                          svg
                          style={{
                            width: '1.2em',
                            height: '1.2em',
                          }}
                          title={lang.name}
                        />
                      )}
                      <span className="language-name">{lang.name}</span>
                      <span className="language-level"> - {lang.level}</span>
                    </div>
                    {lang.communication && (
                      <div className="language-detail">
                        <span className="language-label-bold">Communication:</span> {lang.communication}
                      </div>
                    )}
                    {lang.understanding && (
                      <div className="language-detail">
                        <span className="language-label-bold">Understanding:</span> {lang.understanding}
                      </div>
                    )}
                    {lang.certification && (
                      <div className="language-certification">
                        <span className="toeic-label">TOEIC</span> {lang.certification.replace('TOEIC', '').trim()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SoftSkills;

