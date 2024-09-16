import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { albums, users } from '../components/utilities/apiServices';
import { ClipLoader } from 'react-spinners';
import { ThemeContext } from '../components/utilities/ThemeContext'; 
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Albums = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access the dark mode state
  const [currentPage, setCurrentPage] = useState(0);
  const albumsPerPage = 7; // Adjust the number of albums to display per page
  const pageRange = 5;

  const { data: albumsData, isLoading: isAlbumsLoading, isError: isAlbumsError, error: albumsError } = useQuery('albums', albums);
  const { data: usersData, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery('users', users);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS animations when theme changes
  }, [isDarkMode]);


  if (isAlbumsLoading || isUsersLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>

      <ClipLoader size={50} color={isDarkMode ? '#ffffff' : '#123abc'} />
    </div>
    );
  }

  if (isAlbumsError || isUsersError) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
        <p>Error: {isAlbumsError ? albumsError.message : usersError.message}</p>
      </div>
    );
  }

  // Get the name of the user associated with the album by userId
  const getUserName = (userId) => {
    const user = usersData?.find(user => user.id === userId);
    return user?.name || 'Unknown';
  };

  // Pagination logic
  const totalPages = Math.ceil(albumsData?.length / albumsPerPage);
  const startIdx = currentPage * albumsPerPage;
  const endIdx = startIdx + albumsPerPage;
  const paginatedAlbums = albumsData?.slice(startIdx, endIdx);

  // Determine the range of pages to show in pagination
  const currentRangeStart = Math.floor(currentPage / pageRange) * pageRange;
  const currentRangeEnd = Math.min(currentRangeStart + pageRange, totalPages);
  const pageNumbers = Array.from({ length: currentRangeEnd - currentRangeStart }, (_, i) => currentRangeStart + i);

  // Handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Previous / Next navigation
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={` pb-4  p-4 sm:p-6 lg:p-8 min-h-screen  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-0">Albums</h2>
      </div>
      {paginatedAlbums?.map(album => (
        <div
          key={album.id}
          className={`mb-4 p-4 border rounded-lg shadow-sm transition hover:shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-black'
          }`}
          data-aos="fade-up" // Add AOS animation here
        >
          <h2 className="font-bold text-lg">{album.title}</h2>
          <p className="text-gray-700">{album.body}</p>
          <p className="italic text-sm text-gray-500">Posted by: {getUserName(album.userId)}</p>
        </div>
      ))}

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded transition ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Previous
        </button>

        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-3 py-1 mx-1 rounded transition ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}

        {totalPages > currentRangeEnd && (
          <>
            <span>...</span>
            <button
              onClick={() => handlePageClick(totalPages - 1)}
              className={`px-3 py-1 mx-1 rounded transition ${
                currentPage === totalPages - 1 ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded transition ${
            currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Albums;
