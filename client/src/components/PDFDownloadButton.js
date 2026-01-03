import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { PRIMARY_COLOR_RGB } from '../constants/colors';
import './PDFDownloadButton.css';

const PDFDownloadButton = ({ resumeData, currentLanguage }) => {
  const { t } = useTranslation();

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;
    
    // Fonction pour charger l'image directement sans traitement (meilleure qualité)
    const loadImageAsBase64 = (url) => {
      return new Promise((resolve, reject) => {
        // Essayer de charger l'image directement via fetch pour éviter les problèmes de CORS
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
          .catch(() => {
            // Fallback sur la méthode Image si fetch échoue
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              // Créer un canvas à la taille réelle de l'image (pas de redimensionnement)
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              
              // Activer le lissage haute qualité
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              
              // Dessiner l'image telle quelle
              ctx.drawImage(img, 0, 0);
              
              try {
                const base64 = canvas.toDataURL('image/jpeg', 0.98);
                resolve(base64);
              } catch (e) {
                reject(e);
              }
            };
            img.onerror = reject;
            img.src = url;
          });
      });
    };

    // Fonction pour ajouter une nouvelle page si nécessaire (maximum 2 pages)
    let pageCount = 1;
    const checkPageBreak = (requiredSpace = 15) => {
      if (yPosition + requiredSpace > pageHeight - margin && pageCount < 2) {
        doc.addPage();
        pageCount++;
        yPosition = margin;
        return true;
      } else if (yPosition + requiredSpace > pageHeight - margin) {
        // Si on est à la page 2 et qu'on dépasse, on réduit l'espace
        return false;
      }
      return false;
    };

    // Fonction pour ajouter du texte avec retour à la ligne automatique
    const addText = (text, fontSize = 9, isBold = false, color = [0, 0, 0], x = margin, customLineHeight = null) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(color[0], color[1], color[2]);
      
      const maxWidth = pageWidth - x - margin;
      const lines = doc.splitTextToSize(text, maxWidth);
      const currentLineHeight = customLineHeight || (fontSize * 0.5);
      
      lines.forEach((line) => {
        checkPageBreak(currentLineHeight + 2);
        doc.text(line, x, yPosition);
        yPosition += currentLineHeight;
      });
    };

    // Fonction pour ajouter une section
    const addSectionTitle = (title, fontSize = 12) => {
      checkPageBreak(10);
      if (yPosition > margin + 5) yPosition += 3;
      addText(title, fontSize, true, PRIMARY_COLOR_RGB, margin, fontSize * 0.6);
      yPosition += 2;
    };

    // Fonction helper pour créer une clé de traduction à partir d'une période
    const getPeriodKey = (period) => {
      return period.replace(/\s/g, '').replace(/-/g, '_');
    };

    // Fonction pour nettoyer le HTML d'une description
    const cleanDescription = (description) => {
      return description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    };

    // Fonction pour dessiner une bande orange avec du texte (période)
    const drawPeriodBand = (text) => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      const textWidth = doc.getTextWidth(text);
      doc.setFillColor(PRIMARY_COLOR_RGB[0], PRIMARY_COLOR_RGB[1], PRIMARY_COLOR_RGB[2]);
      doc.roundedRect(margin, yPosition - 4, textWidth + 4, 6, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(text, margin + 2, yPosition);
      yPosition += 7;
    };

    // ===== PAGE 1: HEADER & PERSONAL INFO =====
    
    // Header avec fond coloré - structure comme le header web
    // Calculer la hauteur du header avec écarts égaux en haut et en bas (4 lignes)
    const headerLineHeight = 7;
    const headerVerticalMargin = 12; // Écart égal en haut et en bas
    const baseHeaderHeight = headerVerticalMargin + (headerLineHeight * 4) + headerVerticalMargin; // 4 lignes
    const headerHeight = baseHeaderHeight * 0.8; // Réduit de 20% seulement la hauteur totale
    
    doc.setFillColor(PRIMARY_COLOR_RGB[0], PRIMARY_COLOR_RGB[1], PRIMARY_COLOR_RGB[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Photo de profil - carrée, remplit la partie droite du header
    const photoSize = headerHeight; // Photo carrée de la hauteur du header
    const photoX = pageWidth - photoSize;
    const photoY = 0;
    
    try {
      const imagePath = `${process.env.PUBLIC_URL || ''}/images/profile.jpg`;
      const base64Image = await loadImageAsBase64(imagePath);
      
      // Détecter le format de l'image
      const imageFormat = base64Image.startsWith('data:image/jpeg') ? 'JPEG' : 'PNG';
      
      // Ajouter l'image carrée pour remplir la partie droite du header
      doc.addImage(base64Image, imageFormat, photoX, photoY, photoSize, photoSize);
    } catch (e) {
      // Si l'image ne peut pas être chargée, on ne dessine rien (pas de placeholder)
      console.error('Erreur chargement photo PDF:', e);
    }
    
    // Structure comme le header web : alignements horizontaux
    const leftX = margin;
    const rightX = photoX - 10; // Juste avant la photo
    let currentY = headerVerticalMargin; // Même écart que le bas
    
    doc.setTextColor(255, 255, 255); // Tout en blanc sur fond orange
    
    // Ligne 1: Nom ↔ GitHub
    doc.setFontSize(21); // +5px
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personal.name, leftX, currentY);
    
    doc.setFontSize(11.5); // +5px - Taille uniforme pour tous les éléments du header (sauf nom et rôle)
    doc.setFont('helvetica', 'normal');
    const githubText = 'github@arthurbosshardt';
    const githubWidth = doc.getTextWidth(githubText);
    doc.text(githubText, rightX - githubWidth, currentY);
    currentY += headerLineHeight;
    
    // Ligne 2: Rôle ↔ LinkedIn
    doc.setFontSize(14); // +5px
    doc.setFont('helvetica', 'bold');
    doc.text(t('header.role'), leftX, currentY);
    
    doc.setFontSize(11.5); // +5px
    doc.setFont('helvetica', 'normal');
    const linkedinText = 'linkedin@arthur_bosshardt';
    const linkedinWidth = doc.getTextWidth(linkedinText);
    doc.text(linkedinText, rightX - linkedinWidth, currentY);
    currentY += headerLineHeight;
    
    // Ligne 3: Âge/Localisation ↔ Téléphone
    doc.setFontSize(11.5); // +5px
    const ageLocationText = `${resumeData.personal.age} ${t('header.yearsOld')} • Vannes 56000`;
    doc.text(ageLocationText, leftX, currentY);
    
    // Formater le téléphone selon la langue
    let phoneText = resumeData.personal.contact.phone;
    if (currentLanguage === 'fr' && phoneText.startsWith('+33 6')) {
      phoneText = phoneText.replace('+33 6', '06');
    }
    const phoneWidth = doc.getTextWidth(phoneText);
    doc.text(phoneText, rightX - phoneWidth, currentY);
    currentY += headerLineHeight;
    
    // Ligne 4: Lien site web (sous localisation) ↔ Email
    const websiteUrl = 'arthurbosshardt.synology.me';
    doc.setFontSize(11.5); // +5px
    doc.setTextColor(255, 255, 255);
    doc.text(websiteUrl, leftX, currentY);
    // Ajouter le lien cliquable dans le PDF
    const websiteWidth = doc.getTextWidth(websiteUrl);
    doc.link(leftX, currentY - 4, websiteWidth, 4, { url: `https://${websiteUrl}` });
    
    // Email aligné à droite
    const emailText = resumeData.personal.contact.email;
    const emailWidth = doc.getTextWidth(emailText);
    doc.text(emailText, rightX - emailWidth, currentY);
    currentY += headerLineHeight;
    
    // Position de départ pour le contenu suivant
    yPosition = headerHeight + 8;

    // ===== PAGE 1: EXPERIENCE PROFESSIONNELLE =====
    addSectionTitle(t('breadcrumb.professionalExperience'), 12);
    
    resumeData.experience.forEach((exp, index) => {
      if (index > 0) checkPageBreak(25);
      
      // Période + Badge current si applicable
      let periodText = exp.period;
      if (exp.current) {
        periodText += ` • ${t('experience.currentPosition')}`;
      }
      
      // En-tête de l'expérience (largeur adaptée au contenu)
      drawPeriodBand(periodText);
      
      // Titre et entreprise (avec couleur pour le titre)
      const periodKey = getPeriodKey(exp.period);
      const title = t(`experience.${periodKey}.title`, { defaultValue: exp.title });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30); // Gris foncé pour le titre
      doc.text(title, margin, yPosition);
      
      // Entreprise et localisation
      const companyLocation = `${exp.company}${exp.location ? ` • ${exp.location}` : ''}`;
      const titleWidth = doc.getTextWidth(title);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80); // Gris moyen
      doc.text(` • ${companyLocation}`, margin + titleWidth, yPosition);
      yPosition += 6;
      
      // Projets
      if (exp.projects && exp.projects.length > 0) {
        exp.projects.forEach((project) => {
          if (project.client) {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(PRIMARY_COLOR_RGB[0], PRIMARY_COLOR_RGB[1], PRIMARY_COLOR_RGB[2]);
            const clientText = `Client: ${project.client}`;
            doc.text(clientText, margin, yPosition);
            yPosition += 4.5;
          }
          
          if (project.description) {
            const description = t(`experience.${periodKey}.description`, { defaultValue: project.description });
            const cleanedDesc = cleanDescription(description);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50); // Gris foncé pour le texte
            const descLines = doc.splitTextToSize(cleanedDesc, pageWidth - 2 * margin);
            descLines.forEach((line) => {
              checkPageBreak(4.5);
              doc.text(line, margin, yPosition);
              yPosition += 4.5;
            });
            yPosition += 1;
          }
          
          if (project.technologies && project.technologies.length > 0) {
            const techText = `Tech: ${project.technologies.join(', ')}`;
            doc.setFontSize(7);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(120, 120, 120); // Gris clair et italique
            const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin);
            techLines.forEach((line) => {
              checkPageBreak(3.5);
              doc.text(line, margin, yPosition);
              yPosition += 3.5;
            });
          }
        });
      }
      
      yPosition += 3;
    });

    // ===== PAGE 2: FORMATION =====
    // Forcer le passage à la page 2
    if (pageCount === 1) {
      doc.addPage();
      pageCount++;
      yPosition = margin;
    }
    addSectionTitle(t('breadcrumb.education'), 12);
    
    resumeData.education.forEach((edu) => {
      checkPageBreak(20);
      
      // Période + Badge "à venir" si applicable
      let periodText = edu.period;
      if (edu.upcoming) {
        periodText += ` • ${t('education.upcoming')}`;
      }
      
      // Période (largeur adaptée au contenu)
      drawPeriodBand(periodText);
      
      // Titre avec localisation à droite
      const periodKey = getPeriodKey(edu.period);
      const title = t(`education.${periodKey}.title`, { defaultValue: edu.title });
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(title, margin, yPosition);
      
      // Localisation à droite du titre
      if (edu.location) {
        const location = edu.location === 'Remote' ? t('common.remote') : edu.location;
        const titleWidth = doc.getTextWidth(title);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(` • ${location}`, margin + titleWidth, yPosition);
      }
      yPosition += 5.5;
      
      // Description (abrégée si trop longue)
      if (edu.description) {
        const description = t(`education.${periodKey}.description`, { defaultValue: edu.description });
        const cleanedDesc = cleanDescription(description);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50); // Gris foncé
        const descLines = doc.splitTextToSize(cleanedDesc, pageWidth - 2 * margin);
        // Limiter à 2 lignes max
        const limitedLines = descLines.slice(0, 2);
        limitedLines.forEach((line) => {
          checkPageBreak(4.5);
          doc.text(line, margin, yPosition);
          yPosition += 4.5;
        });
        yPosition += 1;
      }
      
      yPosition += 3;
    });

    // ===== PAGE 2: HARD SKILLS (après Education) =====
    addSectionTitle(t('breadcrumb.hardSkills'), 12);
    
    if (resumeData.skills && resumeData.skills.technical) {
      const technical = resumeData.skills.technical;
      const columnWidth = (pageWidth - 3 * margin) / 2; // 2 colonnes avec marge au milieu
      const leftCol = margin;
      const rightCol = margin + columnWidth + margin;
      let currentColY = yPosition;
      let rightColY = yPosition;
      
      // Fonction pour ajouter une catégorie dans une colonne
      const addCategory = (title, items, colX, startY) => {
        let localY = startY;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(PRIMARY_COLOR_RGB[0], PRIMARY_COLOR_RGB[1], PRIMARY_COLOR_RGB[2]);
        doc.text(title, colX, localY);
        localY += 3.5;
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60); // Gris foncé pour les compétences
        const itemsText = items.join(', ');
        const itemsLines = doc.splitTextToSize(itemsText, columnWidth - 5);
        itemsLines.forEach((line) => {
          checkPageBreak(3);
          doc.text(line, colX, localY);
          localY += 3;
        });
        return localY + 1.5;
      };
      
      // Colonne gauche
      if (technical.languagesFrameworks && technical.languagesFrameworks.length > 0) {
        currentColY = addCategory('Languages & Frameworks', technical.languagesFrameworks, leftCol, currentColY);
      }
      
      if (technical.softwares && technical.softwares.length > 0) {
        currentColY = addCategory('Softwares', technical.softwares, leftCol, currentColY);
      }
      
      if (technical.ai && technical.ai.length > 0) {
        currentColY = addCategory('AI Tools', technical.ai, leftCol, currentColY);
      }
      
      // Colonne droite
      if (technical.projectTools && technical.projectTools.length > 0) {
        rightColY = addCategory('Project Tools', technical.projectTools, rightCol, rightColY);
      }
      
      if (technical.testing && technical.testing.length > 0) {
        rightColY = addCategory('Testing', technical.testing, rightCol, rightColY);
      }
      
      if (technical.cicd && technical.cicd.length > 0) {
        rightColY = addCategory('CI/CD & DevOps', technical.cicd, rightCol, rightColY);
      }
      
      // Prendre le Y le plus bas des deux colonnes
      yPosition = Math.max(currentColY, rightColY);
    }

    // ===== PAGE 2: SOFT SKILLS & LANGUAGES (suite) =====
    
    // Soft Skills (plus compact, en liste)
    if (resumeData.skills && resumeData.skills.soft && resumeData.skills.soft.length > 0) {
      addSectionTitle(t('breadcrumb.softSkills'), 12);
      
      const skillKeyMap = {
        "Meeting facilitation (demos, retrospective...)": "meetingFacilitation",
        "Proactive mindset": "proactiveMindset",
        "Estimation and client communication": "estimationAndClientCommunication",
        "Technical communication mastery": "technicalCommunicationMastery",
        "Adaptation to project methodologies": "adaptationToProjectMethodologies",
        "Knowledge of business processes (IT services company experience)": "knowledgeOfBusinessProcesses",
        "Ease in facilitating presentations (daily, refinement...)": "easeInFacilitatingPresentations",
        "Pair programming": "pairProgramming"
      };
      
      // Rassembler les compétences en une seule ligne si possible
      const skillsList = resumeData.skills.soft.map(skill => {
        const translationKey = skillKeyMap[skill] || skill;
        return t(`skills.softSkills.${translationKey}`, { defaultValue: skill });
      });
      
      const skillsText = skillsList.join(' • ');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50); // Gris foncé
      const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
      skillsLines.forEach((line) => {
        checkPageBreak(4);
        doc.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 2;
    }
    
    // Concepts (compact)
    if (resumeData.skills && resumeData.skills.concepts && resumeData.skills.concepts.length > 0) {
      addSectionTitle('Concepts & Methodologies', 12);
      const conceptsText = resumeData.skills.concepts.join(' • ');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60); // Gris foncé
      const conceptsLines = doc.splitTextToSize(conceptsText, pageWidth - 2 * margin);
      conceptsLines.forEach((line) => {
        checkPageBreak(4);
        doc.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 2;
    }
    
    // Languages (compact)
    if (resumeData.skills && resumeData.skills.languages && resumeData.skills.languages.length > 0) {
      addSectionTitle('Languages', 12);
      
      const languagesList = resumeData.skills.languages.map(lang => {
        let langText = `${lang.name}: ${lang.level}`;
        if (lang.certification) langText += ` (${lang.certification})`;
        return langText;
      });
      
      const languagesText = languagesList.join(' • ');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60); // Gris foncé
      const languagesLines = doc.splitTextToSize(languagesText, pageWidth - 2 * margin);
      languagesLines.forEach((line) => {
        checkPageBreak(4);
        doc.text(line, margin, yPosition);
        yPosition += 4;
      });
    }

    // Télécharger le PDF
    doc.save(`CV_${resumeData.personal.name.replace(/\s/g, '_')}_${currentLanguage.toUpperCase()}.pdf`);
  };

  return (
    <button 
      className="pdf-download-button" 
      onClick={generatePDF}
      title={t('pdf.download')}
      aria-label={t('pdf.download')}
    >
      <FaFilePdf className="pdf-icon" />
      <span className="pdf-text">{t('pdf.download')}</span>
    </button>
  );
};

export default PDFDownloadButton;

