import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { getAllGenres } from '@/services/moviesService';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getAllGenres();
        setCategories(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <nav className="border-b border-white/10 text-white px-4 py-4 flex items-center justify-between md:px-6 lg:px-8">
 
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">Logo</div>

        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>

       
        <ul className="hidden md:flex items-center space-x-6">
          <li className="hover:text-gray-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer">
            <Link to="/my-list">My List</Link>
          </li>
          <li
            className="hover:text-gray-400 cursor-pointer relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Categories
            <div
              className={`z-20 absolute top-6 left-0 bg-gray-800 border border-gray-600 rounded shadow-lg w-96 p-4 ${
                isDropdownOpen ? 'block' : 'hidden'
              }`}
            >
              <ul className="grid grid-cols-4 gap-2 overflow-visible z-20">
                {categories.map((category, index) => (
                  <li key={index} className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                    <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Search and Profile Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* <input
          type="text"
          placeholder="Search"
          className="bg-gray-900 rounded-md py-1 px-4 text-white focus:outline-none"
        /> */}
         <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-900 text-gray-600 py-2 px-2 pl-12 pr-8 rounded-lg focus:outline-none focus:ring focus:ring-gray-800"
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
          </div>
    
        <button className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute w-full top-16 left-0 right-0 bg-black border-t border-gray-600 md:hidden">
          <ul className="flex flex-col items-start space-y-4 px-4 py-6">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/my-list" onClick={() => setIsMobileMenuOpen(false)}>My List</Link>
            </li>
            <li
              className="hover:text-gray-400 cursor-pointer relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categories
              <div
                className={`z-20 mt-2 bg-gray-800 border border-gray-600 rounded shadow-lg w-full ${
                  isDropdownOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="grid grid-cols-1 gap-4 p-4">
                  {categories.map((category, index) => (
                    <li key={index} className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                      <Link to={`/category/${category.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
