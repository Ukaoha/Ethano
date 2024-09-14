import React, { useContext } from 'react';
import { FiSun, FiMoon, FiBell } from 'react-icons/fi';
import { ThemeContext } from './utilities/ThemeContext';

const Header = ({ setSidebarOpen }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get theme state and toggle function

  return (
    <header className="flex justify-between items-center border-b border-[#EBEBEB] bg-white-800 dark:bg-gray-800 p-8 shadow-md">
      <div className="flex items-center">
        {/* Hamburger Menu for Mobile Screens */}
        <button
          className="p-2 text-gray-600 dark:text-gray-200 lg:hidden"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        
        <input
          type="text"
          placeholder="Search"
          className='border border-primary w-[100%] dark:bg-gray-700 dark:text-white bg-white dark:border-gray-600 h-10 px-2 py-1 pl-10 text-primary placeholder-primary rounded-md text-sm focus:outline-none '
        />
      </div>

      {/* Theme Toggle and Profile Image */}
      <div className="flex items-center space-x-4 " >
        
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2 mx-2 text-gray-600 dark:text-gray-200" aria-label="Toggle Theme">
          {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
        </button>
        <FiBell className="text-2xl mr-4 cursor-pointer dark:text-white " />
        {/* Profile Image */}
        <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="User Profile" />
      </div>
    </header>
  );
};

export default Header;
