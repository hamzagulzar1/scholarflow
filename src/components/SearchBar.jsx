// C:\Users\Gulzar\scholarflow2\src\components\SearchBar.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // You've indicated this module works for you

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [predictions, setPredictions] = useState([]);
    const router = useRouter(); // This should be 'next/router' unless you're using a custom solution

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim().length > 1) {
            try {
                const res = await fetch(`/api/search?term=${encodeURIComponent(value.trim())}`);
                const result = await res.json();
                setPredictions(result.predictions);
            } catch (error) {
                console.error('Error fetching predictions:', error);
            }
        } else {
            setPredictions([]);
        }
    };

    const handlePredictionSelect = (prediction) => {
        setSearchTerm(prediction); // Populate the search bar with the selected prediction
        setPredictions([]); // Optionally, clear predictions after selection
    };

    const handleSearchSubmit = () => {
        // Redirect to the university page when the search button is clicked
        if (searchTerm) {
            router.push(`/universities/${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="relative w-[930px] h-[375px] bg-[#0060AF] opacity-80 flex flex-col justify-center items-center rounded-lg shadow-lg">
            <h1 className="text-white text-3xl font-bold">University Programs in Pakistan 2024/25</h1>
            <h2 className="text-white text-xl mb-4">Choose your University!</h2>
            <div className="flex w-full max-w-[500px] items-center relative">
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                />
                <button
                    type="button" // Make sure this is 'button' to prevent form submission
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSearchSubmit}
                >
                    Search
                </button>
                <ul className="absolute top-full left-0 w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                    {predictions.map((prediction, index) => (
                        <li 
                            key={index} 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePredictionSelect(prediction)}
                        >
                            {prediction}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;
