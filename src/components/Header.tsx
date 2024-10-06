import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch} from 'react-icons/fi';
import { getAllGenres } from '@/services/moviesService';
import SearchComponent from './SearchBox';


interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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
       <SearchComponent/>
      </div>

       {/* Mobile Search Icon */}
       <div className="md:hidden flex items-center space-x-4">
        <button
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FiSearch className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute w-full top-16 left-0 right-0 bg-gray-800 border-t border-gray-600 md:hidden z-50">
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
                <ul className="grid grid-cols-4 gap-4 p-4">
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


      {/* Mobile Search Box */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 w-full bg-black px-4 py-4 md:hidden z-50">
          <SearchComponent />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
