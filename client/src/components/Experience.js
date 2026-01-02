import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { sortByPeriod, formatDescription } from '../utils/helpers';
import './Experience.css';

const Experience = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  const sortedExperience = sortByPeriod(experience);

  return (
    <section className="experience-section">
      <div className="experience-list">
        {sortedExperience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div className="experience-title-row">
                <div className="experience-period">{exp.period}</div>
                <h3 className="experience-title">{exp.title}</h3>
                {exp.current && (
                  <span className="current-badge">Current position</span>
                )}
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
            {exp.projects && exp.projects.map((project, pIndex) => (
              <div key={pIndex} className="project-item">
                <p 
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: formatDescription(project.description) }}
                />
                <div className="project-technologies-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="skill-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;


