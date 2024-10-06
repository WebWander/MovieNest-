import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '@/services/SearchService';
import { Movie } from '../entities';
import { debounce } from '@mui/material';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Debounced function to handle search
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim() !== '') {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 200),
    [] // Only create this function once
  );

  useEffect(() => {
    // Call the debounced search function whenever the query changes
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    // Reset selected index when query changes
    setSelectedIndex(null);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (selectedIndex !== null && searchResults[selectedIndex]) {
          navigate(`/film/${searchResults[selectedIndex].id}`);
        }
        break;
      case 'ArrowDown':
        setSelectedIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return (prevIndex + 1) % searchResults.length;
        });
        break;
      case 'ArrowUp':
        setSelectedIndex((prevIndex) => {
          if (prevIndex === null) return searchResults.length - 1;
          return (prevIndex - 1 + searchResults.length) % searchResults.length;
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={query === '' ? 'Search' : ''}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-gray-900 text-white py-2 px-2 pl-12 pr-8 rounded-lg focus:outline-none focus:ring focus:ring-gray-800 w-full"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 absolute top-1/2 transform -translate-y-1/2 left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {searchResults.length > 0 && (
        <ul className="absolute left-0 right-0 bg-gray-800 mt-1 rounded-md shadow-lg max-h-64 overflow-y-auto z-50 text-wrap overflow-y-scroll">
          {searchResults.map((movie, index) => (
            <li
              key={movie.id}
              className={`p-2 cursor-pointer hover:bg-gray-700 ${
                selectedIndex === index ? 'bg-gray-700' : ''
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => navigate(`/film/${movie.id}`)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;


/* className='bg-gray-800 text-gray-600 p-4 rounded-lg mt-2 cursor-pointer hover:bg-gray-900 w-1/2' */
