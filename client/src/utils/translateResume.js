// Helper pour traduire les données du CV
export const translateExperience = (experience, t) => {
  if (!experience) return experience;
  
  return experience.map(exp => {
    const periodKey = exp.period.replace(/\s/g, '').replace(/-/g, '_');
    const titleKey = `experience.${periodKey}.title`;
    const descriptionKey = `experience.${periodKey}.description`;
    
    return {
      ...exp,
      title: t(titleKey, { defaultValue: exp.title }),
      projects: exp.projects ? exp.projects.map(project => ({
        ...project,
        description: t(`${descriptionKey}.${project.client?.replace(/\s/g, '_') || 'default'}`, { defaultValue: project.description })
      })) : exp.projects
    };
  });
};

export const translateEducation = (education, t) => {
  if (!education) return education;
  
  return education.map(edu => {
    const periodKey = edu.period.replace(/\s/g, '').replace(/-/g, '_');
    const titleKey = `education.${periodKey}.title`;
    const descriptionKey = `education.${periodKey}.description`;
    
    return {
      ...edu,
      title: t(titleKey, { defaultValue: edu.title }),
      description: t(descriptionKey, { defaultValue: edu.description })
    };
  });
};



