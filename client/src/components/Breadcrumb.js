import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: 'experience', label: 'Professional Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Other Skills' }
  ];

  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-container">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <button
              className={`breadcrumb-item ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </button>
            {index < sections.length - 1 && (
              <span className="breadcrumb-separator">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;

