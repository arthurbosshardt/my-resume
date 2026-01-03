import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFilePdf } from 'react-icons/fa';
import './PDFDownloadButton.css';

const PDFDownloadButton = ({ currentLanguage }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const pdfFileName = currentLanguage === 'fr' ? 'CV_FR.pdf' : 'CV_EN.pdf';
    const pdfPath = `/pdf/${pdfFileName}`;
    
    // Créer un lien temporaire pour télécharger le fichier
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      className="pdf-download-button" 
      onClick={handleDownload}
      aria-label={t('pdf.download')}
    >
      <FaFilePdf className="pdf-icon" />
      <span className="pdf-text">{t('pdf.download')}</span>
    </button>
  );
};

export default PDFDownloadButton;
