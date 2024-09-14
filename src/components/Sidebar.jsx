import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiUsers, FiFileText, FiCheckSquare, FiImage, FiSettings } from 'react-icons/fi';
import { ThemeContext } from './utilities/ThemeContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  const handleLinkClick = () => {
    setSidebarOpen(false); // Close sidebar when a link is clicked
  };

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#36AAD9]'
        } z-30 lg:static lg:translate-x-0 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="pl-4 flex justify-between items-center border-r border-[#EBEBEB]">
          <span className="text-xl font-bold p-4">Dashboard</span>
        </div>

        <nav className="mt-5 p-4 min-h-screen border-r border-[#EBEBEB]">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `p-4 flex items-center gap-3 rounded-md block ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-[#36AAD926]' // Light mode active background color
                      : ''
                  }`
                }
                onClick={handleLinkClick}
              >
                <FiUsers /> Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  `p-4 flex items-center gap-3 rounded-md block ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-[#36AAD926]' // Light mode active background color
                      : ''
                  }`
                }
                onClick={handleLinkClick}
              >
                <FiFileText /> Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todos"
                className={({ isActive }) =>
                  `p-4 flex items-center gap-3 rounded-md block ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-[#36AAD926]' // Light mode active background color
                      : ''
                  }`
                }
                onClick={handleLinkClick}
              >
                <FiCheckSquare /> Todos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/albums"
                className={({ isActive }) =>
                  `p-4 flex items-center gap-3 rounded-md block ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-[#36AAD926]' // Light mode active background color
                      : ''
                  }`
                }
                onClick={handleLinkClick}
              >
                <FiImage /> Albums
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `p-4 flex items-center gap-3 rounded-md block ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-[#36AAD926]' // Light mode active background color
                      : ''
                  }`
                }
                onClick={handleLinkClick}
              >
                <FiSettings /> Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
