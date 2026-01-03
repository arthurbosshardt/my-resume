import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { sortByPeriod, formatDescription } from '../utils/helpers';
import './Education.css';

const Education = ({ education }) => {
  const { t } = useTranslation();
  if (!education || education.length === 0) return null;

  const sortedEducation = sortByPeriod(education);

  const getTranslationKey = (period) => {
    return period.replace(/\s/g, '').replace(/-/g, '_');
  };

  const parseEducationTitle = (title, period) => {
    const periodKey = getTranslationKey(period);
    const translatedTitle = t(`education.${periodKey}.title`, { defaultValue: title });
    
    // Extraire la localisation si elle est présente (format: "... - Nantes")
    const locationMatch = translatedTitle.match(/\s-\s(.+)$/);
    if (locationMatch) {
      return {
        schoolName: translatedTitle.replace(/\s-\s.+$/, ''),
        location: locationMatch[1]
      };
    }
    return {
      schoolName: translatedTitle,
      location: null
    };
  };

  return (
    <section className="education-section">
      <div className="education-list">
        {sortedEducation.map((edu, index) => {
          const { schoolName, location: titleLocation } = parseEducationTitle(edu.title, edu.period);
          // Utiliser edu.location si disponible, sinon utiliser la localisation extraite du titre
          let location = edu.location || titleLocation;
          // Traduire "Remote" en "Distanciel" en français
          if (location === "Remote") {
            location = t('common.remote');
          }
          const periodKey = getTranslationKey(edu.period);
          const description = t(`education.${periodKey}.description`, { defaultValue: edu.description });
          return (
            <div key={index} className="education-item">
              <div className="education-period">{edu.period}</div>
              <div className="education-content">
                <div className="education-title-row">
                  {edu.upcoming && (
                    <span className="upcoming-badge">{t('education.upcoming')}</span>
                  )}
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
                  dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
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


