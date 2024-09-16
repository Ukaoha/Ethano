import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Users from '../pages/Users';
import Posts from '../pages/Posts';
import Todos from '../pages/Todos';
import Albums from '../pages/Albums';
import Settings from '../pages/Settings';
import { ThemeContext } from './utilities/ThemeContext';

const MainContent = () => {
  const { isDarkMode } = useContext(ThemeContext); 

  return (
    <main className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}  `}>
     <div className={`w-[90%] m-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}  `}>
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/todos" element={<Todos/>} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate to="/users" />} />
    </Routes>
  </div>
  </main>

  );
};

export default MainContent;
