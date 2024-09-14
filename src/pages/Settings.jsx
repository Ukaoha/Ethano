import React, { useContext, useEffect } from 'react'; 
import profileimg from '../assets/react.svg';
import { ThemeContext } from '../components/utilities/ThemeContext'; 
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Settings = () => {
  const { isDarkMode } = useContext(ThemeContext); 

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS animations when theme changes
  }, [isDarkMode]);


  const profile = {
    username: 'CompanyName Inc.',
    email: 'companyname@example.com',
  };

  return (
    <div className={`p-6 min-h-screen  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`} data-aos="fade-up">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-0">Profile</h2>
      </div>

      <div className={`py-4 px-6 rounded-md mt-16 border-2 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`} data-aos="fade-up">
        <div>
          <h3 className='mb-4 text-lg font-bold'>Avatar</h3>
          <hr className={`mb-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />

          <div className='flex flex-col md:flex-row items-center mb-4'>
            <img
              src={profileimg}
              alt="Profile"
              className='w-16 h-16 mb-4 md:mb-0 mr-0 md:mr-8'
              data-aos="zoom-in"
            />
            <label
              htmlFor="file"
              className={`border text-sm font-bold px-4 py-2 cursor-pointer ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 text-black'}`}
              data-aos="zoom-in"
            >
              Change photo
            </label>
            <input
              type="file"
              id="file"
              className='hidden'
            />
          </div>

          <hr className={`mb-8 mt-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
          
          <div>
            <h4 className='text-lg font-semibold'>Account Info</h4>
            <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} data-aos="fade-up">Please fill the necessary information</p>
            <hr className={`mb-8 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />

            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/2 mb-4 md:pr-2' data-aos="fade-right">
                <label className='block mb-1' htmlFor='companyName'>Company Name</label>
                <input
                  type='text'
                  id='companyName'
                  className={`w-full border p-2 rounded ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 text-black'}`}
                  value={profile.username}
                  onChange={() => {}}
                />
              </div>

              <div className='w-full md:w-1/2 mb-4 md:pl-2' data-aos="fade-left">
                <label className='block mb-1' htmlFor='companyEmail'>Company Email Address</label>
                <input
                  type='email'
                  id='companyEmail'
                  className={`w-full border p-2 rounded ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 text-black'}`}
                  value={profile.email}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
