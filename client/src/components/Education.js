import React from 'react';
import './Education.css';

const Education = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="education-section">
      <h2 className="section-title">Education</h2>
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-period">{edu.period}</div>
            <div className="education-content">
              <h3 className="education-title">{edu.title}</h3>
              <p className="education-description">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;


