import React from 'react';
import './Skills.css';

const Skills = ({ skills }) => {
  if (!skills) return null;

  return (
    <section className="skills-section">
      <h2 className="section-title">Other Skills</h2>
      
      {skills.technical && skills.technical.length > 0 && (
        <div className="skills-category">
          <h3 className="category-title">Technical skills</h3>
          <div className="skills-tags">
            {skills.technical.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {skills.soft && skills.soft.length > 0 && (
        <div className="skills-category">
          <h3 className="category-title">Soft skills</h3>
          <div className="skills-tags">
            {skills.soft.map((skill, index) => (
              <span key={index} className="skill-tag soft-skill">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {skills.concepts && skills.concepts.length > 0 && (
        <div className="skills-category">
          <h3 className="category-title">Concepts</h3>
          <div className="skills-tags">
            {skills.concepts.map((concept, index) => (
              <span key={index} className="skill-tag concept">{concept}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;


