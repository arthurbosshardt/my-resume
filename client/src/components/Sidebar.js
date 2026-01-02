import React from 'react';
import './Sidebar.css';

const Sidebar = ({ skills, personal }) => {
  if (!skills || !personal) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {skills.main && skills.main.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Main skills</h3>
            <ul className="sidebar-list">
              {skills.main.map((skill, index) => (
                <li key={index} className="sidebar-item">{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {skills.softwares && skills.softwares.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Softwares</h3>
            <ul className="sidebar-list">
              {skills.softwares.map((software, index) => (
                <li key={index} className="sidebar-item">{software}</li>
              ))}
            </ul>
          </div>
        )}

        {skills.languages && skills.languages.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Languages</h3>
            {skills.languages.map((lang, index) => (
              <div key={index} className="language-item">
                <div className="language-name-level">
                  <span className="language-name">{lang.name}</span>
                  <span className="language-level"> - {lang.level}</span>
                </div>
                {lang.communication && (
                  <div className="language-detail">
                    Communication: {lang.communication}
                  </div>
                )}
                {lang.understanding && (
                  <div className="language-detail">
                    Understanding: {lang.understanding}
                  </div>
                )}
                {lang.certification && (
                  <div className="language-certification">
                    {lang.certification}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="sidebar-section">
          <h3 className="sidebar-title">Contact</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Téléphone:</span>
              <a href={`tel:${personal.contact.phone}`} className="contact-value">
                {personal.contact.phone}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${personal.contact.email}`} className="contact-value">
                {personal.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


