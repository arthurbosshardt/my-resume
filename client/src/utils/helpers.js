// Fonction pour extraire l'année d'une période (ex: "2021 - 2023" -> 2021)
export const getYearFromPeriod = (period) => {
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
};

// Fonction pour trier par période (du plus récent au plus ancien)
export const sortByPeriod = (items) => {
  return [...items].sort((a, b) => {
    const yearA = getYearFromPeriod(a.period);
    const yearB = getYearFromPeriod(b.period);
    return yearB - yearA; // Décroissant
  });
};

// Fonction pour formater la description avec retours à la ligne intelligents
export const formatDescription = (text) => {
  if (!text) return '';
  // Ajouter un retour à la ligne après les points suivis d'un espace et une majuscule
  return text.replace(/\. ([A-Z])/g, '.<br />$1');
};

