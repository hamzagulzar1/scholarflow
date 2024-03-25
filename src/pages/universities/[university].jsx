// File: /pages/universities/[university].jsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const tabs = ['Overview', 'Programs', 'Academic Fields'];

const UniversityPage = () => {
  const router = useRouter();
  const { university } = router.query;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [universityData, setUniversityData] = useState({});

  // Fetch university data when the component mounts or when the active tab changes
  useEffect(() => {
    if (!university) return;

    const fetchUniversityData = async () => {
      const response = await fetch(`/api/universities?name=${encodeURIComponent(university)}`);
      const data = await response.json();
      setUniversityData(data);
    };

    fetchUniversityData();
  }, [university]);

  // Function to handle clicking a tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderDegrees = (degrees) => {
    return Object.entries(degrees).map(([degree, isOffered]) => (
      <li key={degree}>{degree}: {isOffered ? 'Available' : 'Not available'}</li>
    ));
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{universityData.university_name}</h1>
      {/* Tab navigation */}
      <div className="mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 mr-2 ${
              activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div>
        {activeTab === 'Overview' && (
          <div>
            {/* Render overview content here */}
            {/* Since overview should show everything, you can iterate over each key in the data */}
            {Object.keys(universityData).map((key) => {
              if (key === '_id') return null; // skip id
              return (
                <div key={key}>
                  <h2 className="text-2xl font-semibold mt-2">{key.replace('_', ' ')}</h2>
                  <p>{JSON.stringify(universityData[key], null, 2)}</p>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === 'Programs' && (
          <div>
            <h2 className="text-2xl font-semibold mt-2">Programs offered</h2>
            {/* Map over the programs and display them */}
            {universityData.programs?.map((program, index) => (
              <div key={index} className="mt-1">
                {Object.entries(program).map(([field, value], subIndex) => (
                  <p key={subIndex}>
                    <strong>{field.replace('_', ' ')}:</strong> {value.toString()}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Academic Fields' && (
          <div>
            <h2 className="text-2xl font-semibold mt-2">Academic Fields</h2>
            {/* Display academic fields content here */}
            {Object.entries(universityData.academic_fields || {}).map(([degree, field], index) => (
              <div key={index} className="mt-1">
                <strong>{degree.replace('_', ' ')}:</strong> {field}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityPage;
