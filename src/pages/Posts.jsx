import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { posts, users } from '../components/utilities/apiServices';
import { ClipLoader } from 'react-spinners';
import { ThemeContext } from '../components/utilities/ThemeContext';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Posts = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access the dark mode state
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;
  const pageRange = 5; // The number of pages to display in the pagination at once

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS animations when theme changes
  }, [isDarkMode]);


  const { data: postsData, isLoading: isPostsLoading, isError: isPostsError, error: postsError } = useQuery('posts', posts);
  const { data: usersData, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery('users', users);

  if (isPostsLoading || isUsersLoading) {
    return (
                    <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>

        <ClipLoader size={50} color={isDarkMode ? '#ffffff' : '#123abc'} />
      </div>
    );
  }

  if (isPostsError || isUsersError) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>        <p>Error: {isPostsError ? postsError.message : usersError.message}</p>
      </div>
    );
  }

  // Get the name of the user by userId
  const getUserName = (userId) => {
    const user = usersData?.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  // Pagination logic
  const totalPages = Math.ceil(postsData?.length / postsPerPage);
  const startIdx = currentPage * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const paginatedPosts = postsData?.slice(startIdx, endIdx);

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
    <div
      className={`min-h-screen pb-4  p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`} // Dynamic background and text color
    >
      {/* Display paginated posts */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-0">Posts</h2>
      </div>

      {paginatedPosts?.map((post, index) => (
        <div
          key={post.id}
          className={`mb-4 p-4 border rounded-lg shadow-sm transition hover:shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-black'
          }`} // Dynamic post card styles
          data-aos="fade-up" // AOS animation
          data-aos-delay={`${index * 100}`} // Incremental delay for each post
        >
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
          <p className="italic text-sm text-gray-500">Posted by: {getUserName(post.userId)}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-wrap justify-center items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded transition ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex flex-wrap justify-center">
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
        </div>

        {/* Ellipsis and Last Page */}
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

        {/* Next Button */}
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

export default Posts;
