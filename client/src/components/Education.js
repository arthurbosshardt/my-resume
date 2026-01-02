import React from 'react';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { sortByPeriod, formatDescription } from '../utils/helpers';
import './Education.css';

const Education = ({ education }) => {
  if (!education || education.length === 0) return null;

  const sortedEducation = sortByPeriod(education);

  const parseEducationTitle = (title) => {
    // Extraire la localisation si elle est présente (format: "... - Nantes")
    const locationMatch = title.match(/\s-\s(.+)$/);
    if (locationMatch) {
      return {
        schoolName: title.replace(/\s-\s.+$/, ''),
        location: locationMatch[1]
      };
    }
    return {
      schoolName: title,
      location: null
    };
  };

  return (
    <section className="education-section">
      <div className="education-list">
        {sortedEducation.map((edu, index) => {
          const { schoolName, location: titleLocation } = parseEducationTitle(edu.title);
          // Utiliser edu.location si disponible, sinon utiliser la localisation extraite du titre
          const location = edu.location || titleLocation;
          return (
            <div key={index} className="education-item">
              <div className="education-period">{edu.period}</div>
              <div className="education-content">
                <div className="education-title-row">
                  <div className="education-school-info">
                    <FaGraduationCap className="school-icon" />
                    <h3 className="education-title">{schoolName}</h3>
                  </div>
                  {location && (
                    <div className="education-location-info">
                      <FaMapMarkerAlt className="location-icon" />
                      <span className="education-location">{location}</span>
                    </div>
                  )}
                </div>
                <p 
                  className="education-description"
                  dangerouslySetInnerHTML={{ __html: formatDescription(edu.description) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;


