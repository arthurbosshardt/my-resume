import React from 'react';
import './Experience.css';

const Experience = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="experience-section">
      <h2 className="section-title">Professional Experience</h2>
      <div className="experience-list">
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div className="experience-period">{exp.period}</div>
              <div className="experience-title-company">
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">
                  {exp.company} - {exp.location}
                </p>
              </div>
            </div>
            {exp.projects && exp.projects.map((project, pIndex) => (
              <div key={pIndex} className="project-item">
                <div className="project-client">{project.client}</div>
                <div className="project-technologies">
                  {project.technologies.join(' - ')}
                </div>
                <p className="project-description">{project.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;


