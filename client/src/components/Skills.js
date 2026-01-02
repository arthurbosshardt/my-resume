import React, { useState } from 'react';
import { FaSortAlphaDown, FaSortAmountDown, FaCode, FaLaptop, FaProjectDiagram, FaCheckCircle, FaRocket, FaBrain } from 'react-icons/fa';
import './Skills.css';

const Skills = ({ skills }) => {
  const [sortOrders, setSortOrders] = useState({});

  const toggleSort = (category) => {
    setSortOrders(prev => ({
      ...prev,
      [category]: prev[category] === 'alphabetical' ? 'mastery' : 'alphabetical'
    }));
  };

  const sortSkills = (skillsArray, category) => {
    const order = sortOrders[category] || 'mastery';
    if (order === 'alphabetical') {
      return [...skillsArray].sort((a, b) => a.localeCompare(b));
    }
    return skillsArray; // Ordre de maîtrise (ordre actuel)
  };

  const getOpacity = (index, total, category) => {
    const order = sortOrders[category] || 'mastery';
    if (order === 'alphabetical') {
      return 1; // Opacité complète pour le tri alphabétique
    }
    
    // Pour Languages & Frameworks, le dégradé ne s'applique qu'aux 10 derniers
    if (category === 'languagesFrameworks' && total > 10) {
      const startGradientIndex = total - 10;
      if (index < startGradientIndex) {
        return 1.0; // Opacité complète pour les éléments avant les 10 derniers
      }
      // Dégradé pour les 10 derniers
      const relativeIndex = index - startGradientIndex;
      const minOpacity = 0.75;
      const maxOpacity = 1.0;
      const opacityStep = (maxOpacity - minOpacity) / Math.max(1, 9); // 9 car on a 10 éléments (0-9)
      return maxOpacity - (relativeIndex * opacityStep);
    }
    
    // Dégradé d'opacité standard pour le tri par maîtrise
    // Premier élément (index 0) = 1.0, dernier = 0.75
    const minOpacity = 0.75;
    const maxOpacity = 1.0;
    const opacityStep = (maxOpacity - minOpacity) / Math.max(1, total - 1);
    return maxOpacity - (index * opacityStep);
  };

  const sortAlphabetically = (skillsArray) => {
    return [...skillsArray].sort((a, b) => a.localeCompare(b));
  };

  if (!skills) return null;

  return (
    <section className="skills-section">
      {skills.technical && (
        <div className="skills-category">
          <div className="technical-categories-grid">
              {skills.technical.languagesFrameworks && Array.isArray(skills.technical.languagesFrameworks) && skills.technical.languagesFrameworks.length > 0 && (() => {
                const sortedSkills = sortSkills(skills.technical.languagesFrameworks, 'languagesFrameworks');
                const category = 'languagesFrameworks';
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaCode className="subcategory-icon" />
                      Languages & Frameworks
                      <button 
                        className="sort-button"
                        onClick={() => toggleSort('languagesFrameworks')}
                      >
                        {sortOrders['languagesFrameworks'] === 'alphabetical' ? (
                          <FaSortAlphaDown />
                        ) : (
                          <FaSortAmountDown />
                        )}
                      </button>
                      <span className="sort-tooltip">
                        ({sortOrders['languagesFrameworks'] === 'alphabetical' ? 'Alphabetical' : 'By mastery'})
                      </span>
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                        style={{ opacity: getOpacity(index, sortedSkills.length, category) }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}

              {skills.technical.cicd && Array.isArray(skills.technical.cicd) && skills.technical.cicd.length > 0 && (() => {
                const sortedSkills = sortAlphabetically(skills.technical.cicd);
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaRocket className="subcategory-icon" />
                      Continuous integration
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}

              {skills.technical.softwares && Array.isArray(skills.technical.softwares) && skills.technical.softwares.length > 0 && (() => {
                const sortedSkills = sortAlphabetically(skills.technical.softwares);
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaLaptop className="subcategory-icon" />
                      Softwares
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}

              {skills.technical.projectTools && Array.isArray(skills.technical.projectTools) && skills.technical.projectTools.length > 0 && (() => {
                const sortedSkills = sortAlphabetically(skills.technical.projectTools);
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaProjectDiagram className="subcategory-icon" />
                      Project tools
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}

              {skills.technical.testing && Array.isArray(skills.technical.testing) && skills.technical.testing.length > 0 && (() => {
                const sortedSkills = sortAlphabetically(skills.technical.testing);
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaCheckCircle className="subcategory-icon" />
                      Testing
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}

              {skills.technical.ai && Array.isArray(skills.technical.ai) && skills.technical.ai.length > 0 && (() => {
                const sortedSkills = sortAlphabetically(skills.technical.ai);
                return (
                <div className="technical-subcategory">
                  <div className="subcategory-header">
                    <h4 className="subcategory-title">
                      <FaBrain className="subcategory-icon" />
                      AI
                    </h4>
                  </div>
                  <div className="skills-tags">
                    {sortedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })()}
            </div>
        </div>
      )}

    </section>
  );
};

export default Skills;


