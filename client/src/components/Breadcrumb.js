import React from 'react';
import { FaBriefcase, FaGraduationCap, FaTools, FaUserFriends } from 'react-icons/fa';
import './Breadcrumb.css';

const Breadcrumb = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: 'experience', label: 'Professional Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'hardSkills', label: 'Hard Skills', icon: FaTools },
    { id: 'softSkills', label: 'Soft Skills', icon: FaUserFriends }
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
              <section.icon className="breadcrumb-icon" />
              {section.label}
            </button>
            {index < sections.length - 1 && (
              <span className="breadcrumb-separator">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;

