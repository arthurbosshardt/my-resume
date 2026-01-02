import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { sortByPeriod, formatDescription } from '../utils/helpers';
import './Experience.css';

const Experience = ({ experience, onSectionChange }) => {
  const { t } = useTranslation();
  if (!experience || experience.length === 0) return null;

  const handleTechnologyClick = () => {
    if (onSectionChange) {
      onSectionChange('hardSkills');
    }
  };

  const sortedExperience = sortByPeriod(experience);

  const getTranslationKey = (period) => {
    return period.replace(/\s/g, '').replace(/-/g, '_');
  };

  return (
    <section className="experience-section">
      <div className="experience-list">
        {sortedExperience.map((exp, index) => {
          const periodKey = getTranslationKey(exp.period);
          return (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title-row">
                <div className="experience-period">{exp.period}</div>
                {exp.current && (
                  <span className="current-badge">{t('experience.currentPosition')}</span>
                )}
                <h3 className="experience-title">{t(`experience.${periodKey}.title`, { defaultValue: exp.title })}</h3>
                <span className="experience-separator">•</span>
                <div className="experience-company-info">
                  <FaBuilding className="company-icon" />
                  <span className="experience-company">{exp.company}</span>
                </div>
                {exp.projects && exp.projects.length > 0 && exp.projects[0].client && (
                  <>
                    <span className="experience-separator">•</span>
                    <div className="experience-client-info">
                      <FaUserTie className="client-icon" />
                      <span className="experience-client">{exp.projects[0].client}</span>
                    </div>
                  </>
                )}
                <span className="experience-separator">•</span>
                <div className="experience-location-info">
                  <FaMapMarkerAlt className="location-icon" />
                  <span className="experience-location">{exp.location}</span>
                </div>
              </div>
            </div>
            {exp.projects && exp.projects.map((project, pIndex) => {
              const periodKey = getTranslationKey(exp.period);
              const description = t(`experience.${periodKey}.description`, { defaultValue: project.description });
              return (
              <div key={pIndex} className="project-item">
                <p 
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
                />
                <div className="project-technologies-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="skill-tag clickable-skill-tag"
                      onClick={handleTechnologyClick}
                      style={{ cursor: 'pointer' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;


