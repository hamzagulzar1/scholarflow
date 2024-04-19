import React, { useState, useEffect } from 'react';

const AdvancedSearch = ({ universityName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [degreeDetails, setDegreeDetails] = useState(null);
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    if (searchTerm.length > 2) {
      // Debounce the search to avoid too many requests
      const timeoutId = setTimeout(() => {
        fetch(`/api/programs?university=${encodeURIComponent(universityName)}&term=${encodeURIComponent(searchTerm)}`)
          .then(response => response.json())
          .then(programNames => {
            setPredictions(programNames);
            setShowPredictions(true);
          })
          .catch(console.error);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setPredictions([]);
    }
  }, [searchTerm, universityName]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setShowPredictions(false);
    const response = await fetch(`/api/programDetails?university=${encodeURIComponent(universityName)}&program=${encodeURIComponent(searchTerm)}`);
    if (response.ok) {
      const details = await response.json();
      setDegreeDetails(details);
    } else {
      setDegreeDetails(null);
    }
  };

  const handlePredictionSelect = (prediction) => {
    setSearchTerm(prediction);
    setShowPredictions(false);
  };

  return (
    <form className="flex flex-col items-center justify-center pt-32" onSubmit={handleSearchSubmit}>
      <div className="flex justify-center w-full max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for programs..."
            className="block w-full pl-10 pr-4 py-2 text-sm border rounded-l-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {showPredictions && predictions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-60 overflow-auto">
              {predictions.map((prediction, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlePredictionSelect(prediction)}
                >
                  {prediction}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Search
        </button>
      </div>
      {degreeDetails && (
        <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          <p>Bachelor's degree: {degreeDetails.Bachelor ? 'Available' : 'Not available'}</p>
          <p>Master's degree: {degreeDetails.Master ? 'Available' : 'Not available'}</p>
          <p>Doctoral degree: {degreeDetails.Doctoral ? 'Available' : 'Not available'}</p>
        </div>
      )}
    </form>
  );
};

export default AdvancedSearch;
