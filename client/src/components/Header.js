import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaBirthdayCake } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import './Header.css';

const Header = ({ personal, currentLanguage, onChangeLanguage }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  
  if (!personal) return null;

  const imagePath = `${process.env.PUBLIC_URL || ''}/images/profile.jpg`;
  
  // Formater le téléphone selon la langue
  const formatPhone = (phone) => {
    if (currentLanguage === 'fr' && phone.startsWith('+33 6')) {
      return phone.replace('+33 6', '06');
    }
    return phone;
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-grid">
          <h1 className="name">{personal.name}</h1>
          <a 
            href="https://github.com/arthurbosshardt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaGithub className="social-icon" />
            @arthurbosshardt
          </a>
          <p className="role">{t('header.role')}</p>
          <a 
            href="https://www.linkedin.com/in/arthur-bosshardt-196900156/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaLinkedin className="social-icon" />
            @arthur_bosshardt
          </a>
          <p className="age-location">
            <FaBirthdayCake className="age-icon" />
            {personal.age} {t('header.yearsOld')}
            <span className="separator"> • </span>
            Vannes 56000{' '}
            <ReactCountryFlag countryCode="FR" svg style={{ width: '1.2em', height: '1.2em' }} />
          </p>
          <a href={`tel:${personal.contact.phone}`} className="contact-link">
            <FaPhone className="phone-icon" />
            {formatPhone(personal.contact.phone)}
          </a>
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
          <a href={`mailto:${personal.contact.email}`} className="contact-link">
            <FaEnvelope className="contact-icon" />
            {personal.contact.email}
          </a>
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


