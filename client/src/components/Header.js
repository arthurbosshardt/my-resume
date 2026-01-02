import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaHome, FaBirthdayCake } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import './Header.css';

const Header = ({ personal, currentLanguage, onChangeLanguage }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  
  if (!personal) return null;

  const imagePath = `${process.env.PUBLIC_URL || ''}/images/profile.jpg`;

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-info">
          <h1 className="name">{personal.name}</h1>
          <p className="role">{t('header.role')}</p>
          <p className="age">
            <FaBirthdayCake className="age-icon" />
            {personal.age} {t('header.yearsOld')}
          </p>
          <p className="location">
            <FaHome className="location-icon" />
            {t('header.location')}
          </p>
          <div className="header-language-toggle">
            <button
              className={`header-language-toggle-btn ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => onChangeLanguage('en')}
              title="English"
            >
              <ReactCountryFlag countryCode="GB" svg style={{ width: '1.2em', height: '1.2em' }} />
            </button>
            <button
              className={`header-language-toggle-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
              onClick={() => onChangeLanguage('fr')}
              title="Français"
            >
              <ReactCountryFlag countryCode="FR" svg style={{ width: '1.2em', height: '1.2em' }} />
            </button>
          </div>
        </div>
        <div className="header-center">
          <div className="header-links">
            <a 
              href="https://github.com/arthurbosshardt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub className="social-icon" />
              @arthurbosshardt
            </a>
            <a 
              href="https://www.linkedin.com/in/arthur-bosshardt-196900156/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin className="social-icon" />
              @arthur_bosshardt
            </a>
            <a href={`tel:${personal.contact.phone}`} className="contact-link">
              <FaPhone className="phone-icon" />
              {personal.contact.phone}
            </a>
            <a href={`mailto:${personal.contact.email}`} className="contact-link">
              <FaEnvelope className="contact-icon" />
              {personal.contact.email}
            </a>
          </div>
        </div>
        <div className="header-right">
          <div className="header-image">
            {!imageError ? (
              <img 
                src={imagePath} 
                alt={personal.name}
                className="profile-photo"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="profile-placeholder">
                <span>Photo</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;


