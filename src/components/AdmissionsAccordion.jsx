import React, { useState } from 'react';

const AdmissionsAccordion = ({ admissionsData }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const levels = ['Bachelors', 'Masters', 'PhD'];

  const toggleAccordion = (level) => {
    setOpenAccordion(openAccordion === level ? null : level);
  };

  return (
    <div id="accordion-color" data-accordion="collapse">
      {levels.map((level, index) => {
        const levelData = admissionsData?.result?.programs?.find(program => program.level === level);
        const isOpen = openAccordion === level;

        return (
          <React.Fragment key={level}>
            <h2 id={`accordion-color-heading-${index + 1}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(level)}
                aria-expanded={isOpen}
                aria-controls={`accordion-color-body-${index + 1}`}
              >
                <span>{level} Programs</span>
                <svg data-accordion-icon className={`w-6 h-6 transform transition-transform ${isOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h2>
            <div id={`accordion-color-body-${index + 1}`} className={`${isOpen ? "" : "hidden"}`} aria-labelledby={`accordion-color-heading-${index + 1}`}>
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                {levelData ? (
                  Object.entries(levelData.updates).map(([key, value]) => (
                    <p key={key} className="mb-2 text-gray-500 dark:text-gray-400">
                      {key}: {value}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No information available</p>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AdmissionsAccordion;
